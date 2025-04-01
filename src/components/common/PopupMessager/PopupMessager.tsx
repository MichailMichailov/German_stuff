import { FC, useEffect, useState } from "react";
import st from "./PopupMessager.module.scss";

interface PropsType {
  message: string;
  cleanError:()=>void;
  type:number
}

export const PopupMessager: FC<PropsType> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");

  useEffect(() => {
    if (props.message!='') {
      setDisplayMessage(props.message); // Обновляем сообщение
      setIsVisible(true);
      props.cleanError()
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

    //   return () => clearTimeout(timer);
    }
  }, [props.message]); // Следим за сигналом и сообщением

  return (
    <div className={`${st.popup} ${isVisible ? st.show : ""} ${props.type==1?st.sucsesful:''}`}>
      {displayMessage}
    </div>
  );
};
