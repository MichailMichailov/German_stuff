import { FC, useState } from 'react'
import st from './Dashboard.module.scss'


interface PropsType {
}

export const Dashboard: FC<PropsType> = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(50);
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
          setCurrentPage(page);
        }
      };
    
    // const displayedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    return (
        <div className={st.Dashboard}>
            <div className="container">
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
                            <tr>
                                <td>1</td>
                                <td>Alexander Meier</td>
                                <td>VenomTech Solutions</td>
                                <td>Installation</td>
                                <td>2025-03-07</td>
                                <td>Abgeschlossen</td>
                                <td>Kabel, Adapter</td>
                                <td>Alles gut verlaufen</td>
                                <td>2025-03-01</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Benjamin Hoffmann</td>
                                <td>PixelGastro</td>
                                <td>Wartung</td>
                                <td>2025-03-06</td>
                                <td>In Bearbeitung</td>
                                <td>Schrauben, Öl</td>
                                <td>Benötigt weitere Inspektion</td>
                                <td>2025-03-02</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Christian Weber</td>
                                <td>Schäfer Yacht Charter</td>
                                <td>Reparatur</td>
                                <td>2025-03-05</td>
                                <td>Offen</td>
                                <td>Motoröl, Dichtungen</td>
                                <td>Warten auf Ersatzteile</td>
                                <td>2025-03-03</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={st.pagination}>
                    <div className={st.pagination__body}>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}> ❮ Zurück </button>
                        <span> Seite {currentPage} von {totalPages} </span>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}> Nach vorne ❯</button>
                    </div>
                </div>
            </div>
        </div>
    )
}