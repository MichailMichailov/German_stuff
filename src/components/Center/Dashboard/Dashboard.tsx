import { FC, useEffect, useState } from 'react'
import st from './Dashboard.module.scss'
import { connect } from "react-redux";
import { getDashboardByDataThunk } from '../../../redux/reducers/adminReducer';

interface PropsType {
    dashboard:  {
        id: number; name: string; company: string; service: string;
        date: string;status: string;
        materials: string[]; notes: string; createdAt: string;
    }[]
    getDashboardByDataThunk: (dataFrom:string, dataTo:string)=>void
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
    const [currentData, setCurrentData] = useState('10.01.2025 - 12.02.2025');
    useEffect(() => {

        const fetchPlan = async () => {
            const [startDate, endDate] = currentData.split(' - ');
            await props.getDashboardByDataThunk(startDate, endDate)
        }
        fetchPlan();
    }, [currentData, props]);
    
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
                                <td>{e.materials.join(', ')}</td>
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
                    <div className={st.btns__item + ' btn'}>Exportieren</div>
                    <div className={st.btns__item + ' btn'}>Drucken</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    dashboard: state.admin.dashboard
});

export const RealDashboard = connect(mapStateToProps, { getDashboardByDataThunk })(Dashboard);
