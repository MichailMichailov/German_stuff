import { Route, Routes } from "react-router-dom";
import { FC, useEffect, useState } from 'react'
import st from './Material.module.scss'
import { addMaterialThunk, changeMaterialByIdThunk, deleteMaterialByIdThunk, getMaterialsThunk } from "../../../redux/reducers/adminReducer";
import { connect } from "react-redux";

interface PropsType {
    getMaterialsThunk: () => void,
    changeMaterialByIdThunk: (id: string, body: any) => void,
    deleteMaterialByIdThunk: (id: string) => void,
    addMaterialThunk: (body: any) => void,
    materials: {
        id: string; name: string; description: string; menge: number; is_consumable: boolean;
    }[]
}

export const Material: FC<PropsType> = (props) =>{
    const [activId, setActivId] = useState("");
    const [mName, setMName] = useState("");
    const [desc, setdesc] = useState("");
    const [menge, setMenge] = useState(0);
    const [cons, setCons] = useState(false);
    useEffect(() => {
        const aFunc = async () => { await props.getMaterialsThunk() }
        aFunc()
    }, []);
    useEffect(() => {
        const result = props.materials.find(k => k.id === activId);
        if (result) {
            setMName(result.name)
            setdesc(result.description)
            setMenge(result.menge)
            setCons(result.is_consumable)
        }
    }, [activId])
    const addMaterial = async() =>{ await props.addMaterialThunk({name:'new Material'})}
    const deleteMaterial = async() =>{ await props.deleteMaterialByIdThunk(activId) }
    const handleSave = async() => {
        const customerData = { name: mName, description: desc, menge: menge, is_consumable: cons};
        await props.changeMaterialByIdThunk(activId, customerData)
    };
    return (
        <div className={st.Material + ' partOfPanel'}>
            <div className='partOfPanel__content container'>
                <div className='partOfPanel__content_left'>
                    <div className={st.list + ' list'}>
                        <div className='list__title'>Material</div>
                        <ul>
                            {props.materials.map(e=>(
                                <li className={e.id == activId?'list__choose':''} 
                                onClick={event => { setActivId(e.id) }}>{e.name}</li>
                            ))}
                        </ul>
                        <div className='list__btnAdd' onClick={addMaterial}>+</div>
                    </div>
                </div>

                <div className='partOfPanel__content_right'>
                    <form className="adminForm">
                        <h2>Info about Material</h2>
                        <fieldset>
                            <div className=""><label htmlFor="mName">Material Name</label></div>
                            <div className="">
                                <input type="text" id="mName" value={mName}
                                    onChange={(e) => setMName(e.target.value)} required />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className=""><label htmlFor="pass">Mterial Description</label></div>
                            <div className="">
                                <input type="text" id="pass" value={desc}
                                    onChange={(e) => setdesc(e.target.value)} required />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className=""><label htmlFor="pass">Avaliable Count</label></div>
                            <div className="">
                                <input type="text" id="pass" value={menge}
                                    onChange={(e) => setMenge(parseInt(e.target.value))} required />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="adminForm__aInput">
                                <input type="checkbox" id="pass" checked = {cons}
                                    onChange={(e) => setCons(!cons)} />
                            </div>
                            <div className="adminForm__aLabel"><label htmlFor="pass">Is Consumable</label></div>
                        </fieldset>
                        <div className='btns'>
                            <button className='btn' type="button" onClick={handleSave}>Change</button>
                            <button className='btn btnRed' type="button" onClick={deleteMaterial}>Delete</button>
                        </div>
                        <div className='panel adminForm__panel'>Daten gespeichert</div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    materials:state.admin.materials
});

export const RealMaterial = connect(mapStateToProps, { 
    getMaterialsThunk, changeMaterialByIdThunk, addMaterialThunk, deleteMaterialByIdThunk
 })(Material);
