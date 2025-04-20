import { Link } from 'react-router-dom';
import { FC, useEffect, useState  } from 'react'
import st from './Menu.module.scss'


interface PropsType {
    numMenu:number
    setPar:(num:number)=>void
}

export const Menu: FC<PropsType> = (props) => {
    const [activeItem, setActiveItem] = useState(0)
    useEffect(() => {
      const currentUrl = window.location.href
      if (currentUrl.includes('dashboard')) { setActiveItem(0) }
      else if (currentUrl.includes('arbeitsplane')) { setActiveItem(1) }
      else if (currentUrl.includes('kunden')) { setActiveItem(2) }
      else if (currentUrl.includes('leistungen')) { setActiveItem(3) }
      else if (currentUrl.includes('mitarbeiter')) { setActiveItem(4) }
      else if (currentUrl.includes('material')) { setActiveItem(5) }
      else if (currentUrl.includes('settings')) { setActiveItem(6) }
      else { setActiveItem(0) }
      props.setPar(activeItem)
    }, [activeItem]);
    return (
        <nav className={st.menu}>
            <ul className={st.menu__items}>
                <li className={st.menu__items_item + ' ' + (props.numMenu == 0 && st.active)}>
                    <Link to="/dashboard"  onClick={() => { setActiveItem(0) }}>Dashboard</Link>
                </li>
                <li className={st.menu__items_item + ' ' + (props.numMenu == 1 && st.active)}>
                    <Link to="/arbeitsplane"  onClick={() => { setActiveItem(1) }}>Arbeitspläne</Link>
                </li>
                <li className={st.menu__items_item + ' ' + (props.numMenu == 2 && st.active)}>
                    <Link to="/kunden"  onClick={() => { setActiveItem(2) }}>Kunden</Link>
                </li>

                <li className={st.menu__items_item + ' ' + (props.numMenu == 3 && st.active)}>
                    <Link to="/leistungen" onClick={() => { setActiveItem(3) }}>Leistungen</Link>
                </li>
                <li className={st.menu__items_item + ' ' + (props.numMenu == 4 && st.active)}>
                    <Link to="/mitarbeiter" onClick={() => { setActiveItem(4) }}>Mitarbeiter</Link>
                </li>
                <li className={st.menu__items_item + ' ' + (props.numMenu == 5 && st.active)}>
                    <Link to="/material" onClick={() => { setActiveItem(5) }}>Material</Link>
                </li>
                <li className={st.menu__items_item + ' ' + (props.numMenu == 6 && st.active)}>
                    <Link to="/settings" onClick={() => { setActiveItem(6) }}>Einstellungen</Link>
                </li>
            </ul>
        </nav>
    )
}