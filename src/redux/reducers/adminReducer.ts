import { createSlice } from '@reduxjs/toolkit'
import { setIsFetching } from './uiReducers'
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
export const getDashboardByDataThunk = (datafrom:string, dataTo:string)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await adminApi.getFromDashboard(datafrom, dataTo)
        if(result){
           dispatch(setDashboard(result))
        } 
        dispatch(setIsFetching(false))
        // return 1
    }
}


// ============================= ArbitPlans ========================================================

export const getPlanByDataThunk = (data:string)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await adminApi.getArbitplansByData(data)
        if(result){
           dispatch(setPlan(result))
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
export const getWorkersThunk = () =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await worerApi.getWorkers()
        if(result){
            dispatch(setWorkers(result))
        }
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const changeWorkerByIdThunk = (id:string, body:any) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await worerApi.changeWorkerById(id, body)
        if(result){
            dispatch(setWorkers(result))
        }
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const addWorkerThunk = ( body:any) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await worerApi.addWorker(body)
        if(result){
            dispatch(setWorkers(result))
        }
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const deleteWorkerByIdThunk = (id:string) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await worerApi.deleteWorkerById(id)
        if(result){
            dispatch(setWorkers(result))
        }
        dispatch(setIsFetching(false))
        // return 1
    }
}

// ============================= Materials ========================================================
export const getMaterialsThunk = () =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await materialApi.getMaterials()
        if(result){
            dispatch(setMaterials(result))
        }
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const changeMaterialByIdThunk = (id:string, body:any) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await materialApi.changeMaterialById(id, body)
        if(result){
            dispatch(setMaterials(result))
        }
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const addMaterialThunk = ( body:any) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await materialApi.addMaterial(body)
        if(result){
            dispatch(setMaterials(result))
        }
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const deleteMaterialByIdThunk = (id:string) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await materialApi.deleteMaterialById(id)
        if(result){
            dispatch(setMaterials(result))
        }
        dispatch(setIsFetching(false))
        // return 1
    }
}