import { FC } from 'react'
import st from './Dashboard.module.scss'


interface PropsType{
}

export const Dashboard: FC<PropsType> = (props) =>{
    return (
       <div className={st.Dashboard}>
            <div className="container">
                <div className={st.Dashboard__top}>
                    <div className={st.data}>
                        <div className={st.data__container}>
                            <div className={st.data__container_text}>Datum wählen:</div>
                            <div className={st.data__container_select}>
                                <select name="" id="">
                                    <option value="">heute</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={st.Dashboard__bottom}>
                    <div className={st.employees}>
                        <div className={st.employees__title + ' title'}>Mitarbeiter</div>
                        <div className={st.employees__list}>
                            <ul>
                                <li className={st.choose}>lorem</li>
                                <li>lorem</li>
                                <li className={st.choose}>lorem</li>
                                <li className={st.choose}>lorem</li>
                                <li>lorem</li>
                            </ul>
                        </div>
                    </div>
                    <div className={st.clients}>
                        <div className={st.clients__title + ' title'}>Kunden</div>
                        <div className={st.clients__list}>
                            <ul>
                                <li>lorem</li>
                                <li>lorem</li>
                                <li>lorem</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    )
}