import { createSlice } from '@reduxjs/toolkit'
import { setError, setIsFetching } from './uiReducers'
import { adminApi, kundenApi, SolutionsApi, materialApi, worerApi } from '../../api/api'

const errorMessages = {
    dashboard: "Fehler beim Abrufen des Dashboards. Bitte überprüfen Sie die Daten und versuchen Sie es erneut.",
    arbitPlans: "Fehler beim Abrufen der Arbeitspläne. Bitte versuchen Sie es erneut.",
    kundenFetch: "Fehler beim Abrufen der Kundendaten. Bitte versuchen Sie es erneut.",
    kundenChange: "Fehler beim Ändern der Kundendaten. Bitte erneut versuchen.",
    kundenAdd: "Fehler beim Hinzufügen eines neuen Kunden. Bitte überprüfen Sie die Eingaben.",
    kundenDelete: "Fehler beim Löschen des Kunden. Bitte versuchen Sie es erneut.",
    solutionsFetch: "Fehler beim Abrufen der Lösungen. Bitte erneut versuchen.",
    solutionsChange: "Fehler beim Ändern der Option. Überprüfen Sie die Eingaben und versuchen Sie es erneut",
    solutionsAdd: "Fehler beim Hinzufügen einer neuen Option. Bitte erneut versuchen",
    solutionsDelete: "Fehler beim Löschen der Option. Bitte erneut versuchen.",
    workersFetch: "Fehler beim Abrufen der Mitarbeiterdaten. Bitte erneut versuchen.",
    workersChange: "Fehler beim Ändern der Mitarbeiterdaten. Bitte erneut versuchen.",
    workersAdd: "Fehler beim Hinzufügen eines neuen Mitarbeiters. Bitte überprüfen Sie die Eingaben.",
    workersDelete: "Fehler beim Löschen des Mitarbeiters. Bitte erneut versuchen.",
    materialsFetch: "Fehler beim Abrufen der Materialdaten. Bitte erneut versuchen.",
    materialsChange: "Fehler beim Ändern der Materialdaten. Überprüfen Sie die Eingaben und versuchen Sie es erneut.",
    materialsAdd: "Fehler beim Hinzufügen eines neuen Materials. Bitte erneut versuchen.",
    materialsDelete: "Fehler beim Löschen des Materials. Bitte erneut versuchen."
};

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

// ============================= dashboard ========================================================
export const getDashboardByDataThunk = (token:string ,datafrom:string, dataTo:string)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await adminApi.getFromDashboard(token, datafrom, dataTo)
            if(result){
               dispatch(setDashboard(result.list))
            } 
        }catch(error){
            dispatch(setError(errorMessages.dashboard))
            // alert(error)
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
            if(result){
            dispatch(setPlan(result.list))
            } 
        }catch(error){
            dispatch(setError(errorMessages.arbitPlans))
            // alert(error)
        }   
        dispatch(setIsFetching(false))
        // return 1
    }
}

// ============================= Kunden ========================================================
export const getKundensThunk = (token:string)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await kundenApi.getAllKunden(token)
            if(result){
                dispatch(setKundens(result.list))
            }
        }catch(error){
            dispatch(setError(errorMessages.kundenFetch))
            // alert(error)
        }   
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const changeKundenByIdThunk = (token:string, id:string, body:any) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await kundenApi.changeKundenById(token, id, body)
            if(result){
                dispatch(setKundens(result.list))
            }
        }catch(error){
            dispatch(setError(errorMessages.kundenChange))
            // alert(error)
        }   
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const addKundenThunk = (token:string, body:any) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await kundenApi.addKunden(token, body)
            if(result){
                dispatch(setKundens(result.list))
            }
        }catch(error){
            dispatch(setError(errorMessages.kundenAdd))
            // alert(error)
        }   
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const deleteKundenByIdThunk = (token:string, id:string) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await kundenApi.deleteKundenByid(token, id)
            if(result){
                dispatch(setKundens(result.list))
            }
        }catch(error){
            dispatch(setError(errorMessages.kundenDelete))
            // alert(error)
        }   
        dispatch(setIsFetching(false))
        // return 1
    }
}
// ============================= Solutions ========================================================
export const getSolutionsThunk = (token:string) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await SolutionsApi.getSolutions(token)
            if(result){
                dispatch(setSolutions(result.list))
            }
        }catch(error){
            dispatch(setError(errorMessages.solutionsFetch))
            // alert(error)
        }   
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const changeSolutionByIdThunk = (token:string, id:string, body:any) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await SolutionsApi.changeSolutionById(token, id, body)
            if(result){
                dispatch(setSolutions(result.list))
            }
        }catch(error){
            dispatch(setError(errorMessages.solutionsChange))
            // alert(error)
        }   
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const addSolutionThunk = ( token:string, body:any) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await SolutionsApi.addSolution(token, body)
        if(result){
            dispatch(setSolutions(result.list))
        }
        }catch(error){
            dispatch(setError(errorMessages.solutionsAdd))
            // alert(error)
        }   
        dispatch(setIsFetching(false))
        // return 1
    }
}
export const deleteSolutionByIdThunk = (token:string, id:string) =>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await SolutionsApi.deleteSolutionById(token, id)
            if(result){
                dispatch(setSolutions(result.list))
            }
        }catch(error){
            dispatch(setError(errorMessages.solutionsDelete))
            // alert(error)
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
                dispatch(setWorkers(result.list))
            }
        }catch(error){
            dispatch(setError(errorMessages.workersFetch))
            // alert(error)
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
                dispatch(setWorkers(result.list))
            }
        }catch(error){
            dispatch(setError(errorMessages.workersChange))
            // alert(error)
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
                dispatch(setWorkers(result.list))
            }
        }catch(error){
            dispatch(setError(errorMessages.workersAdd))
            // alert(error)
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
                dispatch(setWorkers(result.list))
            }
        }catch(error){
            dispatch(setError(errorMessages.workersDelete))
            // alert(error)
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
            dispatch(setError(errorMessages.materialsFetch))
            // alert(error)
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
            dispatch(setError(errorMessages.materialsChange))
            // alert(error)
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
            dispatch(setError(errorMessages.materialsAdd))
            // alert(error)
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
            dispatch(setError(errorMessages.materialsDelete))
            // alert(error)
        }   
        dispatch(setIsFetching(false))
        // return 1
    }
}