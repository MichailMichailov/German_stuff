import { FC } from 'react'
import st from './Footer.module.scss'


interface PropsType{
}

export const Footer: FC<PropsType> = (props) =>{
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`
    return (
        <div className={st.Footer}>
            <div className="container">
                <div className={st.Footer__content}>
                    <div className={st.Footer__content_date}>Heutiges Datum: {formattedDate}</div>
                </div>
            </div>
        </div>
    )
}