import { Route, Routes } from "react-router-dom";
import { FC, useState } from 'react'
import st from './Material.module.scss'


interface PropsType{
}

export const Material: FC<PropsType> = (props) =>{

    const [mName, setMName] = useState("Material 2");
    const [pass, setPass] = useState("Old Description");
    return (
        <div className={st.Material + ' partOfPanel'}>
            <div className='partOfPanel__content container'>
                <div className='partOfPanel__content_left'>
                    <div className={st.list + ' list'}>
                        <div className='list__title'>Material</div>
                        <ul>
                            <li>Material 1</li>
                            <li className='list__choose'>Material 2</li>
                            <li>Material 3</li>
                        </ul>
                        <div className='list__btnAdd'>+</div>
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
                                <input type="text" id="pass" value={pass}
                                    onChange={(e) => setPass(e.target.value)} required />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className=""><label htmlFor="pass">Avaliable Count</label></div>
                            <div className="">
                                <input type="text" id="pass" value={pass}
                                    onChange={(e) => setPass(e.target.value)} required />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="adminForm__aInput">
                                <input type="checkbox" id="pass" value={pass}
                                    onChange={(e) => setPass(e.target.value)} />
                            </div>
                            <div className="adminForm__aLabel"><label htmlFor="pass">Is Consumable</label></div>
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