import axios from 'axios'
import { materials, workerById, users, Arbeitsplane, kunden, solutionsFull, allWorkersData, dashboardData } from '../data/TestData'

const instance = axios.create({
    // baseURL:'https://6523f436ea560a22a4e91c67.mockapi.io/users'
    //withCredentials:true
})


export const authApi = {
    logAuth(login:string, password:string){
        // return instance.post('',{login, password})
        if(login == 'admin'){
            return(users[0])
        }else{
            return(users[1])
        }
    }

}

export const workerApi = {
    getWorkerById(id:string){
        // return instance.post('',{login, password})
        return workerById
    },
    updateWorker(data:any){
        // return instance.post('',data)
        return 0
    }
}

export const adminApi = {
    getArbitplansByData(data:string){
        return Arbeitsplane
    },
    getFromDashboard(dataFrom:string, dataTo:string){
        return dashboardData
    }
}

export const kundenApi = {
    getAllKunden(){
        return kunden
    },
    changeKundenById(id:string, body:any){
        return kunden
    },
    addKunden( body:any){
        return [...kunden, body]
    },
    deleteKundenByid( id:string){
        return kunden.filter(s => s.id !== id)
    }
}

export const SolutionsApi = {
    getSolutions(){
        return solutionsFull
    },
    addSolution(body:any){
        return [...solutionsFull, body]
    },
    changeSolutionById(id:string, body:any){
        return solutionsFull
    },
    deleteSolutionById(id:string){
        return solutionsFull.filter(s => s.id !== id)
    }
}
export const materialApi = {
    getMaterials(){
        return materials
    },
    addMaterial(body:any){
        return [...materials, body]
    },
    changeMaterialById(id:string, body:any){
        return materials
    },
    deleteMaterialById(id:string){
        return materials.filter(s => s.id !== id)
    }
}
export const worerApi = {
    getWorkers(){
        return allWorkersData
    },
    addWorker(body:any){
        return [...allWorkersData, body]
    },
    changeWorkerById(id:string, body:any){
        return allWorkersData
    },
    deleteWorkerById(id:string){
        return allWorkersData.filter(s => s.id !== id)
    }
}


