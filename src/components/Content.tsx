import { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import st from './Content.module.scss'
import { RealHeader } from './Header/Header'
import { Main } from './Center/Main'
import { Footer } from './Footer/Footer'
import { withRouter } from '../hooks/withRoute'
import { RealLogIn } from './Autorization/logIn'
import { RealWorkerCenter } from './WorkerCenter/WorkerCenter'
import { Preload } from './common/preload/preload'
import { PopupMessager } from './common/PopupMessager/PopupMessager'
import { cleanError } from '../redux/reducers/uiReducers'

interface PropsTypeAdmin{
}

export const ContentAdmin :FC<PropsTypeAdmin> = (props) => {

    return (
        <div className={st.content}>
            <RealHeader/>
            <Main/>
            <Footer/>
        </div>
    )
}

interface PropsType{
    isAuth: boolean,
    isFetching:boolean,
    user:{
        login:string,
        role: string
    },
    ErrorMessage:string,
    cleanError:()=>void
}
export const Content:FC<PropsType> = (props) => {
    return (
        <div className={st.content}>
            <PopupMessager message={props.ErrorMessage} cleanError={props.cleanError} type={0}/>
            {props.isFetching && <Preload/>}
            {props.isAuth?
                props.user.role=='admin'?<ContentAdmin/>:<RealWorkerCenter/>
                :<RealLogIn/>}
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    isFetching: state.ui.isFetching,
    user: state.auth.user,
    ErrorMessage: state.ui.error
})
export const RealContent = connect(mapStateToProps, {cleanError})(withRouter(Content))