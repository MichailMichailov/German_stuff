// Входные данные
export interface InputEntry {
  id: number;
  name: string;
  company: string;
  service: string;
  date: string; // ISO format date string
}

// Описание одной недели
export interface WeekRange {
  kw: string;
  from: Date;
  to: Date;
  label: string;
}

// Описание недели для вывода
export interface WeekOutput {
  kw: string;
  date: string;
}

// Одно поле из результата
export interface DashboardEntry {
  Objektnummer: string;
  Leistung: string[];
  [kw: string]: string[] | number[] | string; // KW1, KW2 и т.д.
}

// Результат
export interface DashboardResult {
  weeks: WeekOutput[];
  data: DashboardEntry[];
}




export const getCurrentData = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`
}

export const getCurrentData2 = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`
}



export const transformDataToDashboard = (data: InputEntry[], startdate: string): DashboardResult => {
  // Получаем понедельник от заданной стартовой даты
  const getMonday = (d: Date): Date => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - (day === 0 ? 6 : day - 1); // воскресенье = 0
    return new Date(date.setDate(diff));
  };

  const startDateObj = getMonday(new Date(startdate));
  const weeks: WeekRange[] = [];

  // Формируем 52 недели с понедельника по воскресенье
  for (let i = 0; i < 52; i++) {
    const monday = new Date(startDateObj);
    monday.setDate(monday.getDate() + i * 7);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    weeks.push({
      kw: `KW${i + 1}`,
      from: monday,
      to: sunday,
      label: `${monday.toLocaleDateString('de-DE')} - ${sunday.toLocaleDateString('de-DE')}`
    });
  }

  // Группировка по компании
  const resultMap: { [key: string]: DashboardEntry } = {};

  for (const entry of data) {
    const key = `${entry.company}`;
    if (!resultMap[key]) {
      resultMap[key] = {
        Objektnummer: entry.company,
        Leistung: [],
      };

      // Инициализируем пустые недели
      weeks.forEach((_, i) => {
        resultMap[key][`KW${i + 1}`] = [];
      });
    }

    const leistungList = resultMap[key].Leistung;
    let serviceIndex = leistungList.indexOf(entry.service);
    if (serviceIndex === -1) {
      serviceIndex = leistungList.push(entry.service) - 1;
    }

    const entryDate = new Date(entry.date);
    weeks.forEach((week, i) => {
      if (entryDate >= week.from && entryDate <= week.to) {
        const kwKey = `KW${i + 1}`;
        const kwArray = resultMap[key][kwKey] as number[];
        if (!kwArray.includes(serviceIndex)) {
          kwArray.push(serviceIndex);
        }
      }
    });
  }

  const weeksOutput: WeekOutput[] = weeks.map(w => ({
    kw: w.kw,
    date: w.label
  }));

  const dataOutput: DashboardEntry[] = Object.values(resultMap);

  return {
    weeks: weeksOutput,
    data: dataOutput
  };
};



export const transformDataToPlans = (data: any) => {
    const result: any = [];
    data.forEach((user: any) => {
        user.plans.forEach((plan: any) => {
            plan.service.forEach((service: any) => {
                result.push({
                    userName: user.name,
                    planName: plan.name,
                    serviceName: service.name,
                    serviceStatus: service.status ? 'vollendet' : 'nicht abgeschlossen',
                });
            });
        });
    });
    return result;
};



export const printData = (htmlContent: any) => {
    const printWindow = window.open('', '', 'height=800, width=800');
    if (printWindow) {
        printWindow.document.write('<html><head><title>Print Data</title></head><body>');
        printWindow.document.write(htmlContent);
        printWindow.document.write('</body></html>');

        // Включаем печать сразу после загрузки
        printWindow.document.close(); // закрытие документа для корректной печати
        printWindow.print(); // команда на печать
    }
};

export const generatePrintableHtml = (data: any[], weeks: any[]): string => {
  const rows: any[] = data.map((entry: any) => {
    return entry.Leistung.map((task: string, i: number) => {
      const row: any[] = [`${i === 0 ? entry.Objektnummer : ''}`, task];
      weeks.forEach((w: any) => {
        const values: any[] = entry[w.kw] || [];
        row.push(values.includes(i) ? 'x' : '');
      });
      return row;
    });
  });
  const headers: string[] = ['Objektnummer', 'Leistung', ...weeks.map((w: any) => w.kw)];
  const dates: string[] = ['', '', ...weeks.map((w: any) => w.date)];
  console.log(rows)
  return `
    <style>
      table {
        width: 100%;
        border-collapse: collapse;
        font-family: Arial, sans-serif;
        font-size: 12px;
      }
      th, td {
        border: 2px solid black;
        padding: 8px;
        text-align: center;
        vertical-align: middle;
      }
      thead th {
        background-color: #D9D9D9;
        font-weight: bold;
      }
      td {
        background-color: #f2f2f2;
      }
      tr:nth-child(odd) td {
        background-color: #ffffff;
      }
    </style>
    <table>
      <thead>
        <tr>
          ${headers.map((header: string) => `<th>${header}</th>`).join('')}
        </tr>
        <tr>
          ${dates.map((date: string) => `<td>${date}</td>`).join('')}
        </tr>
      </thead>
        <tbody>
          ${rows.map((row: any[]) => {
            return row.map((rov: any[]) => {
              return `
                <tr>
                  ${rov.map((cell: any) => `<td>${cell}</td>`).join('')}
                </tr>
              `;
            }).join('');
          }).join('')}
        </tbody>
    </table>
  `;
};


export const generatePrintableHtmlPlans = (data:any) => {
    const rows = data.map((person:any) => {
        const plansRows = person.plans.map((plan:any) => {
            const servicesRows = plan.service.map((service:any) => {
                return `
            <tr>
              <td>${service.name}</td>
              <td>${service.status ? 'Active' : 'Inactive'}</td>
            </tr>
          `;
            }).join('');

            return `
          <tr>
            <td rowspan="${plan.service.length + 1}">${plan.name}</td>
            ${servicesRows}
          </tr>
        `;
        }).join('');

        return `
        <tr>
          <td rowspan="${person.plans.length + 1}">${person.name}</td>
        </tr>
        ${plansRows}
      `;
    }).join('');

    return `
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Name</th>
            <th>Service Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
};
