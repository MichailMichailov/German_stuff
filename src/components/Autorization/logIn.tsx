import { FC, useEffect } from 'react'
import { logInThunk } from '../../redux/reducers/authReducer'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import st from './LogIn.module.scss'
import logo from '../../assets/img/Uhlig-Logo-Rechteck1.png'
import React, { useState } from "react";

interface PropsType {
    logInThunk: (login: string, passwprd: string) => any
    isFetching: boolean
}

export const LogIn: FC<PropsType> = (props) => {
    const navigate = useNavigate()
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const result: number = await props.logInThunk(user, password)
        if (result === 1) {
            // navigate('/')
        } else {
            //    setError('Не верный логин или пароль')
        }
    }
    return (
        <div className={st.logIn}>
            <header className={st.logHeader}>
                <div className={st.logHeader__img}>
                    <img src={logo} alt="" />
                </div>
            </header>
            <main className={st.logMain}>
                <form onSubmit={onSubmit}>
                    <h2>Login</h2>
                    <fieldset>
                        <div className=""><label htmlFor="username">Benutzer</label></div>
                        <div className="">
                            <input type="text" id="username" value={user}
                                onChange={(e) => setUser(e.target.value)} required />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className=""><label htmlFor="password">Password</label></div>
                        <div className="">
                            <input type="password" id="password" value={password}
                                onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </fieldset>
                    <button type="submit">Anmelden</button>
                </form>
            </main>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    isFetching: state.ui.isFetching
})
export const RealLogIn = connect(mapStateToProps, { logInThunk })(LogIn)