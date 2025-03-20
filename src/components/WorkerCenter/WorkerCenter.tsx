import { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import st from './WorkerCenter.module.scss'
import logo from '../../assets/img/Uhlig-Logo-Rechteck1.png'
import { logOutThunk } from '../../redux/reducers/authReducer'


interface PropsTypeAdmin {
    logOutThunk: ()=>void
}

export const WorkerCenter: FC<PropsTypeAdmin> = (props) => {
    const [name, setName] = useState("Gabriel Becker");
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`
    return (
        <div className={st.workerCenter}>
            <header className={st.wHeader}>
                <div className={st.wHeader__img}>
                    <img src={logo} alt="" />
                </div>
                <div className={st.wHeader__logOut} onClick={() => { props.logOutThunk() }}>LogOut</div>
            </header>
            <main className={st.wMain}>
                <div className="container">
                    <h3 className={st.wMain__title}> Hallo {name} </h3>
                    <div className={st.chose}>
                        <div className={st.chose__container}>
                            <div className={st.chose__container_text}>Kunde wählen:</div>
                            <div className={st.chose__container_select}>
                                <select name="" id="">
                                    <option value="">VenomTech Solutions</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={st.wMain__info}>
                        <div className={st.wMain__info_date}>Heutiges Datum: {formattedDate}</div>
                        <div className={st.wMain__info_lists}>
                            <div className={st.list}>
                                <div className={st.list__title}>Tätigkeiten</div>
                                <div className={st.list__body}>
                                    <ul>
                                        <li><label htmlFor="">
                                            <input type="checkbox" name="" id="" />Name of item
                                        </label></li>
                                        <li><label htmlFor="">
                                            <input type="checkbox" name="" id="" />Name of item
                                        </label></li>
                                        <li><label htmlFor="">
                                            <input type="checkbox" name="" id="" />Name of item
                                        </label></li>
                                    </ul>
                                </div>
                            </div>
                            <div className={st.list}>
                                <div className={st.list__title}>Genutzte Geräte</div>
                                <div className={st.list__body}>
                                    <ul>
                                        <li><label htmlFor="">
                                            <input type="checkbox" name="" id="" />Name of item
                                        </label></li>
                                        <li><label htmlFor="">
                                            <input type="checkbox" name="" id="" />Name of item
                                        </label></li>
                                        <li><label htmlFor="">
                                            <input type="checkbox" name="" id="" />Name of item
                                        </label></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={st.wMain__info_noties}>
                            <div className={st.noties}>
                                <h3 className={st.noties__title}>Notizen</h3>
                                <div className={st.noties__text}>
                                    <textarea name="" id=""></textarea>
                                </div>
                                <div className={st.noties__btn}>
                                    <div className="btn">Speichern</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
})

export const RealWorkerCenter = connect(mapStateToProps, { logOutThunk })(WorkerCenter)