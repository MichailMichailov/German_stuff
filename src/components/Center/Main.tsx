import { Route, Routes } from "react-router-dom";
import { FC } from 'react'
import st from './Main.module.scss'

import { Dashboard } from "./Dashboard/Dashboard";
import { Arbeitsplane } from "./Arbeitsplane/Arbeitsplane";
import { Kunden } from "./Kunden/Kunden";
import { Leistungen } from "./Leistungen/Leistungen";
import { Mitarbeiter } from "./Mitarbeiter/Mitarbeiter";
import { Material } from "./Material/Material";


interface PropsType{
}

export const Main: FC<PropsType> = (props) =>{

    return (
        <main className={st.Main}>

            <Routes>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/arbeitsplane' element={<Arbeitsplane/>}/>
                <Route path='/kunden' element={<Kunden/>}/>
                <Route path='/leistungen' element={<Leistungen/>}/>
                <Route path='/mitarbeiter' element={<Mitarbeiter/>}/>
                <Route path='/material' element={<Material/>}/>
                
                {/* <Route path='/' element={<RealMainPage setPar={props.setParagraphThunk}/>} />
                <Route path='/profile/:userId?' element={<RealProfile setPar={props.setParagraphThunk} />} />
                <Route path='/users/*' element={<RealUser setPar={props.setParagraphThunk}/>} />
                <Route path='/settings/*' element={<RealSettings setPar={props.setParagraphThunk}/>} />
                <Route path='/login/*' element={<RealLogIn/>} />
                <Route path='/registration/*' element={<RealRegistration/>} /> */}
            </Routes>
        </main>
    )
}