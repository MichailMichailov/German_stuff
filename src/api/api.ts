import axios from 'axios'
import { materials, workerById, users, Arbeitsplane, kunden, solutionsFull, allWorkersData, dashboardData } from '../data/TestData'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
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

export const workerApi = {
    getWorkerById(id: string) {
        return instance.get('api/clientByWorkerId/' + id).then(response => response.data)
        // return workerById
    },
    updateWorker(id: string, data: any) {
        // return instance.put('endpoint/'+id,{data}).then(response=>response.data)
        return 0
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
    getAllKunden() {
        // return instance.get('endpoint').then(response=>response.data)
        return kunden
    },
    changeKundenById(id: string, body: any) {
        // return instance.put('endpoint/'+id, {body}).then(response=>response.data)
        return kunden
    },
    addKunden(body: any) {
        // return instance.post('endpoint/', {body}).then(response=>response.data)
        return [...kunden, body]
    },
    deleteKundenByid(id: string) {
        // return instance.delete('endpoint/'+id).then(response=>response.data)
        return kunden.filter(s => s.id !== id)
    }
}

export const SolutionsApi = {
    getSolutions() {
        // return instance.get('endpoint').then(response=>response.data)
        return solutionsFull
    },
    addSolution(body: any) {
        // return instance.post('endpoint/', {body}).then(response=>response.data)
        return [...solutionsFull, body]
    },
    changeSolutionById(id: string, body: any) {
        // return instance.put('endpoint/'+id, {body}).then(response=>response.data)
        return solutionsFull
    },
    deleteSolutionById(id: string) {
        // return instance.delete('endpoint/'+id).then(response=>response.data)
        return solutionsFull.filter(s => s.id !== id)
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


