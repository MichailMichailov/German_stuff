import { createSlice } from '@reduxjs/toolkit'
import { workerApi } from '../../api/api'
import { setIsFetching } from './uiReducers'

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


export const setWorkerByIdThunk  = (id:string)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const data = workerApi.getWorkerById(id)
        dispatch(setWorkerData(data))
        dispatch(setIsFetching(true))
        return 0
    }
}

export const updateWorkerThunk = (id:string, data:any)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        await workerApi.updateWorker(id, data)
        dispatch(setIsFetching(false))
    }
}
