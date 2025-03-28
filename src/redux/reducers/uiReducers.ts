import { createSlice } from '@reduxjs/toolkit'

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
    }
})
const { setMenuParagrph} = uiSlice.actions
export const { setIsFetching, setError} = uiSlice.actions
export const uiReducer = uiSlice.reducer

export const setParagraphThunk = (numberParagraph:number) => {
    return (dispatch: Function) => {
        dispatch(setMenuParagrph(numberParagraph))
    }
}