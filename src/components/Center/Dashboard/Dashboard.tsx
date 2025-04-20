import { FC, useEffect, useState } from 'react'
import st from './Dashboard.module.scss'
import { connect } from "react-redux";
import { getDashboardByDataThunk } from '../../../redux/reducers/adminReducer';
import { generatePrintableHtml, printData, transformDataToDashboard } from '../../common/functions';
import { loadToExel } from '../../common/excel'; 
import { getDate } from '../../../redux/reducers/uiReducers';

interface PropsType {
    dashboard:  {
        id: number; name: string; company: string; service: string;
        date: string;status: string;
        materials: string[]; notes: string; createdAt: string;
    }[]
    token:string,
    getDashboardByDataThunk: (token:string,dataFrom:string, dataTo:string)=>void,
    getDate:(token:string)=>void,
    date:string
}

export const Dashboard: FC<PropsType> = (props) => {
    // const [currentPage, setCurrentPage] = useState(1);
    // const totalPages = Math.ceil(50);
    // const handlePageChange = (page: number) => {
    //     if (page > 0 && page <= totalPages) {
    //       setCurrentPage(page);
    //     }
    //   };
    // const displayedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const [currentData, setCurrentData] = useState('10.01.2025 - 22.04.2025');
    useEffect(() => {
        const fetchPlan = async () => {
            const [startDate, endDate] = currentData.split(' - ');
            await props.getDashboardByDataThunk(props.token, startDate, endDate)
            await props.getDate(props.token)
        }
        fetchPlan();
    }, [currentData]);
    const eportExel = ()=>{ 
        const {weeks, data} = transformDataToDashboard(props.dashboard, props.date) 
        loadToExel(data, weeks)
    }
    const printNow = () =>{
        const {weeks, data} = transformDataToDashboard(props.dashboard, props.date) 
        printData(generatePrintableHtml(data, weeks))
    }
    return (
        <div className={st.Dashboard}>
            <div className="container">
                <div className={st.Dashboard__data}>
                    <input type="text" value={currentData} onChange={e=>{setCurrentData(e.target.value)}}/>
                </div>
                <div className="table__table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Mitarbeiter</th>
                                <th>Kunde</th>
                                <th>Leistung</th>
                                <th>Datum</th>
                                <th>Status</th>
                                <th>Verwendete Materialien</th>
                                <th>Notiz</th>
                                <th>Erstellt am</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.dashboard.map(e=>(
                                <tr>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.company}</td>
                                <td>{e.service}</td>
                                <td>{e.date}</td>
                                <td>{e.status}</td>
                                <td>{e.materials}</td>
                                <td>{e.notes}</td>
                                <td>{e.createdAt}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* <div className={st.pagination}>
                    <div className={st.pagination__body}>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}> ❮ Zurück </button>
                        <span> Seite {currentPage} von {totalPages} </span>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}> Nach vorne ❯</button>
                    </div>
                </div> */}
                <div className={st.btns}>
                    <div className={st.btns__item + ' btn'} onClick={eportExel}>Exportieren</div>
                    <div className={st.btns__item + ' btn'} onClick={printNow}>Drucken</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    dashboard: state.admin.dashboard,
    token: state.auth.token,
    date:state.ui.date,
});

export const RealDashboard = connect(mapStateToProps, { getDashboardByDataThunk, getDate })(Dashboard);
