export const dashboardData = [
    {
        id: 1,
        name: "Alexander Meier",
        company: "VenomTech Solutions",
        service: "Installation",
        date: "2025-03-07",
        status: "Abgeschlossen",
        materials: ["Kabel", "Adapter"],
        notes: "Alles gut verlaufen",
        createdAt: "2025-03-01"
    },
    {
        id: 2,
        name: "Benjamin Hoffmann",
        company: "PixelGastro",
        service: "Wartung",
        date: "2025-03-06",
        status: "In Bearbeitung",
        materials: ["Schrauben", "Öl"],
        notes: "Benötigt weitere Inspektion",
        createdAt: "2025-03-02"
    },
    {
        id: 3,
        name: "Christian Weber",
        company: "Schäfer Yacht Charter",
        service: "Reparatur",
        date: "2025-03-05",
        status: "Offen",
        materials: ["Motoröl", "Dichtungen"],
        notes: "Warten auf Ersatzteile",
        createdAt: "2025-03-03"
    }
];

export const users = [
    { id: '1', name: 'Admin', role: "admin" },
    { id: '2', name: 'Gabriel', role: "worker" },
    { id: '3', name: 'Adam', role: "worker" }
];

export const workerById = [
    {
        Name: "Maximilian Müller",
        ListOfWork: [
            { Name: "Wartung der Klimaanlage", Status: true },
            { Name: "Austausch des Luftfilters", Status: false }
        ],
        listOfInstrument: [
            { Name: "Schraubenzieher", Status: true },
            { Name: "Multimeter", Status: true }
        ],
        Note: "Filter muss nächste Woche gewechselt werden."
    },
    {
        Name: "Anna Schmidt",
        ListOfWork: [
            { Name: "Installation der neuen Software", Status: true },
            { Name: "Systemprüfung", Status: false }
        ],
        listOfInstrument: [
            { Name: "Laptop", Status: true },
            { Name: "USB-Stick", Status: false }
        ],
        Note: "Systemprüfung für nächste Woche planen."
    }
];

export const Arbeitsplane = [
    {
        id: '2', name: 'Gabriel',
        plans: [
            {
                name: "VenomTech Solution",
                service: [
                    { name: "serv1", status: true },
                    { name: "serv4", status: true },
                    { name: "serv67", status: false }
                ]
            },
            {
                name: "VenomTech Solution2",
                service: [
                    { name: "serv12", status: true },
                    { name: "serv42", status: true }
                ]
            }
        ]
    },
    {
        id: '3', name: 'Lena',
        plans: [
            {
                name: "AutoMech GmbH",
                service: [
                    { name: "serv12", status: true },
                    { name: "serv8", status: false },
                    { name: "serv23", status: true }
                ]
            }
        ]
    },
    {
        id: '4', name: 'Felix',
        plans: [
            {
                name: "MediTech Services",
                service: [
                    { name: "serv3", status: true },
                    { name: "serv14", status: false },
                    { name: "serv21", status: true }
                ]
            }
        ]
    },
    {
        id: '5', name: 'Sophia',
        plans: [
            {
                name: "DataWorks Solutions",
                service: [
                    { name: "serv5", status: true },
                    { name: "serv9", status: true },
                    { name: "serv30", status: false }
                ]
            }
        ]
    },
    {
        id: '6', name: 'Markus',
        plans: [
            {
                name: "LogiTrans GmbH",
                service: [
                    { name: "serv7", status: true },
                    { name: "serv16", status: false },
                    { name: "serv25", status: true }
                ]
            }
        ]
    }
];

