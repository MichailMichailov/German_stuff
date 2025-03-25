import { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import st from './Content.module.scss'
import { RealHeader } from './Header/Header'
import { Main } from './Center/Main'
import { Footer } from './Footer/Footer'
import { withRouter } from '../hooks/withRoute'
import { RealLogIn } from './Autorization/logIn'
import { RealWorkerCenter } from './WorkerCenter/WorkerCenter'
import { Preload } from './common/preload/preload'

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
    }
}
export const Content:FC<PropsType> = (props) => {
    return (
        <div className={st.content}>
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
    user: state.auth.user
})
export const RealContent = connect(mapStateToProps, {})(withRouter(Content))