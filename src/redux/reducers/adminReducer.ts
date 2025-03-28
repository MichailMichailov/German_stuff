import { createSlice } from '@reduxjs/toolkit'
import { setError, setIsFetching } from './uiReducers'
import { adminApi, kundenApi, SolutionsApi, materialApi, worerApi } from '../../api/api'


type actionType = {
    type:string
    payload:any
}

const adminSlice = createSlice({
    name:'admin',
    initialState:{
        dashboard:[],
        plan:[],
        kundens:[],
        solutions:[],
        workers:[],
        materials:[],
    },
    reducers:{
        setDashboard(state, action:actionType){
            state.dashboard = action.payload
        },
        setPlan(state, action:actionType){
            state.plan = action.payload
        },
        setKundens(state, action:actionType){
            state.kundens = action.payload
        },
        setSolutions(state, action:actionType){
            state.solutions = action.payload
        },
        setWorkers(state, action:actionType){
            state.workers = action.payload
        },
        setMaterials(state, action:actionType){
            state.materials = action.payload
        }
    }
})
export const { setPlan, setKundens, setSolutions, setWorkers, setMaterials, setDashboard }= adminSlice.actions
export const adminReducer = adminSlice.reducer

// ============================= ashboard ========================================================
export const getDashboardByDataThunk = (token:string ,datafrom:string, dataTo:string)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await adminApi.getFromDashboard(token, datafrom, dataTo)
            if(result){
               dispatch(setDashboard(result.list))
            } 
        }catch(error){
            dispatch(setError(error))
            alert(error)
        }   

        dispatch(setIsFetching(false))
        // return 1
    }
}


// ============================= ArbitPlans ========================================================

export const getPlanByDataThunk = (token:string, data:string)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await adminApi.getArbitplansByData(token, data)
            console.log(result)
            if(result){
            dispatch(setPlan(result.list))
            } 
        }catch(error){
            dispatch(setError(error))
            alert(error)
        }   
        dispatch(setIsFetching(false))
        // return 1
    }
}

// ============================= Kunden ========================================================
export const getKundensThunk = ()=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await kundenApi.getAllKunden()
        if(result){
            dispatch(setKundens(result))
        }
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const changeKundenByIdThunk = (id:string, body:any) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await kundenApi.changeKundenById(id, body)
        if(result){
            dispatch(setKundens(result))
        }
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const addKundenThunk = ( body:any) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await kundenApi.addKunden(body)
        if(result){
            dispatch(setKundens(result))
        }
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const deleteKundenByIdThunk = (id:string) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await kundenApi.deleteKundenByid(id)
        if(result){
            dispatch(setKundens(result))
        }
        dispatch(setIsFetching(false))
        // return 1
    }
}
// ============================= Solutions ========================================================
export const getSolutionsThunk = () =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await SolutionsApi.getSolutions()
        if(result){
            dispatch(setSolutions(result))
        }
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const changeSolutionByIdThunk = (id:string, body:any) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await SolutionsApi.changeSolutionById(id, body)
        if(result){
            dispatch(setSolutions(result))
        }
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const addSolutionThunk = ( body:any) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await SolutionsApi.addSolution(body)
        if(result){
            dispatch(setSolutions(result))
        }
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const deleteSolutionByIdThunk = (id:string) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await SolutionsApi.deleteSolutionById(id)
        if(result){
            dispatch(setSolutions(result))
        }
        dispatch(setIsFetching(false))
        // return 1
    }
}

// ============================= Mitaribers ========================================================
export const getWorkersThunk = (token:string) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await worerApi.getWorkers(token)
            if(result){
                dispatch(setWorkers(result.listOfWorker))
            }
        }catch(error){
            dispatch(setError(error))
            alert(error)
        }   
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const changeWorkerByIdThunk = (token:string,id:string, body:any) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await worerApi.changeWorkerById(token, id, body)
            if(result){
                dispatch(setWorkers(result.listOfWorker))
            }
        }catch(error){
            dispatch(setError(error))
            alert(error)
        }        
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const addWorkerThunk = ( token:string, body:any) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try{
            const result = await worerApi.addWorker(token, body)
            if(result){
                dispatch(setWorkers(result.listOfWorker))
            }
        }catch(error){
            dispatch(setError(error))
            alert(error)
        } 
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const deleteWorkerByIdThunk = (token:string, id:string) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try{
            const result = await worerApi.deleteWorkerById(token, id)
            if(result){
                dispatch(setWorkers(result.listOfWorker))
            }
        }catch(error){
            dispatch(setError(error))
            alert(error)
        } 
        dispatch(setIsFetching(false))
        // return 1
    }
}

// ============================= Materials ========================================================
export const getMaterialsThunk = (token:string) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await materialApi.getMaterials(token)
            if(result){
                dispatch(setMaterials(result.list))
            }
        }catch(error){
            dispatch(setError(error))
            alert(error)
        }   
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const changeMaterialByIdThunk = (token:string, id:string, body:any) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await materialApi.changeMaterialById(token, id, body)
            if(result){
                dispatch(setMaterials(result.list))
            }
        }catch(error){
            dispatch(setError(error))
            alert(error)
        }   
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const addMaterialThunk = (token:string, body:any) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await materialApi.addMaterial(token, body)
            if(result){
                dispatch(setMaterials(result.list))
            }
        }catch(error){
            dispatch(setError(error))
            alert(error)
        }   
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const deleteMaterialByIdThunk = (token:string, id:string) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await materialApi.deleteMaterialById(token, id)
            if(result){
                dispatch(setMaterials(result.list))
            }
        }catch(error){
            dispatch(setError(error))
            alert(error)
        }   
        dispatch(setIsFetching(false))
        // return 1
    }
}