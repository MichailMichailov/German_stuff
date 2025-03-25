import { Route, Routes } from "react-router-dom";
import { FC, useEffect, useState } from 'react'
import st from './Leistungen.module.scss'
import trash from '../../../assets/img/trsh.png'
import { connect } from "react-redux";
import { addSolutionThunk, changeSolutionByIdThunk, deleteSolutionByIdThunk, getMaterialsThunk, getSolutionsThunk } from "../../../redux/reducers/adminReducer";


interface PropsType {
    getSolutionsThunk: () => void,
    changeSolutionByIdThunk: (id: string, body: any) => void,
    deleteSolutionByIdThunk: (id: string) => void,
    addSolutionThunk: (body: any) => void,
    getMaterialsThunk: () => void,
    solutions: {
        id: string; name: string; description: string; materials: string[]
    }[],
    materials: {
        id: string; name: string; description: string; menge: number; is_consumable: boolean;
    }[]
}

export const Leistungen: FC<PropsType> = (props) => {
    const [activId, setActivId] = useState("");
    const [name, setName] = useState("Leistungen 2");
    const [desc, setDesc] = useState("Old Description");
    const [materials, setMaterials] = useState<string[]>([]);
    useEffect(() => {
        const aFunc = async () => { 
            await props.getSolutionsThunk() 
            await props.getMaterialsThunk()
        }
        aFunc()
    }, []);
    useEffect(() => {
        const result = props.solutions.find(k => k.id === activId);
        if (result) {
            setName(result.name)
            setDesc(result.description)
            setMaterials(result.materials)
        }
    }, [activId])
    const addSoluton = async() =>{ await props.addSolutionThunk({name:'new Solution'})}
    const deleteSolution = async() =>{ await props.deleteSolutionByIdThunk(activId) }
    const handleSave = async() => {
        const customerData = { name: name, description: desc, materials:materials};
        await props.changeSolutionByIdThunk(activId, customerData)
    };
    const changeMaterial = (id: number, newId: string) => {
        setMaterials(prev =>  prev.map((m, i) => (i === id ? newId : m)));
    };
    const addMaterial = () =>{ setMaterials(prev => [ ...prev, "0" ])}
    const deleteMaterial = (id:number) =>{ setMaterials(prev => prev.filter((_, i) => i !== id))}
    return (
        <div className={st.Leistungen + ' partOfPanel'}>
            <div className='partOfPanel__content container'>
                <div className='partOfPanel__content_left'>
                    <div className={st.list + ' list'}>
                        <div className='list__title'>Leistungen</div>
                        <ul>
                            {props.solutions.map(e=>(
                                <li className={e.id == activId?'list__choose':''} 
                                onClick={event => { setActivId(e.id) }}>{e.name}</li>
                            ))}
                        </ul>
                        <div className='list__btnAdd' onClick={addSoluton}>+</div>
                    </div>
                </div>
                <div className='partOfPanel__content_right'>
                    <form className="adminForm">
                        <h2>Info about Leistungen</h2>
                        <fieldset className="">
                        <div className=""><label htmlFor="name">Name</label></div>
                                <div className="">
                                    <input type="text" id="name" value={name}
                                        onChange={(e) => setName(e.target.value)} required />
                                </div>
                        </fieldset>
                        <fieldset className="">
                       
                                <div className=""><label htmlFor="desc">Description</label></div>
                                <div className="">
                                    <textarea id="desc" value={desc}
                                        onChange={(e) => setDesc(e.target.value)} required />
                                </div>
                        </fieldset>
                        <div className='btns btnsR'>
                            <button className='btn' type="button" onClick={handleSave}>Change</button>
                            <button className='btn btnRed btnImg' type="button" onClick={deleteSolution}><div className={st.img}><img src={trash} alt=""/></div></button>
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
                                        <th>Is Consumable</th>
                                        <th>Aktion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {materials.map((m:string, id:number) => {
                                        let maT = props.materials.filter(s => s.id == m)[0]
                                        const mat = maT?maT:{id:'None', is_consumable:false}
                                        return(<tr >
                                            <td>
                                                <select name="" id="" onChange={(e) => changeMaterial(id, e.target.value)}>{
                                                props.materials.map(m=>(<option key={m.id} value={m.id}>{m.name}</option>))
                                                }</select>
                                            </td>
                                            <td><input type="number" name="" id="" value={5}/></td> <td>{mat.is_consumable?"Ja":"nein"}</td>
                                            <td>
                                                <div className={st.img} onClick={()=>{deleteMaterial(id)}}> <img src={trash} alt="Löschen" /> </div>
                                            </td>
                                        </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className={st.table__btnAdd}>
                            <div className={st.table__btnAdd_btn} onClick={addMaterial}>+</div>
                            <div className="panel">Daten gespeichert</div>
                            <div className={st.table__btnAdd_btn} onClick={handleSave}>✔</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state: any) => ({
    solutions:state.admin.solutions,
    materials:state.admin.materials
});
export const RealLeistungen = connect(mapStateToProps, { 
    getSolutionsThunk, changeSolutionByIdThunk, addSolutionThunk, deleteSolutionByIdThunk,getMaterialsThunk
 })(Leistungen);
