import { Route, Routes } from "react-router-dom";
import { FC, useState } from 'react'
import st from './Leistungen.module.scss'



interface PropsType {
}

export const Leistungen: FC<PropsType> = (props) => {
    const [name, setName] = useState("Leistungen 2");
    const [desc, setDesc] = useState("Old Description");
    return (
        <div className={st.Leistungen + ' partOfPanel'}>
            <div className='partOfPanel__content container'>
                <div className='partOfPanel__content_left'>
                    <div className={st.list + ' list'}>
                        <div className='list__title'>Leistungen</div>
                        <ul>
                            <li>Leistungen 1</li>
                            <li className='list__choose'>Leistungen 2</li>
                            <li>Leistungen 3</li>
                        </ul>
                        <div className='list__btnAdd'>+</div>
                    </div>
                </div>
                <div className='partOfPanel__content_right'>
                    <form className="adminForm">
                        <h2>Info about Leistungen</h2>
                        <fieldset>
                            <div className=""><label htmlFor="name">Name</label></div>
                            <div className="">
                                <input type="text" id="name" value={name}
                                    onChange={(e) => setName(e.target.value)} required />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className=""><label htmlFor="desc">Description</label></div>
                            <div className="">
                                <input type="text" id="desc" value={desc}
                                    onChange={(e) => setDesc(e.target.value)} required />
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