import { createSlice } from '@reduxjs/toolkit'
import { settingsApi } from '../../api/api'

type actionType = {
    type:string
    payload:any
}

const uiSlice = createSlice({
    name:'ui',
    initialState:{
        isFetching:false,
        menuParagrph:0,
        error:'',
        date:'',
    },
    reducers:{
        setMenuParagrph(state, action:actionType){
            state.menuParagrph = action.payload
        },
        setIsFetching(state, action:actionType){
            state.isFetching = action.payload
        },
        setError(state, action:actionType){
            state.error = action.payload
        },
        setDateWeek(state, action:actionType){
            state.date = action.payload
        },
    }
})
const { setMenuParagrph, setDateWeek} = uiSlice.actions
export const { setIsFetching, setError} = uiSlice.actions
export const uiReducer = uiSlice.reducer

export const setParagraphThunk = (numberParagraph:number) => {
    return (dispatch: Function) => {
        dispatch(setMenuParagrph(numberParagraph))
    }
}

export const cleanError = () => {
    return (dispatch: Function) => {
        dispatch(setError(''))
    }
}

export const setSettings = (token:string, date:string) => {
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try{
            const result = await settingsApi.updateDate(token,date)
            if(result){
                dispatch(setDateWeek(result.list))
            } 
        }catch(error){
            dispatch(setError('error date update'))
        }
        dispatch(setIsFetching(false))
    }
}
export const getDate = (token:string) => {
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try{
            const result = await settingsApi.getDate(token)
            if(result){
                dispatch(setDateWeek(result.list))
            } 
        }catch(error){
            dispatch(setError('error date update'))
        }
        dispatch(setIsFetching(false))
    }
}