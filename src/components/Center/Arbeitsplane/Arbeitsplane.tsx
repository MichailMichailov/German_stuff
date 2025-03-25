import { FC, useEffect, useState } from 'react'
import st from './Arbeitsplane.module.scss'
import { connect } from "react-redux";
import { getPlanByDataThunk } from '../../../redux/reducers/adminReducer';
import { data } from 'react-router-dom';

interface Plans { name: string; service: { name: string; status: boolean }[] }

interface PropsType {
    data:[{
        id: string;
        name: string;
        plans:Plans[]
    }],
    getPlanByDataThunk: (data:string)=>void
}

export const Arbeitsplane: FC<PropsType> = (props) => {
    const [activeWork, setactiveWork] = useState("");
    const [selectedDate, setSelectedDate] = useState("heute");
    const [activeData, setActiveData] = useState<any>([]);
    useEffect(() => {
        const fetchPlan = async () => { await props.getPlanByDataThunk(selectedDate)}
        fetchPlan();
    }, [selectedDate, props]);
    useEffect(() => {
        const filteredPlan = props.data.find(plan => plan.id === activeWork);
        setActiveData(filteredPlan ? filteredPlan.plans : []);
    }, [activeWork]);
    const eportExel = ()=>{ alert('exel')}
    const printNow = () =>{alert('print')}
    return (
        <div className={st.Arbeitsplane}>
            <div className={st.Arbeitsplane__content + ' container'}>
                <div className={st.Arbeitsplane__content_left}>
                    <div className={st.employees + ' list'}>
                        <div className='list__title'>Mitarbeiter</div>
                        <ul className={st.employees__body}>
                            {props.data.map(e=>(
                                <li className={st.item + (activeWork == e.id?' list__choose':'')}
                                    onClick={event=>{setactiveWork(e.id)}}>{e.name}</li>))}
                        </ul>
                    </div>
                </div>
                <div className={st.Arbeitsplane__content_right}>
                    <div className={st.Arbeitsplane__content_right_top}>
                        {activeData.map((e: Plans) => (
                            <div className={'list ' + st.list}>
                                <div className='list__title'>{e.name}</div>
                                <div className={st.list__list}>
                                    <ul>
                                        {e.service.map(i => (
                                            <li className={st.item + ' ' + (i.status ? st.check : st.cross)}>{i.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div> ))}
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
                                    <input type="date" value={selectedDate} onChange={e=>setSelectedDate(e.target.value)}/>
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
    data: state.admin.plan
});

export const RealArbeitsplane = connect(mapStateToProps, { getPlanByDataThunk })(Arbeitsplane);
