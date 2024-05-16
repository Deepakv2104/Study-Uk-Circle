import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons from react-icons/fa
import './NewNav.css';
import logo from '../assets/img/logo.svg';

const NewNav = () => {
    const [click, setClick] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook
    const handleClick = () => setClick(!click);
    const Close = () => setClick(false);

    return (
        <div>
            <div className="main-container" onClick={() => Close()} />
            <nav className="navbar" onClick={e => e.stopPropagation()}>
                <div className="nav-container">
                    <div className="nav-logo" onClick={() => navigate('/')}>
                        <img src={logo} alt="Logo" style={{ height: '60px', display: 'flex', alignItems: 'center',margin:'5px'}}/>
                    </div>
                    <ul className={click ? "navMenu active" : "navMenu"}>
                        <li className="nav-item">
                            <div
                                onClick={() => navigate('/')}
                                className="nav-links"
                            >
                                Home
                            </div>
                        </li>
                        <li className="nav-item">
                            <div
                                // onClick={() => { navigate('/'); handleClick(); }}
                                className="nav-links"
                            >
                                About
                            </div>
                        </li>
                        <li className="nav-item">
                            <div
                                onClick={() => { navigate('/write-to-us'); handleClick(); }}
                                className="nav-links"
                            >
                                Partnerships
                            </div>
                        </li>
                        <li className="nav-item">
                            <div
                                onClick={() => { navigate('/join-waiting-list'); handleClick(); }}
                                className="nav-links"
                            >
                                Sign-In
                            </div>
                        </li>
                    </ul>
                    <div className="navIcon" onClick={handleClick}>
                        {click ? <FaTimes /> : <FaBars />} {/* Use FaBars and FaTimes directly */}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NewNav;
