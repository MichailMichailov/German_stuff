import { createSlice } from '@reduxjs/toolkit'
import { workerApi } from '../../api/api'
import { setError, setIsFetching } from './uiReducers'

type actionType = {
    type:string
    payload:any
}

const workerSlice = createSlice({
    name:'worker',
    initialState:{
        data:[]
    },
    reducers:{
        setWorkerData(state, action:actionType){
            state.data = action.payload
        }
    }
})
export const { setWorkerData }= workerSlice.actions
export const workerReducer = workerSlice.reducer


export const setWorkerByIdThunk  = (token:string, id:string)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try {
            const result = await workerApi.getWorkerById(token, id)
            console.log(result)
            dispatch(setWorkerData(result.list))
        }catch(error){
            dispatch(setError(error))
            alert(error)
        }   
        dispatch(setIsFetching(true))
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
            dispatch(setError(error))
            alert(error)
        }   

        dispatch(setIsFetching(false))
    }
}
