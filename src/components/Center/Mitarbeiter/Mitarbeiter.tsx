import { Route, Routes } from "react-router-dom";
import { FC, useEffect, useState } from 'react'
import st from './Mitarbeiter.module.scss'
import { connect } from "react-redux";
import { addWorkerThunk, changeWorkerByIdThunk, deleteWorkerByIdThunk, getWorkersThunk } from "../../../redux/reducers/adminReducer";

interface PropsType{
    getWorkersThunk: (token:string) => void,
    changeWorkerByIdThunk: (token:string, id: string, body: any) => void,
    deleteWorkerByIdThunk: (token:string, id: string) => void,
    addWorkerThunk: (token:string, body: any) => void,
    workers: {
        id: string; login: string; password: string;
    }[],
    token:string,
}

export const Mitarbeiter: FC<PropsType> = (props) =>{
    const [activId, setActivId] = useState("");
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    useEffect(() => {
        const aFunc = async () => { await props.getWorkersThunk(props.token) }
        aFunc()
    }, []);
    useEffect(() => {
        const result = props.workers.find(k => k.id === activId);
        if (result) {
            setLogin(result.login?result.login:'')
            setPass(result.password?result.password:'')
        }else{
            setLogin('')
            setPass('')
        }
    }, [activId])
    const addWorker = async() =>{ await props.addWorkerThunk(props.token, {login:'new Worker'})}
    const deleteWorker = async() =>{ 
        await props.deleteWorkerByIdThunk(props.token, activId) 
        setActivId('')
    }
    const handleSave = async() => {
        const customerData = { login: login, password: pass};
        await props.changeWorkerByIdThunk(props.token, activId, customerData)
    };
    return (
        <div className={st.Mitarbeiter + ' partOfPanel'}>
            <div className='partOfPanel__content container'>
                <div className='partOfPanel__content_left'>
                    <div className={st.list + ' list'}>
                        <div className='list__title'>Mitarbeiter</div>
                        <ul>
                            {props.workers.map(e=>(
                                <li className={e.id == activId?'list__choose':''} 
                                onClick={event => { setActivId(e.id) }}>{e.login}</li>
                            ))}
                        </ul>
                        <div className='list__btnAdd' onClick={addWorker}>+</div>
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
                            <button className='btn' type="button" onClick={handleSave}>Change</button>
                            <button className='btn btnRed' type="button" onClick={deleteWorker}>Delete</button>
                        </div>
                        <div className='panel adminForm__panel'>Daten gespeichert</div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    workers:state.admin.workers,
    token: state.auth.token
});

export const RealMitarbeiter = connect(mapStateToProps, { 
    getWorkersThunk, changeWorkerByIdThunk, addWorkerThunk, deleteWorkerByIdThunk
 })(Mitarbeiter);