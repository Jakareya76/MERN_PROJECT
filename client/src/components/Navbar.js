import React,{useState , useContext} from 'react';
import {Link} from 'react-router-dom';
import Logo from "./assets/logo.png";
import {userContext} from '../App';

function Navbar() {
    const {state , dispatch} = useContext(userContext);

    const RenderMenu = () =>{
       if(state){
           return(
               <>
                <li className='nav-item'>
                    <Link 
                    className='nav-link' 
                    onClick={closeMobileMenu} 
                    to='/'>
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link 
                    className='nav-link' 
                    onClick={closeMobileMenu} 
                    to='/about'>
                        About
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link 
                    className='nav-link' 
                    onClick={closeMobileMenu} 
                    to='/contact'>
                        Contact
                    </Link>
                </li>
               
                <li className='nav-item'>
                    <Link 
                    className='nav-link' 
                    onClick={closeMobileMenu} 
                    to='/logout'>
                        Logout
                    </Link>
                </li>
               </>
           )
       }else{
           return(
               <>
                <li className='nav-item'>
                    <Link 
                    className='nav-link' 
                    onClick={closeMobileMenu} 
                    to='/'>
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link 
                    className='nav-link' 
                    onClick={closeMobileMenu} 
                    to='/about'>
                        About
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link 
                    className='nav-link' 
                    onClick={closeMobileMenu} 
                    to='/contact'>
                        Contact
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link 
                    className='nav-link' 
                    onClick={closeMobileMenu} 
                    to='/login'>
                        Login
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link 
                    className='nav-link' 
                    onClick={closeMobileMenu} 
                    to='/singup'>
                        Sing Up
                    </Link>
                </li>
               </>
           )
       }
    }

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click)

    const closeMobileMenu = () =>setClick(false)

    return (
        <>
           <nav className="navbar">
               <div className='brand_logo'>
                <img src={Logo} alt="LOGO"/>
               </div>
               <ul className={click ? "mobile-nav-active" : "nav-menu"}>
                    <RenderMenu />
               </ul>
               <div onClick={handleClick} className="mobileMenu">
                    <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
               </div>
           </nav>
        </>
    )
}

export default Navbar;
