import * as XLSX from "sheetjs-style";

const data1 = [
    {
        Objektnummer: 'Friedhof A',
        Leistung: ['Rasen mähen', 'Pflanzflächen pflegen2'],
        KW1: [0, 1],
        KW2: [1],
        KW3: [1],
        KW4: [0],
    },
    {
        Objektnummer: 'Friedhof A 2',
        Leistung: ['Pflanzflächen pflegen'],
        KW1: [0],
        KW2: [],
        KW3: [0],
        KW4: [],
    },
];
const weeks1 = [
    { kw: 'KW1', date: '08.01 - 12.01.2024' },
    { kw: 'KW2', date: '15.01 - 19.01.2024' },
    { kw: 'KW3', date: '22.01 - 26.01.2024' },
    { kw: 'KW4', date: '29.01 - 02.02.2024' },
];


const styleCenter = (wight: string, rot: number) => ({
    alignment: {
        vertical: 'center',
        horizontal: 'center',
        textRotation: rot
    },
    font: { bold: true },
    fill: { fgColor: { rgb: 'D9D9D9' } },
    border: {
        top: { style: 'medium', color: { rgb: '000000' } },
        bottom: { style: 'medium', color: { rgb: '000000' } },
        left: { style: wight, color: { rgb: '000000' } },
        right: { style: wight, color: { rgb: '000000' } },
    },
})
const thickBorderStyle = (brd:{t:string, b:string, l:string, r:string}, color:string)=> ({
    border: {
        top: { style: brd.t, color: { rgb: '000000' } },
        bottom: { style: brd.b, color: { rgb: '000000' } },
        left: { style: brd.l, color: { rgb: '000000' } },
        right: { style: brd.r, color: { rgb: '000000' } },
    },
    alignment: {
        vertical: 'center',
        horizontal: 'center',
      },
    fill: { fgColor: { rgb: color } },
})
const createTitle = (weeks: { kw: string, date: string }[], data: any) => {
    const ws_data: any[][] = [];
    ws_data.push(['Objektnummer', 'Leistung', ...weeks.map(w => w.kw)]);
    ws_data.push(['', '', ...weeks.map(w => w.date)]);

    data.forEach((entry: any) => {
        entry.Leistung.forEach((task: string, i: number) => {
            const row = [i == 0 ? entry.Objektnummer : '', task];
            weeks.forEach(w => {
                const values = entry[w.kw] || [];
                row.push(values.includes(i) ? 'x' : '');
            });
            ws_data.push(row);
        });
    });
    return ws_data
}


export const loadToExel = (data: any, weeks:any) => {

    const ws_data = createTitle(weeks, data)
    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    // Автоширина
    ws['!cols'] = [
        { wch: 25 }, { wch: 30 },
        ...Array(weeks.length).fill({ wch: 5 }),
    ];

    let w, rot, borders, borders2
    // Применение стилей
    for (let c = 0; c < ws_data[0].length; c++) {
        const cellKW = XLSX.utils.encode_cell({ r: 0, c });
        const cellDate = XLSX.utils.encode_cell({ r: 1, c });
        if (ws[cellKW]) {
            w = c >= 2 ? 'thin' : 'medium'
            rot = c >= 2 ? 90 : 0
            ws[cellKW].s = styleCenter(w, rot);
        }
        if (ws[cellDate]) {
            w = c >= 2 ? 'thin' : 'medium'
            rot = c >= 2 ? 90 : 0
            ws[cellDate].s = styleCenter(w, rot);
        }
    }

    for (let r = 2; r < ws_data.length; r++) {
        const cell1Ref = XLSX.utils.encode_cell({ r, c: 0 }); 
        if (ws[cell1Ref]) {
            if (ws[cell1Ref].v === ''){
                borders = {t:'thin',b:'thin',l:'medium',r:'medium'}
                borders2 = {t:'thin',b:'thin',l:'thin',r:'thin'}
            }else{
                borders = {t:'medium',b:'thin',l:'medium',r:'medium'}
                borders2 = {t:'medium',b:'thin',l:'thin',r:'thin'}
            }
            if (r == (ws_data.length-1)){
                borders.b = 'medium'
                borders2.b = 'medium'
            }
                                               
            ws[cell1Ref].s = thickBorderStyle(borders, 'ffffff'); 
            for (let c = 1; c < ws_data[0].length; c++) {
                const cellRef = XLSX.utils.encode_cell({ r, c });
                if (ws[cellRef]) {
                  ws[cellRef].s = thickBorderStyle(c==1?borders:borders2, (r%2!=0?'D9D9D9':'ffffff'));
                }
              }
        }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Plan');
    XLSX.writeFile(wb, 'example_final_design.xlsx');
};


export const loadExelOld = (data:any)=>{
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'example.xlsx');
  }