import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaCog, FaHeart, FaSignOutAlt, FaUtensils,FaCalendarAlt, FaBriefcase } from 'react-icons/fa';
import { Avatar } from '@mui/material';
import university from '../../../../assets/img/university.png';
import accommodation from '../../../../assets/img/accommodation.png';
import event from '../../../../assets/img/event.png';
import { useAuth } from '../../../../auth/userProvider/AuthProvider';

const Menu = ({ user }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const { logout } = useAuth();
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const navItems = document.querySelectorAll('.nav-item1');

        navItems.forEach((navItem1) => {
            navItem1.addEventListener('click', () => {
                navItems.forEach((item) => {
                    item.classList.remove('active');
                });
                navItem1.classList.add('active');

                const option = navItem1.querySelector('.nav-text').textContent.toLowerCase();

                if (option !== 'logout') {
                    if (option === 'settings') {
                        navigate(`/user-dashboard/${option}/${user?.userId}`);
                    } else {
                        navigate(`/user-dashboard/${option}`);
                    }
                } else {
                    logout();
                    navigate('/');
                }
            });
        });
    }, [navigate, logout, user]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className='z-50 top-1'>
            <FaBars className="mobile-toggle bg-slate-700" onClick={toggleMenu} />

            <div ref={menuRef} className={`main-menu fixed top-0 left-0 ${menuOpen ? 'open' : ''}`}>
                <div>
                    <div className="user-info">
                        <Avatar sx={{ width: 50, height: 50, margin: 2 }} />
                        <p>{user?.name || user?.firstName || 'Guest'}</p>
                    </div>
                    <ul>
                        <li className="nav-item1">
                            <div>
                                <img src={event} alt="" />
                                <span className="nav-text">Events</span>
                            </div>
                        </li>
                        <li className="nav-item1">
                            <div>
                                <img src={accommodation} alt="" />
                                <span className="nav-text">Stay</span>
                            </div>
                        </li>
                        <li className="nav-item1">
                            <div>
                                <img src={university} alt="" />
                                <span className="nav-text">University</span>
                            </div>
                        </li>
                        <li className="nav-item1">
                            <div>
                                <FaBriefcase className="nav-icon" />
                                <span className="nav-text">Jobs</span>
                            </div>
                        </li>
                        <li className="nav-item1">
                            <div>
                                <FaUtensils className="nav-icon" />
                                <span className="nav-text">Explore</span>
                            </div>
                        </li>
                        <li className="nav-item1">
                            <div>
                                <FaCalendarAlt className="nav-icon" />
                                <span className="nav-text">Bookings</span>
                            </div>
                        </li>
                    </ul>
                </div>

                <ul>
                    <li className="nav-item1">
                        <div>
                            <FaCog className="nav-icon" />
                            <span className="nav-text">Settings</span>
                        </div>
                    </li>
                    <li className="nav-item1">
                        <div>
                            <FaSignOutAlt className="nav-icon" />
                            <span className="nav-text">Logout</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Menu;
