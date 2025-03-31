import { FC, use, useEffect, useRef, useState } from "react";
import st from './StatusMessage.module.scss'


interface PropsType {
    dependencies:any,
    activId:string,
    signal:boolean,
    type:boolean
}

export const StatusMessage: FC<PropsType> = (props) => {
    console.log(props)
    const [isVisible, setIsVisible] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const isAutoUpdate = useRef(true);
    useEffect(() => {
        if ((!isAutoUpdate.current) && (props.activId!='')) {
            setIsSaved(true);
            setIsVisible(true);
        }
    }, props.dependencies);
    useEffect(() => {
        setIsSaved(false);
        setTimeout(()=>{ setIsVisible(false)}, 1000)
    }, [props.signal])

    useEffect(() => {
        isAutoUpdate.current = true;
        setIsSaved(false);
        setIsVisible(false)
        setTimeout(() => { isAutoUpdate.current = false;}, 0);
    }, [props.activId]);

    return (
        <div className={st.panel +' '+(props.type?st.table__panel:'')+' '+ (isSaved ? st.panelChange : '')} 
             style={{ opacity: isVisible ? "1" : "0"}}>
            Daten {isSaved ? 'nicht ' : ''}gespeichert
        </div>
    );
};