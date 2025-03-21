import { FC } from 'react'
import st from './Arbeitsplane.module.scss'


interface PropsType {
}

export const Arbeitsplane: FC<PropsType> = (props) => {
    return (
        <div className={st.Arbeitsplane}>
            <div className={st.Arbeitsplane__content + ' container'}>
                <div className={st.Arbeitsplane__content_left}>
                    <div className={st.employees + ' list'}>
                        <div className='list__title'>Mitarbeiter</div>
                            <ul className={st.employees__body}>
                                <li className={st.item}>lorem</li>
                                <li className={st.item}>lorem</li>
                                <li className={st.item + ' list__choose'}>lorem</li>
                                <li className={st.item}>lorem</li>
                                <li className={st.item}>lorem</li>
                            </ul>
                    </div>
                </div>
                <div className={st.Arbeitsplane__content_right}>
                    <div className={st.Arbeitsplane__content_right_top}>
                        <div className={'list ' +st.list}>
                            <div className='list__title'>VenomTech Solution</div>
                            <div className={st.list__list}>
                                <ul>
                                    <li className={st.item + ' ' + st.check}>Lorem ipsum dolor sit amet.</li>
                                    <li className={st.item + ' ' + st.check}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur, neque.</li>
                                    <li className={st.item + ' ' + st.cross}>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={st.Arbeitsplane__content_right_bottom}>
                        <div className={st.btns}>
                            <div className={st.btns__item + ' btn'}>Exportieren</div>
                            <div className={st.btns__item + ' btn'}>Drucken</div>
                        </div>
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
                </div>
            </div>
        </div>
    )
}