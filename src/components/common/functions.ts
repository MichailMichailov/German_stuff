import * as XLSX from 'xlsx';

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

export const loadToExel = (data: any) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'example.xlsx');
}

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

export const transformDataToDashboard = (data: any) => {
    return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        company: item.company,
        service: item.service,
        date: item.date,
        status: item.status,
        materials: item.materials,
        notes: item.notes,
        createdAt: item.createdAt
    }));
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

export const generatePrintableHtml = (data: any) => {
    const rows = data.map((item: any) => {
        return `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.company}</td>
          <td>${item.service}</td>
          <td>${item.date}</td>
          <td>${item.status}</td>
          <td>${item.materials}</td>
          <td>${item.notes}</td>
          <td>${item.createdAt}</td>
        </tr>
      `;
    }).join('');

    return `
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Company</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Materials</th>
            <th>Notes</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
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
