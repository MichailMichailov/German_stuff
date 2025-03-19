import { FC, useEffect } from 'react'
import st from './Content.module.scss'
import { RealHeader } from './Header/Header'
import { Main } from './Center/Main'
import { Footer } from './Footer/Footer'

interface PropsType{
}

export const Content :FC<PropsType> = (props) => {

    return (
        <div className={st.content}>
            <RealHeader/>
            <Main/>
            <Footer/>
        </div>
    )
}