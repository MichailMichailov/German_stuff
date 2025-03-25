import { FC, useEffect, useState } from 'react'
import st from './Kunden.module.scss'
import trash from '../../../assets/img/trsh.png'
import { connect } from "react-redux";
import { addKundenThunk, changeKundenByIdThunk, deleteKundenByIdThunk, getKundensThunk, getSolutionsThunk, getWorkersThunk } from '../../../redux/reducers/adminReducer';
interface Solution { solutionId: string; workerId: string; interval: number; }
interface PropsType {
    getKundensThunk: () => void,
    getSolutionsThunk: () => void,
    getWorkersThunk: () => void,
    changeKundenByIdThunk: (id:string, body:any) =>void,
    deleteKundenByIdThunk:(id:string) =>void,
    addKundenThunk:(body:any)=>void,
    solutions: { id: string; name: string; description: string; materials: string[] }[],
    workers: { id: string; login: string; password: string; }[]
    kundens: {
        id: string; name: string; phone: string; address: string; email: string;
        solutions: Solution[];
    }[]

}

export const Kunden: FC<PropsType> = (props) => {
    console.log(props)
    const [activId, setActivId] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [solutions, setSolutions] = useState<Solution[]>([]);
    useEffect(() => {
        const aFunc = async () => {
            await props.getKundensThunk()
            await props.getWorkersThunk()
            await props.getSolutionsThunk()
        }
        aFunc()
    }, []);
    useEffect(() => {
        const result = props.kundens.find(k => k.id === activId);
        if (result) {
            setName(result.name)
            setAddress(result.address)
            setTelephone(result.phone)
            setEmail(result.email)
            setSolutions(result.solutions)
        }
    }, [activId])

    const addKunden = async() =>{ await props.addKundenThunk({name:"new Kunden"}) }
    const deleteKunden = async() =>{ await props.deleteKundenByIdThunk(activId) }
    const handleSave = async() => {
        const customerData = { name, address, phone: telephone,email,solutions };
        await props.changeKundenByIdThunk(activId, customerData)
    }
    
    const addSolution = () =>{ setSolutions(prev => [ ...prev,  { solutionId: '', workerId: '', interval: 0 } ])}
    const deleteSolution = (id:number) =>{ setSolutions(prev => prev.filter((_, i) => i !== id))}
    const changeSolution = (index: number, newSolutionId: string) => { 
        setSolutions(prev => prev.map((solution, i) =>  i === index ? { ...solution, solutionId: newSolutionId } : solution )) 
    }
    const changeWorker = (index: number, newWorkerId: string) => {
        setSolutions(prev => prev.map((solution, i) =>  i === index ? { ...solution, workerId: newWorkerId } : solution ))
    }
    const changeInterval = (index: number, newInterval: number) => {
        setSolutions(prev => prev.map((solution, i) => i === index ? { ...solution, interval: newInterval } : solution ))
    }
    return (
        <div className={st.Kunden}>
            <div className={st.Kunden__content + ' container'}>
                <div className={st.Kunden__content_left}>
                    <div className={st.employees + ' list'}>
                        <div className='list__title'>Kunden</div>
                        <ul>
                            {props.kundens.map(e => (
                                <li className={e.id == activId ? 'list__choose' : ''}
                                    onClick={event => { setActivId(e.id) }}>{e.name}</li>))}
                        </ul>
                        <div className='list__btnAdd' onClick={addKunden}>+</div>
                    </div>
                </div>
                <div className={st.Kunden__content_right}>
                    <div className={st.btns}>
                        <div className={st.btns__item + ' btn'}>Exportieren</div>
                        <div className={st.btns__item + ' btn'}>Drucken</div>
                    </div>
                    <form action="" className={'adminForm ' + st.form}>
                        <h2>Customer Information</h2>
                        <fieldset className='adminForm__specfieldset'>
                            <div className="">
                                <div><label htmlFor="name">Name</label></div>
                                <div>
                                    <input type="text" id="name" value={name}
                                        onChange={(e) => setName(e.target.value)} required />
                                </div>
                            </div>

                            <div className="">
                                <div><label htmlFor="address">Address</label></div>
                                <div>
                                    <input type="text" id="address" value={address}
                                        onChange={(e) => setAddress(e.target.value)} required />
                                </div>
                            </div>
                            <div className="">
                                <div><label htmlFor="telephone">Telephone</label></div>
                                <div>
                                    <input type="text" id="telephone" value={telephone}
                                        onChange={(e) => setTelephone(e.target.value)} required />
                                </div>
                            </div>
                            <div className="">
                                <div><label htmlFor="email">Email</label></div>
                                <div>
                                    <input type="email" id="email" value={email}
                                        onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            </div>
                        </fieldset>
                        <div className='btns btnsR'>
                            <button className='btn' onClick={handleSave} type='button'>Change</button>
                            <button className='btn btnRed btnImg' type="button" onClick={deleteKunden}><div className={st.img}><img src={trash} alt="" /></div></button>
                        </div>
                    </form>
                    <div className={st.table}>
                        <div className={st.table__title + ' title'}>VenomTech Solutions</div>
                        <div className="table__table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tatigkeit</th><th>Mitarbeiter</th>
                                        <th>Intervall in Tage</th> <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {solutions.map((s: Solution, id: number) => {
                                        return (<tr>
                                            <td>
                                                <select onChange={(e) => changeSolution(id, e.target.value)}>
                                                    {props.solutions.map(e => (
                                                        <option value={e.id} selected={s.solutionId == e.id}>{e.name}</option>))}
                                                </select> </td>
                                            <td> 
                                                <select onChange={(e) => changeWorker(id, e.target.value)}>
                                                    {props.workers.map(e => (<option value={e.id} selected={s.workerId == e.id}>{e.login}</option>))}
                                                </select> 
                                            </td>
                                            <td><input type="number" value={s.interval} onChange={(e) => changeInterval(id, parseInt(e.target.value))} /></td>
                                            <td><div className={st.img} onClick={() => { deleteSolution(id) }}><img src={trash} alt="" /></div></td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className={st.table__btnAdd}>
                            <div className={st.table__btnAdd_btn} onClick={addSolution} >+</div>
                            <div className='panel'>Daten gespeichert</div>
                            <div className={st.table__btnAdd_btn} onClick={handleSave}>✔</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



const mapStateToProps = (state: any) => ({
    kundens: state.admin.kundens,
    solutions: state.admin.solutions,
    workers: state.admin.workers,
});

export const RealKunden = connect(mapStateToProps, { 
    getKundensThunk, getWorkersThunk, getSolutionsThunk,
    deleteKundenByIdThunk, addKundenThunk, changeKundenByIdThunk
 })(Kunden);
