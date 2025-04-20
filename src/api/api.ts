import axios from 'axios'
// import { materials, workerById, users, Arbeitsplane, kunden, solutionsFull, allWorkersData, dashboardData } from '../data/TestData'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    // baseURL: 'https://cf5d-149-102-246-6.ngrok-free.app/',
    //withCredentials:true
})


export const authApi = {
    async logAuth(login: string, password: string) {
        return instance.post("api/login/", { login, password }).then(response => response.data)
        // if (login == 'admin') {
        //     return (users[0])
        // } else {
        //     return (users[1])
        // }
    }
}

export const settingsApi = {
    async getDate(token:string) {
        return instance.get("api/settings/",
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response => response.data)
    }, 
    async updateDate(token:string, date: string) {
        return instance.put('api/settings/', {date},
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response=>response.data)
    }
}

export const workerApi = {
    getWorkerById(token:string, id: string) {
        return instance.get('api/workerbyid/'+id,
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response => response.data)
        // return instance.get('api/clientByWorkerId/' + id).then(response => response.data)
        // return workerById
    },
    updateWorker(token:string, id: string, body: any) {
        return instance.put('api/workerbyid/'+id, body,
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response=>response.data)
        // return 0
    }
}

export const adminApi = {
    getArbitplansByData(token:string, data: string) {
        return instance.post('api/arbeitsplan/', data,
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response => response.data)
        // return instance.get('endpoint/',{data}).then(response=>response.data)
        // return Arbeitsplane
    },
    getFromDashboard(token:string, dataFrom: string, dataTo: string) {
        return instance.post('api/dashboard/', {start:dataFrom, end:dataTo},
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response => response.data)
        // return instance.post('endpoint/',{dataFrom, dataTo}).then(response=>response.data)
        // return dashboardData
    }
}

export const kundenApi = {
    getAllKunden(token:string) {
        return instance.get('api/kundens/',
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response => response.data)
        // return kunden
    },
    changeKundenById(token:string, id: string, body: any) {
        return instance.put('api/kundens/'+id, body,
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response=>response.data)
        // return kunden
    },
    addKunden(token:string, body: any) {
        return instance.post('api/kundens/', body, 
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response => response.data)
        // return [...kunden, body]
    },
    deleteKundenByid(token:string, id: string) {
        return instance.delete('api/kundens/'+id,
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response=>response.data)
        // return kunden.filter(s => s.id !== id)
    }
}

export const SolutionsApi = {
    getSolutions(token:string) {
        return instance.get('api/leistungen/',
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response => response.data)
        // return solutionsFull
    },
    addSolution(token:string, body: any) {
        return instance.post('api/leistungen/', body, 
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response => response.data)
        // return [...solutionsFull, body]
    },
    changeSolutionById(token:string, id: string, body: any) {
        return instance.put('api/leistungen/'+id, body,
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response=>response.data)
        // return solutionsFull
    },
    deleteSolutionById(token:string, id: string) {
        return instance.delete('api/leistungen/'+id,
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response=>response.data)
        // return solutionsFull.filter(s => s.id !== id)
    }
}
export const materialApi = {
    getMaterials(token:string) {
        return instance.get('api/materials/',
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response => response.data)
        // return materials
    },
    addMaterial(token:string, body: any) {
        // return instance.post('endpoint/', {body}).then(response=>response.data)
        return instance.post('api/materials/', body,
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response=>response.data)
        // return [...materials, body]
    },
    changeMaterialById(token:string, id: string, body: any) {
        return instance.put('api/materials/'+id, body,
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response=>response.data)
        // return instance.put('endpoint/'+id, {body}).then(response=>response.data)
        // return materials
    },
    deleteMaterialById(token:string, id: string) {
        return instance.delete('api/materials/'+id,
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response=>response.data)
        // return instance.delete('endpoint/'+id).then(response=>response.data)
        // return materials.filter(s => s.id !== id)
    }
}
export const worerApi = {
    getWorkers(token:string) {
        return instance.get('api/workers/',
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response => response.data)
        // return allWorkersData
    },
    addWorker(token:string,body: any) {
        return instance.post('api/workers/', body,
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response=>response.data)
        // return [...allWorkersData, body]
    },
    changeWorkerById(token:string,id: string, body: any) {
        return instance.put('api/workers/'+id, body,
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response=>response.data)
        // return allWorkersData
    },
    deleteWorkerById(token:string,id: string) {
        return instance.delete('api/workers/'+id,
            { headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`} }
        ).then(response=>response.data)
        // return allWorkersData.filter(s => s.id !== id)
    }
}


