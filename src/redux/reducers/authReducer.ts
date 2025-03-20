import { createSlice } from '@reduxjs/toolkit'


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


export const registrationThunk  = (login:string, password:string)=>{
    return async (dispatch: Function) => {
        
        return 0
    }
}

export const logInThunk = (login:string, password:string)=>{
    return async (dispatch: Function) => {
        if(login == 'admin'){
            dispatch(setUser({login:'Admin',role:'admin'}))
        }else{
            dispatch(setUser({login:'Gabriel',role:'worker'}))
        }
        dispatch(setIsAuth(true))
        return 1
    }
}

export const logOutThunk = ()=>{
    return async (dispatch: Function) => {
        dispatch(setIsAuth(false))
        dispatch(setUser({login:'',role:''}))
    }
}