export const kunden = [
    {
        id: '1',
        name: 'VenomTech Solution',
        phone: '+000 000 000',
        address: 'st. 5',
        email: 'www@gmail.com',
        solutions: [
            { solutionId: '1', workerId: '2', interval: 15 },
            { solutionId: '2', workerId: '2', interval: 13 },
            { solutionId: '3', workerId: '3', interval: 10 }
        ]
    },
    {
        id: '2',
        name: 'TechFlow GmbH',
        phone: '+111 111 111',
        address: 'st. 10',
        email: 'techflow@mail.com',
        solutions: [
            { solutionId: '4', workerId: '3', interval: 30 },
            { solutionId: '5', workerId: '4', interval: 20 }
        ]
    },
    {
        id: '3',
        name: 'GreenTech Innovations',
        phone: '+222 222 222',
        address: 'st. 15',
        email: 'green@tech.com',
        solutions: [
            { solutionId: '6', workerId: '5', interval: 25 }
        ]
    },
    {
        id: '4',
        name: 'IT Service Berlin',
        phone: '+333 333 333',
        address: 'st. 20',
        email: 'itberlin@service.com',
        solutions: [
            { solutionId: '7', workerId: '6', interval: 35 }
        ]
    },
    {
        id: '5',
        name: 'BlueWave Systems',
        phone: '+444 444 444',
        address: 'st. 25',
        email: 'bluewave@systems.com',
        solutions: [
            { solutionId: '8', workerId: '2', interval: 40 }
        ]
    },
    {
        id: '6',
        name: 'CloudSecure Solutions',
        phone: '+555 555 555',
        address: 'st. 30',
        email: 'cloudsecure@mail.com',
        solutions: [
            { solutionId: '1', workerId: '3', interval: 20 },
            { solutionId: '5', workerId: '6', interval: 25 }
        ]
    }
];

export const solutionsFull = [ 
    { id: '1', name: 'Netzwerkinstallation' , description: 'lorem 50', materials:['6','1','3']},
    { id: '2', name: 'Software-Update', description: 'lorem 50', materials:['4','5'] },
    { id: '3', name: 'Serverwartung', description: 'lorem 50', materials:['6','7'] },
    { id: '4', name: 'Solarpanel-Installation', description: 'lorem 50', materials:['8','9'] },
    { id: '5', name: 'Energiespeichersysteme', description: 'lorem 50', materials:['10','11'] },
    { id: '6', name: 'Datenbankoptimierung', description: 'lorem 50', materials:['12','13'] },
    { id: '7', name: 'IoT-Geräteeinrichtung', description: 'lorem 50', materials:['14','15'] },
    { id: '8', name: 'Cloud-Sicherheitsanalyse', description: 'lorem 50', materials:['16','17'] }
];

export const materials = [
    { id: '1', name: 'Schrauben', menge:10, is_consumable:false, description:"some desc" },
    { id: '2', name: 'Holzbretter', menge:20, is_consumable:false, description:"some desc" },
    { id: '3', name: 'Kleber', menge:5, is_consumable:true, description:"some desc" },
    { id: '4', name: 'USB-Stick', menge:10, is_consumable:false, description:"some desc" },
    { id: '5', name: 'Software-Lizenz', menge:1, is_consumable:false, description:"some desc" },
    { id: '6', name: 'Lüfter', menge:4, is_consumable:false, description:"some desc" },
    { id: '7', name: 'Wärmeleitpaste', menge:3, is_consumable:true, description:"some desc" },
    { id: '8', name: 'Solarpanel', menge:6, is_consumable:false, description:"some desc" },
    { id: '9', name: 'Montageschienen', menge:10, is_consumable:false, description:"some desc" },
    { id: '10', name: 'Batteriemodule', menge:4, is_consumable:false, description:"some desc" },
    { id: '11', name: 'Wechselrichter', menge:2, is_consumable:false, description:"some desc" },
    { id: '12', name: 'SSD-Festplatte', menge:2, is_consumable:false, description:"some desc" },
    { id: '13', name: 'Datenbanksoftware', menge:1, is_consumable:false, description:"some desc" },
    { id: '14', name: 'Mikrocontroller', menge:10, is_consumable:false, description:"some desc" },
    { id: '15', name: 'Sensoren', menge:20, is_consumable:true, description:"some desc" },
    { id: '16', name: 'Firewall-Software', menge:1, is_consumable:false, description:"some desc" },
    { id: '17', name: 'Netzwerkanalysator', menge:2, is_consumable:false, description:"some desc" }
];

export const allWorkersData = [
    { id: '2', login: 'Gabriel', password:'12345' },
    { id: '3', login: 'Lena', password:'12345'  },
    { id: '6', login: 'Markus', password:'12345'  },
    { id: '5', login: 'Sophia', password:'12345'  },
    { id: '4', login: 'Felix', password:'12345'  },
]
