import { Route, Routes } from "react-router-dom";
import { FC, useEffect, useRef, useState } from 'react'
import st from './Leistungen.module.scss'
import trash from '../../../assets/img/trsh.png'
import { connect } from "react-redux";
import { addSolutionThunk, changeSolutionByIdThunk, deleteSolutionByIdThunk, getMaterialsThunk, getSolutionsThunk } from "../../../redux/reducers/adminReducer";
import { StatusMessage } from "../../common/StatusMessage/StatusMessage";


interface PropsType {
    getSolutionsThunk: (token: string) => void,
    changeSolutionByIdThunk: (token: string, id: string, body: any) => void,
    deleteSolutionByIdThunk: (token: string, id: string) => void,
    addSolutionThunk: (token: string, body: any) => void,
    getMaterialsThunk: (token: string) => void,
    solutions: {
        id: string; name: string; description: string; materials: string[], quantity: number;
    }[],
    materials: {
        id: string; name: string; description: string; menge: number; is_consumable: boolean;
    }[],
    token: string
}

export const Leistungen: FC<PropsType> = (props) => {
    const [activId, setActivId] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [materials, setMaterials] = useState<string[]>([]);
    const [signal, setSignal] = useState(false);
    useEffect(() => {
        const aFunc = async () => {
            await props.getSolutionsThunk(props.token)
            await props.getMaterialsThunk(props.token)
        }
        aFunc()
    }, []);
    useEffect(() => {
        if( props.solutions){
            const result = props.solutions.find(k => k.id === activId);
            if (result) {
                setName(result.name ? result.name : '')
                setDesc(result.description ? result.description : '')
                setMaterials(result.materials ? result.materials : [])
                setQuantity(result.quantity? result.quantity:0)
            }
        }else{
            setName( '')
            setDesc('')
            setMaterials( [])
            setQuantity(0)
        }
    }, [activId])
    const addSoluton = async () => { await props.addSolutionThunk(props.token, { name: 'new Solution' }) }
    const deleteSolution = async () => {
        await props.deleteSolutionByIdThunk(props.token, activId)
        setActivId('')
    }
    const handleSave = async () => {
        setSignal(!signal)
        const customerData = { name: name, description: desc, materials: materials.map(v=>parseInt(v)), quantity:quantity };
        await props.changeSolutionByIdThunk(props.token, activId, customerData)
    };
    const changeMaterial = (id: number, newId: string) => { setMaterials(prev => prev.map((m, i) => (i === id ? newId : m)))};
    const addMaterial = () => {  
        setMaterials(prev => [...prev, (props.materials?props.materials.length>0?props.materials[0].id:'':'')]) 
    }
    const deleteMaterial = (id: number) => { setMaterials(prev => prev.filter((_, i) => i !== id)) }
    return (
        <div className={st.Leistungen + ' partOfPanel'}>
            <div className='partOfPanel__content container'>
                <div className='partOfPanel__content_left'>
                    <div className={st.list + ' list'}>
                        <div className='list__title'>Leistungen</div>
                        <ul>
                            {props.solutions&&props.solutions.map(e => (
                                <li className={e.id == activId ? 'list__choose' : ''}
                                    onClick={event => { setActivId(e.id) }}>{e.name}</li>
                            ))}
                        </ul>
                        <div className='list__btnAdd' onClick={addSoluton}>+</div>
                    </div>
                </div>
                <div className='partOfPanel__content_right' style={{opacity:activId==''?0:1}}>
                    <form className="adminForm">
                        <h2>Information zu Leistungen</h2>
                        <fieldset className="">
                            <div className=""><label htmlFor="name">Name</label></div>
                            <div className="">
                                <input type="text" id="name" value={name}
                                    onChange={(e) => setName(e.target.value)} required />
                            </div>
                        </fieldset>
                        <fieldset className="">
                            <div className=""><label htmlFor="name">Menge</label></div>
                            <div className="">
                                <input type="number" id="name" value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))} required />
                            </div>
                        </fieldset>
                        <fieldset className="">

                            <div className=""><label htmlFor="desc">Beschreibung</label></div>
                            <div className="">
                                <textarea id="desc" value={desc}
                                    onChange={(e) => setDesc(e.target.value)} required />
                            </div>
                        </fieldset>
                        <div className='btns btnsR'>
                            <button className='btn' type="button" onClick={handleSave}>Ändern</button>
                            <button className='btn btnRed btnImg' type="button" onClick={deleteSolution}><div className={st.img}><img src={trash} alt="" /></div></button>
                        </div>
                    </form>

                    <div className={st.table}>
                        <div className={st.table__title + ' title'}>Notwendige Materialien</div>
                        <div className="table__table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Material Name</th>
                                        <th>Menge</th>
                                        <th>Ist Verbrauchsmaterial</th>
                                        <th>Aktion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {materials.map((m: string, id: number) => {
                                        let maT = props.materials?props.materials.filter(s => s.id == m)[0]:{ id: 'None', is_consumable: false, menge: 0 }
                                        const mat = maT ? maT : { id: 'None', is_consumable: false, menge: 0 }
                                        return (<tr >
                                            <td>
                                                <select name="" id="" onChange={(e) => changeMaterial(id, e.target.value)}>{
                                                    props.materials&&props.materials.map(mat => (<option key={mat.id} value={mat.id} selected={m == mat.id}>{mat.name}</option>))
                                                }</select>
                                            </td>
                                            <td>{mat.menge}</td> <td>{mat.is_consumable ? "Ja" : "nein"}</td>
                                            <td>
                                                <div className={st.img} onClick={() => { deleteMaterial(id) }}> <img src={trash} alt="Löschen" /> </div>
                                            </td>
                                        </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className={st.table__btnAdd}>
                            <div className={st.table__btnAdd_btn} onClick={addMaterial}>+</div>
                            <StatusMessage dependencies={[name, desc,quantity,materials ]} activId={activId} signal={signal} type={true}/>
                    
                            <div className={st.table__btnAdd_btn} onClick={handleSave}>✔</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state: any) => ({
    solutions: state.admin.solutions,
    materials: state.admin.materials,
    token: state.auth.token
});
export const RealLeistungen = connect(mapStateToProps, {
    getSolutionsThunk, changeSolutionByIdThunk, addSolutionThunk, deleteSolutionByIdThunk, getMaterialsThunk
})(Leistungen);
