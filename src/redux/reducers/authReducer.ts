import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../api/api'
import { setError, setIsFetching, setParagraphThunk } from './uiReducers'
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
        token:'',
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
        },
        setToken(state, action:actionType){
            state.token = action.payload
        },
    }
})
const { setIsAuth, setUserId, setToken} = authSlice.actions
export const { setUser }= authSlice.actions
export const authReducer = authSlice.reducer


export const logInThunk = (login:string, password:string)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        try{
            const result = await authApi.logAuth(login, password)
            if(result){
                dispatch(setIsAuth(true))
                dispatch(setUserId(result.id))
                dispatch(setToken(result.token))
                dispatch(setUser({login:result.login, role:result.role}))
            } 
        }catch(error){
            dispatch(setError(error))
            alert('login')
        }
       
        dispatch(setIsFetching(false))
        return 1
    }
}

export const logOutThunk = ()=>{
    return async (dispatch: Function) => {
        dispatch(setIsAuth(false))
        dispatch(setToken(''))
        dispatch(setUser({login:'',role:''}))
    }
}

