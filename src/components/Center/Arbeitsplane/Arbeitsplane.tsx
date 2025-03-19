import { FC } from 'react'
import st from './Arbeitsplane.module.scss'


interface PropsType {
}

export const Arbeitsplane: FC<PropsType> = (props) => {
    return (
        <div className={st.Arbeitsplane}>
            <div className={st.Arbeitsplane__content + ' container'}>
                <div className={st.Arbeitsplane__content_left}>
                    <div className={st.employees}>
                        <div className={st.employees__title + ' title'}>Mitarbeiter</div>
                        <div className={st.employees__list}>
                            <ul>
                                <li>lorem</li>
                                <li>lorem</li>
                                <li className={st.choose}>lorem</li>
                                <li>lorem</li>
                                <li>lorem</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={st.Arbeitsplane__content_right}>
                    <div className={st.Arbeitsplane__content_right_top}>
                        <div className={st.list}>
                            <div className={st.list__title + ' title'}>VenomTech Solution</div>
                            <div className={st.list__list}>
                                <ul>
                                    <li className={st.check}>Lorem ipsum dolor sit amet.</li>
                                    <li className={st.check}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur, neque.</li>
                                    <li className={st.cross}>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={st.Arbeitsplane__content_right_bottom}>
                        <div className={st.btns}>
                            <div className={st.btns__item + ' btn'}>Exportieren</div>
                            <div className={st.btns__item + ' btn'}>Drucken</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}