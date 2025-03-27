import axios from 'axios'
import { materials, workerById, users, Arbeitsplane, kunden, solutionsFull, allWorkersData, dashboardData } from '../data/TestData'

const instance = axios.create({
    baseURL:'http://127.0.0.1:8000/',
    headers: { "Content-Type": "application/json" }
    //withCredentials:true
})


export const authApi = {
    async logAuth(login: string, password: string) {
        return instance.post("api/login/", { login, password }).then(response=>response.data)
        // if (login == 'admin') {
        //     return (users[0])
        // } else {
        //     return (users[1])
        // }
    }

}

export const workerApi = {
    getWorkerById(id: string) {
        // return instance.get('endpoint/'+id).then(response=>response.data)
        return workerById
    },
    updateWorker(id:string, data: any) {
        // return instance.put('endpoint/'+id,{data}).then(response=>response.data)
        return 0
    }
}

export const adminApi = {
    getArbitplansByData(data: string) {
        return instance.get('endpoint/',{data}).then(response=>response.data)
        // return Arbeitsplane
    },
    getFromDashboard(dataFrom: string, dataTo: string) {
        return instance.post('endpoint/',{dataFrom, dataTo}).then(response=>response.data)
        // return dashboardData
    }
}

export const kundenApi = {
    getAllKunden() {
        return instance.get('endpoint').then(response=>response.data)
        // return kunden
    },
    changeKundenById(id: string, body: any) {
        return instance.put('endpoint/'+id, {body}).then(response=>response.data)
        // return kunden
    },
    addKunden(body: any) {
        return instance.post('endpoint/', {body}).then(response=>response.data)
        // return [...kunden, body]
    },
    deleteKundenByid(id: string) {
        return instance.delete('endpoint/'+id).then(response=>response.data)
        // return kunden.filter(s => s.id !== id)
    }
}

export const SolutionsApi = {
    getSolutions() {
        return instance.get('endpoint').then(response=>response.data)
        // return solutionsFull
    },
    addSolution(body: any) {
        return instance.post('endpoint/', {body}).then(response=>response.data)
        // return [...solutionsFull, body]
    },
    changeSolutionById(id: string, body: any) {
        return instance.put('endpoint/'+id, {body}).then(response=>response.data)
        // return solutionsFull
    },
    deleteSolutionById(id: string) {
        return instance.delete('endpoint/'+id).then(response=>response.data)
        // return solutionsFull.filter(s => s.id !== id)
    }
}
export const materialApi = {
    getMaterials() {
        return instance.get('endpoint').then(response=>response.data)
        // return materials
    },
    addMaterial(body: any) {
        return instance.post('endpoint/', {body}).then(response=>response.data)
        // return [...materials, body]
    },
    changeMaterialById(id: string, body: any) {
        return instance.put('endpoint/'+id, {body}).then(response=>response.data)
        // return materials
    },
    deleteMaterialById(id: string) {
        return instance.delete('endpoint/'+id).then(response=>response.data)
        // return materials.filter(s => s.id !== id)
    }
}
export const worerApi = {
    getWorkers() {
        return instance.get('endpoint').then(response=>response.data)
        // return allWorkersData
    },
    addWorker(body: any) {
        return instance.post('endpoint/', {body}).then(response=>response.data)
        // return [...allWorkersData, body]
    },
    changeWorkerById(id: string, body: any) {
        return instance.put('endpoint/'+id, {body}).then(response=>response.data)
        // return allWorkersData
    },
    deleteWorkerById(id: string) {
        return instance.delete('endpoint/'+id).then(response=>response.data)
        // return allWorkersData.filter(s => s.id !== id)
    }
}


