    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { FaBars, FaTimes } from 'react-icons/fa';
    import logo from '../assets/img/logo.svg';
import './NewHome1.css'
    const NewNav = () => {
        const [click, setClick] = useState(false);
        const navigate = useNavigate();
        const handleClick = () => setClick(!click);
        const Close = () => setClick(false);

        return (
            <div className="bg-gray-900 text-white">
                <nav className="container mx-auto flex items-center justify-between px-4 py-3">
                    <div className="flex items-center" onClick={() => navigate('/')}>
                        <img src={logo} alt="Logo" className="h-16 mr-2" />
                    </div>
                    <div className="block lg:hidden">
                        <button onClick={handleClick} className="text-white focus:outline-none">
                            {click ? <FaTimes size={28} /> : <FaBars size={28} />}
                        </button>
                    </div>
                    <ul className={`lg:flex lg:items-center lg:space-x-6 absolute lg:static left-0 w-full lg:w-auto bg-gray-900 lg:bg-transparent transition-transform transform ${click ? 'translate-x-0' : '-translate-x-full'} lg:transform-none`}>
                        <li className="nav-item">
                            <div
                                onClick={() => { navigate('/'); Close(); }}
                                className="nav-links block px-4 py-2 hover:custom-text-color cursor-pointer"
                            >
                                Home
                            </div>
                        </li>
                        <li className="nav-item">
                        <a
    href="#about"
    className="nav-links block px-4 py-2"
    onClick={Close}
    style={{ textDecoration: 'none', color: 'white' }}
>
    <span className="hover:custom-text-color">About</span>
</a>




                        </li>
                        <li className="nav-item">
                            <div
                                onClick={() => { navigate('/write-to-us'); Close(); }}
                                className="nav-links block px-4 py-2 hover:custom-text-color cursor-pointer"
                            >
                                Partnerships
                            </div>
                        </li>
                        <li className="nav-item">
                            <div
                                onClick={() => { navigate('/join-waiting-list'); Close(); }}
                                className="nav-links block px-4 py-2 hover:custom-text-color cursor-pointer"
                            >
                                Sign-In
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }

    export default NewNav;
