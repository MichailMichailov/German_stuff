import { FC, useEffect, useState } from "react";
import st from "./Preload.module.scss";

export const Preload: FC = () => {
    const [dots, setDots] = useState(".");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : "."));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={st.preloader}>
            Lädt{dots}
        </div>
    );
};
