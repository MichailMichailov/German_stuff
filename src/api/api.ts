import axios from 'axios'
import { materials, workerById, users, Arbeitsplane, kunden, solutionsFull, allWorkersData, dashboardData } from '../data/TestData'

const instance = axios.create({
    // baseURL:'https://6523f436ea560a22a4e91c67.mockapi.io/users'
    //withCredentials:true
})


export const authApi = {
    logAuth(login: string, password: string) {
        // return instance.get('/loginEndpoint',{login, password}).then(response=>response.data)
        if (login == 'admin') {
            return (users[0])
        } else {
            return (users[1])
        }
    }

}

export const workerApi = {
    getWorkerById(id: string) {
        // return instance.get('endpoint/'+id).then(response=>response.data)
        return workerById
    },
    updateWorker(data: any) {
        // return instance.put('endpoint/'+id,{data}).then(response=>response.data)
        return 0
    }
}

export const adminApi = {
    getArbitplansByData(data: string) {
        // return instance.get('endpoint/',{data}).then(response=>response.data)
        return Arbeitsplane
    },
    getFromDashboard(dataFrom: string, dataTo: string) {
        // return instance.get('endpoint/',{dataFrom, dataTo}).then(response=>response.data)
        return dashboardData
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
    getMaterials() {
        // return instance.get('endpoint').then(response=>response.data)
        return materials
    },
    addMaterial(body: any) {
        // return instance.post('endpoint/', {body}).then(response=>response.data)
        return [...materials, body]
    },
    changeMaterialById(id: string, body: any) {
        // return instance.put('endpoint/'+id, {body}).then(response=>response.data)
        return materials
    },
    deleteMaterialById(id: string) {
        // return instance.delete('endpoint/'+id).then(response=>response.data)
        return materials.filter(s => s.id !== id)
    }
}
export const worerApi = {
    getWorkers() {
        // return instance.get('endpoint').then(response=>response.data)
        return allWorkersData
    },
    addWorker(body: any) {
        // return instance.post('endpoint/', {body}).then(response=>response.data)
        return [...allWorkersData, body]
    },
    changeWorkerById(id: string, body: any) {
        // return instance.put('endpoint/'+id, {body}).then(response=>response.data)
        return allWorkersData
    },
    deleteWorkerById(id: string) {
        // return instance.delete('endpoint/'+id).then(response=>response.data)
        return allWorkersData.filter(s => s.id !== id)
    }
}


