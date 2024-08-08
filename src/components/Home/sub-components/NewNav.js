import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import finalLogo from '../../../assets/img/log.png';
import '../styles/NewNav.css'; // New CSS file for navbar styles

const NewNav = () => {
    const [click, setClick] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <nav className="navbar bg-gray-900 px-2">
            <div className="navbar-container container mx-auto px-1 pb-4">
                <div className="navbar-logo pb-4 lg:-ml-20 " onClick={() => navigate('/')}>
                    <img src={finalLogo} alt="Logo" className="h-9 md:h-12 " />
                </div>

                <div className="menu-icon" onClick={handleClick}>
                    {click ? <FaTimes size={28} /> : <FaBars size={28} />}
                </div>

                <ul className={click ? 'nav-menu active' : 'nav-menu'} >
                    <li className="nav-item">
                        <div
                            onClick={() => { navigate('/'); closeMobileMenu(); }}
                            className="nav-link"
                        >
                            Home
                        </div>
                    </li>


                    <li className="nav-item">

                        <div
                            onClick={() => { navigate('/about-us'); closeMobileMenu(); }}
                            className="nav-link"
                        >
                            About
                        </div>
                    </li>
                    <li className="nav-item">
                        <div
                            onClick={() => { navigate('/mentorship'); closeMobileMenu(); }}
                            className="nav-link"
                        >
                            Mentorship
                        </div>
                    </li>
                    <li className="nav-item">
                        <div
                            onClick={() => { navigate('/write-to-us'); closeMobileMenu(); }}
                            className="nav-link"
                        >
                            Partnerships
                        </div>
                    </li>
                    <li className="nav-item">
                        <div
                            onClick={() => { navigate('/ambassador'); closeMobileMenu(); }}
                            className="nav-link"
                        >
                            Ambassador
                        </div>
                    </li>

                    <li className="nav-item">
                        <div
                            onClick={() => { navigate('/join-waiting-list'); closeMobileMenu(); }}
                            className="nav-link"
                        >
                            Sign-In
                        </div>
                    </li>


                </ul>
            </div>
        </nav>
    );
}

export default NewNav;
