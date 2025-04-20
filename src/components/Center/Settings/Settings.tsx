import { FC, useEffect, useState } from 'react'
import st from './Settings.module.scss'
import { connect } from "react-redux";
import { getDate, setSettings } from '../../../redux/reducers/uiReducers';

interface PropsType {
    setSettings: (token:string, date: string) => void,
    getDate: (token:string) => void,
    date: string,
    token:string
}

export const Settings: FC<PropsType> = (props) => {
    const [startDate, setStartDate] = useState(props.date);
    const handleDateChange = async(value:string) => {
        setStartDate(value);
        await props.setSettings(props.token, value)
    };
    useEffect(()=>{
        props.getDate(props.token)
    }, [])
    return (
        <div className={st.Settings}>
            <div className={st.Arbeitsplane__content + ' container'}>
                <h1 className={st.Settings__title}>Einstellungen</h1>

                <div className={st.Block}>
                    <h2 className={st.Block__title}>Kalenderwochen-Einstellungen</h2>
                    <p className={st.Block__description}>
                        Wählen Sie ein Datum, um den ersten Tag für die Berechnung der Kalenderwochen (KW) festzulegen.
                    </p>

                    <label htmlFor="firstDay" className={st.Label}>
                        Erster Tag der Arbeitswoche
                    </label>
                    <input type="date" value={startDate} onChange={e=>handleDateChange(e.target.value)}className={st.Input} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    date: state.ui.date,
    token: state.auth.token
});

export const RealSettings = connect(mapStateToProps, { setSettings, getDate })(Settings);
