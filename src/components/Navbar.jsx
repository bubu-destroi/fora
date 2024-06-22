import { NavLink } from "react-router-dom"
//import { ThemeContext } from "../context/Theme.context"
//import { useContext } from "react"
import foraLogo from '../assets/FORA LOGO.png'
import userIcon from '../assets/perfil logo.png'

const Navbar = () => {

    //const { theme , toggleTheme} = useContext(ThemeContext)

    return (
        <nav className={`Navbar`}>
            <ul>
            <img src={foraLogo} alt="" className="logoheader" />
            <img src={userIcon} alt="" className="userIconHeader" />

                <NavLink className={({isActive}) => (isActive ? 'selected' : '' )} to='/' >Home</NavLink>
                <NavLink className={({isActive}) => (isActive ? 'selected' : '' )} to='/about' >About</NavLink>
                <NavLink className={({isActive}) => (isActive ? 'selected' : '' )} to='/projects' >Projects</NavLink>
            </ul>
           {/* <button onClick={toggleTheme} >{theme === 'light' ? 'dark' : 'light'}</button> */}
        </nav>
    )
}

export default Navbar