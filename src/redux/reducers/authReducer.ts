import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../api/api'
import { setIsFetching, setParagraphThunk } from './uiReducers'
import { setWorkerByIdThunk } from './workerReducer'


type actionType = {
    type:string
    payload:any
}

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isAuth:false,
        userId:null,
        user:{
            login:'',
            role:''
        }
    },
    reducers:{
        setIsAuth(state, action:actionType){
            state.isAuth = action.payload
        },
        setUser(state, action:actionType){
            state.user = action.payload
        },
        setUserId(state, action:actionType){
            state.userId = action.payload
        }
    }
})
const { setIsAuth, setUserId} = authSlice.actions
export const { setUser }= authSlice.actions
export const authReducer = authSlice.reducer


export const logInThunk = (login:string, password:string)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await authApi.logAuth(login, password)
        if(result){
            dispatch(setIsAuth(true))
            dispatch(setUserId(result.id))
            dispatch(setUser({login:result.name, role:result.role}))
            if (result.role == 'worker')
                dispatch(setWorkerByIdThunk(result.id))
        } 
        dispatch(setIsFetching(false))
        return 1
    }
}

export const logOutThunk = ()=>{
    return async (dispatch: Function) => {
        dispatch(setIsAuth(false))
        dispatch(setUser({login:'',role:''}))
    }
}

