import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import st from "./workerForm.module.scss";
import { Link, useNavigate  } from "react-router-dom";
import {getListOfClientsThunk, getListOfWorksThunk, sendWorkerPlanThunk } from "../../../redux/reducers/workerReducer";

interface propsType {
  getListOfClientsThunk: (token: string) => void;
  getListOfWorksThunk: (token: string) => void;
  sendWorkerPlanThunk:(token:string, id:string, data:any) => void;
  token: string,
  id:string
}

export const WorkerForm: FC<propsType> = (props) => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<any>([])
  const [works, setWorks] = useState<any>([])
  const [formData, setFormData] = useState<{ client: string, work: string, time: string, note: string }>
    ({ client: '', work: '', time: '', note: '' })

  useEffect(() => {
    const func = async () => {
      setClients(await props.getListOfClientsThunk(props.token))
      setWorks(await props.getListOfWorksThunk(props.token))
    }
    func()
  }, [])
  useEffect(()=>{
    setFormData({
        client: clients.length > 0 ? clients[0].id : '',
        work: works.length > 0 ? works[0].id : '',
        time: '', note: '',
      });
  },[clients, works])
  const changeFormData = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, }));
  }
  const handleSaveAndWriteAgain = async () => {
    await props.sendWorkerPlanThunk(props.token, props.id, formData)
    setFormData({
        client: clients.length > 0 ? clients[0].id : '',
        work: works.length > 0 ? works[0].id : '',
        time: '', note: '',
      });
  }
  const handleSave = async () => {
    await props.sendWorkerPlanThunk(props.token, props.id, formData)
    navigate("/");
  }
  return (
    <div>
      <div className={st.back}>
        <Link to="/">←</Link>
      </div>
      <form className="adminForm">
        <h2>Formular</h2>
        <fieldset>
          <div className=""><label htmlFor="client">Bei wem gemacht</label></div>
          <div className="">
            <select name="client" id="" value={formData.client} onChange={changeFormData}>
              {clients && clients.map((e: any) => (
                <option value={e.id} key={e.id}>{e.name}</option>))}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className=""><label htmlFor="work">Was gemacht</label></div>
          <div className="">
            <select name="work" id="" value={formData.work} onChange={changeFormData}>
              {works && works.map((e: any) => (
                <option value={e.id} key={e.id}>{e.name}</option>))}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className=""><label htmlFor="time">Wie lange in Minuten</label></div>
          <div className="">
            <input type="number" id="time" name="time" required value={formData.time} onChange={changeFormData}/>
          </div>
        </fieldset>
        <fieldset>
          <div className=""><label htmlFor="note" >Notiz</label></div>
          <div className="">
            <textarea name="note" id="note" value={formData.note} onChange={changeFormData}/>
          </div>
        </fieldset>
        <div className='btns'>
          <button className='btn' type="button" onClick={handleSaveAndWriteAgain}>Hinzufügen</button>
          <button className='btn btnRed' type="button" onClick={handleSave}>Formular hinzufügen und verlassen</button>
        </div>
      </form>
    </div>
  )
}


const mapStateToProps = (state: any) => ({
  token: state.auth.token,
  id: state.auth.userId,
});

export const RealWorkerForm = connect(mapStateToProps, { getListOfClientsThunk, getListOfWorksThunk, sendWorkerPlanThunk })(WorkerForm);



