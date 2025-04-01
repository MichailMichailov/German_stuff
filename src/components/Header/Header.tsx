import { FC } from 'react'
import st from './Header.module.scss'
import logo from '../../assets/img/Uhlig-Logo-Rechteck1.png'
import { Menu } from './Menu/Menu';
import { connect } from 'react-redux'
import { setParagraphThunk } from '../../redux/reducers/uiReducers';
import { logOutThunk } from '../../redux/reducers/authReducer';


interface PropsType {
    numOfParagraph: number
    setParagraphThunk: (num: number) => void,
    logOutThunk: ()=>void
}

export const Header: FC<PropsType> = (props) => {
    return (
        <div className={st.Header}>
            <div className="container">
                <div className={st.Header__content}>
                    <div className={st.Header__content_left}>
                        <div className={st.logo}>
                            <div className={st.logo__image}>
                                <img src={logo} alt="" />
                            </div>
                        </div>
                        <Menu numMenu={props.numOfParagraph} setPar={props.setParagraphThunk} />
                    </div>

                    <div className={st.Header__content_right}>
                        <div className={st.btnLogaut}>
                            <div className="" onClick={() => { props.logOutThunk() }}>Abmeldung</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    numOfParagraph: state.ui.menuParagrph
})

export const RealHeader = connect(mapStateToProps, { logOutThunk, setParagraphThunk })(Header)