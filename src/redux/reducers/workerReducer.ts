import { createSlice } from '@reduxjs/toolkit'
import { workerApi } from '../../api/api'
import { setError, setIsFetching } from './uiReducers'

const errorMessages = {
   getWorker:"Fehler beim Abrufen der Daten zur heutigen Arbeit. Bitte versuchen Sie es erneut",
   saveInfo:"Fehler beim Speichern der Daten. Bitte überprüfen Sie die Eingaben und versuchen Sie es erneut.",
   listClientInfo:'Fehler beim Abrufen der Kundendaten. Bitte versuchen Sie es erneut.',
   listWorksInfo:'Fehler beim Abrufen der Lösungen. Bitte erneut versuchen.',
   sendPlanInfo:''
};

type actionType = {
    type:string
    payload:any
}

const workerSlice = createSlice({
    name:'worker',
    initialState:{
        data:[],
    },
    reducers:{
        setWorkerData(state, action:actionType){
            state.data = action.payload
        }
    }
})
export const { setWorkerData}= workerSlice.actions
export const workerReducer = workerSlice.reducer


export const setWorkerByIdThunk  = (token:string, id:string)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await workerApi.getWorkerById(token, id)
            dispatch(setWorkerData(result.list))
        }catch(error){
            dispatch(setError(errorMessages.getWorker))
            // alert(error)
        }   
        dispatch(setIsFetching(false))
        return 0
    }
}

export const updateWorkerThunk = (token:string, id:string, data:any)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await workerApi.updateWorker(token, id, data)
            if(result){
                dispatch(setWorkerData(result.list))
            }
        }catch(error){
            dispatch(setError(errorMessages.saveInfo))
            // alert(error)
        }   

        dispatch(setIsFetching(false))
    }
}

export const getListOfClientsThunk = (token:string)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        let resucedArray = []
        try {
            const result = await workerApi.getListOfClients(token)
            if(result){
                resucedArray = result.list.map(({ name, id }:any) => ({ name, id}));
            }
        }catch(error){
            dispatch(setError(errorMessages.listClientInfo))
        }   
        dispatch(setIsFetching(false))
        return resucedArray
    }
}
export const getListOfWorksThunk = (token:string)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        let resucedArray = []
        try {
            const result = await workerApi.getListOfWorks(token)
            if(result){
                resucedArray = result.list.map(({ name, id }:any) => ({ name, id}));
            }
        }catch(error){
            dispatch(setError(errorMessages.listWorksInfo))
        }   
        dispatch(setIsFetching(false))
        return resucedArray
    }
}

export const sendWorkerPlanThunk = (token:string, id:string, data:any)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await workerApi.sendPlan(token, id, data)
            if(result){
                alert('ok')
            }
        }catch(error){
            dispatch(setError(errorMessages.sendPlanInfo))
        }   
        dispatch(setIsFetching(false))
    }
}
