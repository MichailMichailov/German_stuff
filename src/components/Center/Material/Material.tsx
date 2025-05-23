import { Route, Routes } from "react-router-dom";
import { FC, useEffect, useRef, useState } from 'react'
import st from './Material.module.scss'
import { addMaterialThunk, changeMaterialByIdThunk, deleteMaterialByIdThunk, getMaterialsThunk } from "../../../redux/reducers/adminReducer";
import { connect } from "react-redux";
import { StatusMessage } from "../../common/StatusMessage/StatusMessage";

interface PropsType {
    getMaterialsThunk: (token:string) => void,
    changeMaterialByIdThunk: (token:string, id: string, body: any) => void,
    deleteMaterialByIdThunk: (token:string, id: string) => void,
    addMaterialThunk: (token:string, body: any) => void,
    materials: {
        id: string; name: string; description: string; menge: number; is_consumable: boolean;
    }[],
    token:string
}

export const Material: FC<PropsType> = (props) =>{
    const [activId, setActivId] = useState("");
    const [mName, setMName] = useState("");
    const [desc, setdesc] = useState("");
    const [menge, setMenge] = useState(0);
    const [cons, setCons] = useState(false);
    const [signal, setSignal] = useState(false);
    useEffect(() => {
        const aFunc = async () => { await props.getMaterialsThunk(props.token) }
        aFunc()
    }, []);
    useEffect(() => {
        if(props.materials){
            const result = props.materials.find(k => k.id === activId);
            if (result) {
                setMName(result.name?result.name:'')
                setdesc(result.description?result.description:'')
                setMenge(result.menge?result.menge:0 )
                setCons(result.is_consumable?result.is_consumable:false)
            }
        }
        else{
            setMName('')
            setdesc('')
            setMenge(0)
            setCons(false)
        }
    }, [activId])
    const addMaterial = async() =>{ await props.addMaterialThunk(props.token, {name:'new Material'})}
    const deleteMaterial = async() =>{ 
        await props.deleteMaterialByIdThunk(props.token, activId) 
        setActivId('')
    }
    const handleSave = async() => {
        setSignal(!signal)
        const customerData = { name: mName, description: desc, menge: menge, is_consumable: cons};
        await props.changeMaterialByIdThunk(props.token, activId, customerData)
    };
    return (
        <div className={st.Material + ' partOfPanel'}>
            <div className='partOfPanel__content container'>
                <div className='partOfPanel__content_left'>
                    <div className={st.list + ' list'}>
                        <div className='list__title'>Material</div>
                        <ul>
                            {props.materials&& props.materials.map(e=>(
                                <li className={e.id == activId?'list__choose':''} 
                                onClick={event => { setActivId(e.id) }}>{e.name}</li>
                            ))}
                        </ul>
                        <div className='list__btnAdd' onClick={addMaterial}>+</div>
                    </div>
                </div>

                <div className='partOfPanel__content_right' style={{opacity:activId==''?0:1}}>
                    <form className="adminForm">
                        <h2>Informationen über Material</h2>
                        <fieldset>
                            <div className=""><label htmlFor="mName">Name</label></div>
                            <div className="">
                                <input type="text" id="mName" value={mName}
                                    onChange={(e) => setMName(e.target.value)} required />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className=""><label htmlFor="pass">Beschreibung</label></div>
                            <div className="">
                                <input type="text" id="pass" value={desc}
                                    onChange={(e) => setdesc(e.target.value)} required />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className=""><label htmlFor="pass">Verfügbare Anzahl</label></div>
                            <div className="">
                                <input type="number" id="pass" value={menge}
                                    onChange={(e) => setMenge(parseInt(e.target.value))} required />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="adminForm__aInput">
                                <input type="checkbox" id="pass" checked = {cons}
                                    onChange={(e) => setCons(!cons)} />
                            </div>
                            <div className="adminForm__aLabel"><label htmlFor="pass">Ist Verbrauchsmaterial</label></div>
                        </fieldset>
                        <div className='btns'>
                            <button className='btn' type="button" onClick={handleSave}>Ändern</button>
                            <button className='btn btnRed' type="button" onClick={deleteMaterial}>Löschen</button>
                        </div>
                        <StatusMessage dependencies={[mName, desc,menge,cons ]} 
                            activId={activId} signal={signal} type={false}/>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    materials:state.admin.materials,
    token:state.auth.token
});

export const RealMaterial = connect(mapStateToProps, { 
    getMaterialsThunk, changeMaterialByIdThunk, addMaterialThunk, deleteMaterialByIdThunk
 })(Material);
