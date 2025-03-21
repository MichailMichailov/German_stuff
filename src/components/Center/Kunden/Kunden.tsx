import { FC } from 'react'
import st from './Kunden.module.scss'
import trash from '../../../assets/img/trsh.png'


interface PropsType {
}

export const Kunden: FC<PropsType> = (props) => {
    return (
        <div className={st.Kunden}>
            <div className={st.Kunden__content + ' container'}>
                <div className={st.Kunden__content_left}>
                    <div className={st.employees + ' list'}>
                        <div className='list__title'>Kunden</div>
                            <ul>
                                <li>lorem</li>
                                <li>lorem</li>
                                <li className='list__choose'>lorem</li>
                                <li>lorem</li>
                                <li>lorem</li>
                            </ul>
                    </div>
                </div>
                <div className={st.Kunden__content_right}>
                    <div className={st.btns}>
                        <div className={st.btns__item + ' btn'}>Exportieren</div>
                        <div className={st.btns__item + ' btn'}>Drucken</div>
                    </div>
                    <div className={st.table}>
                        <div className={st.table__title + ' title'}>VenomTech Solutions</div>
                        <div className="table__table">
                            <table>
                                <colgroup>
                                    <col/>
                                    <col/>
                                    <col/>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>Tatigkeit</th> <th>Intervall in Tage</th> <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Lorem ipsum dolor sit amet consectetur adipisicing.</td> 
                                        <td>14</td> <td><div className={st.img}><img src={trash} alt=""/></div></td>
                                    </tr>
                                    <tr>
                                        <td>Lorem ipsum dolor sit amet consectetur adipisicing.</td> 
                                        <td>14</td> <td><div className={st.img}><img src={trash} alt=""/></div></td>
                                    </tr>
                                    <tr>
                                        <td>Lorem ipsum dolor sit amet consectetur adipisicing.</td> 
                                        <td>14</td> <td><div className={st.img}><img src={trash} alt=""/></div></td>
                                    </tr>
                                    <tr>
                                        <td>Lorem ipsum dolor sit amet consectetur adipisicing.</td> 
                                        <td>14</td> <td><div className={st.img}><img src={trash} alt=""/></div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={st.table__btnAdd}>
                            <div className={st.table__btnAdd_btn}>+</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}