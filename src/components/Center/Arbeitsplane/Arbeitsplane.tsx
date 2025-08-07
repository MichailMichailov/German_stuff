import { FC, useEffect, useState } from 'react'
import st from './Arbeitsplane.module.scss'
import { connect } from "react-redux";
import { getPlanByDataThunk } from '../../../redux/reducers/adminReducer';
import { generatePrintableHtmlPlans, getCurrentData2, printData, transformDataToPlans } from '../../common/functions';
import { loadExelOld } from '../../common/excel';
interface Plans { name: string; service: { name: string; status: boolean; note:string }[] }

interface PropsType {
    data: [{ id: string; name: string; plans: Plans[] }],
    token: string,
    getPlanByDataThunk: (token: string, data: string) => void
}

export const Arbeitsplane: FC<PropsType> = (props) => {
    const [activeWork, setactiveWork] = useState("");
    const [selectedDate, setSelectedDate] = useState('');
    const [activeData, setActiveData] = useState<any>([]);
    useEffect(() => {
        setSelectedDate(getCurrentData2())
    }, [])
    useEffect(() => {
        setactiveWork('')
        setActiveData('')
        const fetchPlan = async () => { await props.getPlanByDataThunk(props.token, selectedDate) }
        fetchPlan();
    }, [selectedDate]);
    useEffect(() => {
        const filteredPlan = props.data.find(plan => plan.id === activeWork);
        setActiveData(filteredPlan ? filteredPlan.plans : []);
    }, [activeWork]);
    const eportExel = () => { loadExelOld(transformDataToPlans(props.data)) }
    const printNow = () => { printData(generatePrintableHtmlPlans(props.data)) }
    return (
        <div className={st.Arbeitsplane}>
            <div className={st.Arbeitsplane__content + ' container'}>
                <div className={st.Arbeitsplane__content_left}>
                    <div className={st.employees + ' list'}>
                        <div className='list__title'>Mitarbeiter</div>
                        <ul className={st.employees__body}>
                            {props.data.map(e => (
                                <li className={st.item + (activeWork == e.id ? ' list__choose' : '')}
                                    onClick={event => { setactiveWork(e.id) }}>{e.name}</li>))}
                        </ul>
                    </div>
                </div>
                <div className={st.Arbeitsplane__content_right}>
                    <div className={st.Arbeitsplane__content_right_top}>
                        {activeData && activeData.map((e: Plans) => (
                            <div className={'list ' + st.list}>
                                <div className='list__title'>{e.name}</div>
                                <div className={st.list__list}>
                                    <ul>
                                        {e.service.map(i => {
                                            try{
                                                const parsed = JSON.parse(i.note.replace(/'/g, '"'));
                                                return (<li className={st.item + ' ' + (i.status ? st.check : st.cross)}>
                                                    {i.name} <span className={st.byWorker}>(Arbeiter hinzugefügt)</span>
                                                    </li>)
                                            }catch{
                                                return<li className={st.item + ' ' + (i.status ? st.check : st.cross)}>{i.name}</li>
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>))}
                    </div>
                    <div className={st.Arbeitsplane__content_right_bottom}>
                        <div className={st.btns}>
                            <div className={st.btns__item + ' btn'} onClick={eportExel}>Exportieren</div>
                            <div className={st.btns__item + ' btn'} onClick={printNow}>Drucken</div>
                        </div>
                        <div className={st.data}>
                            <div className={st.data__container}>
                                <div className={st.data__container_text}>Datum wählen:</div>
                                <div className={st.data__container_select}>
                                    <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    data: state.admin.plan,
    token: state.auth.token
});

export const RealArbeitsplane = connect(mapStateToProps, { getPlanByDataThunk })(Arbeitsplane);
