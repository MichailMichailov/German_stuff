import { Route, Routes } from "react-router-dom";
import { FC } from 'react'
import st from './Main.module.scss'

import { RealDashboard } from "./Dashboard/Dashboard";
import { RealArbeitsplane } from "./Arbeitsplane/Arbeitsplane";
import { RealKunden } from "./Kunden/Kunden";
import { RealLeistungen } from "./Leistungen/Leistungen";
import { RealMitarbeiter } from "./Mitarbeiter/Mitarbeiter";
import { RealMaterial } from "./Material/Material";


interface PropsType{
}

export const Main: FC<PropsType> = (props) =>{

    return (
        <main className={st.Main}>

            <Routes>
                <Route path='/' element={<RealDashboard/>}/>
                <Route path='/dashboard' element={<RealDashboard/>}/>
                <Route path='/arbeitsplane' element={<RealArbeitsplane/>}/>
                <Route path='/kunden' element={<RealKunden/>}/>
                <Route path='/leistungen' element={<RealLeistungen/>}/>
                <Route path='/mitarbeiter' element={<RealMitarbeiter/>}/>
                <Route path='/material' element={<RealMaterial/>}/>
                
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