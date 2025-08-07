import { FC, useEffect, useState } from "react";
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import st from "./WorkerCenter.module.scss";
import logo from "../../assets/img/Uhlig-Logo-Rechteck1.png";
import { logOutThunk } from "../../redux/reducers/authReducer";
import { getCurrentData } from "../common/functions";
import { setWorkerByIdThunk, updateWorkerThunk } from "../../redux/reducers/workerReducer";
import { Preload } from "../common/preload/preload";
import { PopupMessager } from "../common/PopupMessager/PopupMessager";
import { RealWorkerForm } from "./workerForm/workerForm";

interface PropsTypeList {
    selectedId: number;
    listOfSome: { Name: string; Status: boolean }[];
    title: string;
    onUpdate: (newList: { Name: string; Status: boolean }[]) => void;
}

const ListForWorker: FC<PropsTypeList> = ({ selectedId, listOfSome, title, onUpdate }) => {
    const [instruments, setInstruments] = useState(listOfSome);
    useEffect(() => { setInstruments(listOfSome); }, [selectedId, listOfSome]);
    const handleCheckboxChange = (index: number) => {
        const newList = instruments.map((item, i) => i === index ? { ...item, Status: !item.Status } : item);
        setInstruments(newList);
        onUpdate(newList);
    };

    return (
        <div className={st.list}>
            <div className={st.list__title}>{title}</div>
            <div className={st.list__body}>
                <ul>
                    {instruments.map((w, i) => (
                        <li key={w.Name}>
                            <label>
                                <input type="checkbox" checked={w.Status} onChange={() => handleCheckboxChange(i)} /> {w.Name}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

interface PropsTypeAdmin {
    logOutThunk: () => void;
    setWorkerByIdThunk: (token: string, id: string) => void;
    updateWorkerThunk: (token: string, id: string, data: any) => void;
    data: {
        id: number; Name: string; Note: string;
        listOfInstrument: { id: number, Name: string; Status: boolean }[];
        ListOfWork: { id: number, Name: string; Status: boolean }[];
    }[];
    login: string,
    id: string,
    token: string
}

export const WorkerCenter: FC<PropsTypeAdmin> = (props) => {
    const [selectedId, setSelectedId] = useState<number>(0);
    const [note, setNote] = useState<string>('');
    const [listOfWork, setListOfWork] = useState<any>([]);
    const [listOfInstrument, setListOfInstrument] = useState<any>([]);
    const formattedDate = getCurrentData();
    const [message, setMessage] = useState('')
    const cleanMessage = () => { setMessage('') }
    useEffect(() => {
        const aFunc = async () => { await props.setWorkerByIdThunk(props.token, props.id) }
        aFunc()
    }, []);
    useEffect(() => {
        const result = props.data.find(k => k.id === selectedId);
        if (result) {
            try {
                const parsed = JSON.parse(result.Note.replace(/'/g, '"'));
                setNote(parsed.note ? parsed.note : '');
            } catch {setNote(result.Note ? result.Note : ''); }
            
            setListOfWork(result.ListOfWork ? result.ListOfWork : []);
            setListOfInstrument(result.listOfInstrument ? result.listOfInstrument : []);
        } else {
            setNote('');
            setListOfWork([]);
            setListOfInstrument([]);
        }
    }, [selectedId])
    const updateListOfWork = (newList: { Name: string; Status: boolean }[]) => setListOfWork(newList);
    const updateListOfInstrument = (newList: { Name: string; Status: boolean }[]) => setListOfInstrument(newList);
    const handleSave = async () => {
        const finalData = {
            selectedId: selectedId,
            note, listOfWork, listOfInstrument,
        };
        await props.updateWorkerThunk(props.token, props.id, finalData)
        setMessage('Daten wurden erfolgreich gespeichert')
    };

    return (
        <div className={st.workerCenter}>
            <PopupMessager message={message} cleanError={cleanMessage} type={1} />
            <header className={st.wHeader}>
                <div className={st.wHeader__img}> <img src={logo} alt="Logo" /> </div>
                <div className={st.wHeader__logOut} onClick={props.logOutThunk}> Abmeldung </div>
            </header>
            <main className={st.wMain}>
                <div className="container">
                    <h3 className={st.wMain__title}>Hallo {props.login}</h3>
                    <div className={st.chose}>
                        <div className={st.chose__container}>
                            <div className={st.chose__container_text}>Kunde wählen:</div>
                            <div className={st.chose__container_select}>
                                <select value={selectedId} onChange={(e) => setSelectedId(parseInt(e.target.value))}>
                                    <option key={-1} value={-1}> Niemand </option>
                                    {props.data.map((c, i) => (
                                        <option key={c.id} value={c.id}> {c.Name} </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={st.wMain__info}>
                        <div className={st.wMain__info_date}>Heutiges Datum: {formattedDate}</div>
                        <div className={st.wMain__info_lists}>
                            <ListForWorker listOfSome={listOfWork} selectedId={selectedId}
                                title="Tätigkeiten" onUpdate={updateListOfWork} />
                            <ListForWorker listOfSome={listOfInstrument} selectedId={selectedId}
                                title="Genutzte Geräte" onUpdate={updateListOfInstrument} />
                        </div>
                        <div className={st.wMain__info_noties}>
                            <div className={st.noties}>
                                <h3 className={st.noties__title}>Notizen</h3>
                                <div className={st.noties__text}> <textarea value={note} onChange={(e) => setNote(e.target.value)}></textarea> </div>
                                <div className={st.noties__btn}>
                                    <div className="btn" onClick={handleSave}> Speichern </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div className={st.add_plan}>
                <Link to="/workerForm">+</Link>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    login: state.auth.user.login,
    data: state.worker.data,
    id: state.auth.userId,
    token: state.auth.token
});

export const RealWorkerCenter = connect(mapStateToProps, { logOutThunk, updateWorkerThunk, setWorkerByIdThunk })(WorkerCenter);


export const WorkerCenterRouter = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<RealWorkerCenter />} />
                <Route path='/workerForm' element={<RealWorkerForm />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    )
}