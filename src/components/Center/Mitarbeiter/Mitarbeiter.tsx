import { Route, Routes } from "react-router-dom";
import { FC, useState } from 'react'
import st from './Mitarbeiter.module.scss'


interface PropsType{
}

export const Mitarbeiter: FC<PropsType> = (props) =>{

    const [login, setLogin] = useState("Mitarbeiter 2");
    const [pass, setPass] = useState("Old Description");
    return (
        <div className={st.Mitarbeiter + ' partOfPanel'}>
            <div className='partOfPanel__content container'>
                <div className='partOfPanel__content_left'>
                    <div className={st.list + ' list'}>
                        <div className='list__title'>Mitarbeiter</div>
                        <ul>
                            <li>Mitarbeiter 1</li>
                            <li className='list__choose'>Mitarbeiter 2</li>
                            <li>Mitarbeiter 3</li>
                        </ul>
                        <div className='list__btnAdd'>+</div>
                    </div>
                </div>

                <div className='partOfPanel__content_right'>
                    <form className="adminForm">
                        <h2>Info about Mitarbeiter</h2>
                        <fieldset>
                            <div className=""><label htmlFor="login">Login</label></div>
                            <div className="">
                                <input type="text" id="login" value={login}
                                    onChange={(e) => setLogin(e.target.value)} required />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className=""><label htmlFor="pass">Password</label></div>
                            <div className="">
                                <input type="text" id="pass" value={pass}
                                    onChange={(e) => setPass(e.target.value)} required />
                            </div>
                        </fieldset>
                        <div className='btns'>
                            <button className='btn'>Change</button>
                            <button className='btn btnRed'>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}