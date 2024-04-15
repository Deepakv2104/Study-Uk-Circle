import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Deepak from '../../assets/img/Deepak.png'
import {
    FaMap,
    FaChartBar,
    FaHeart,
    FaPenSquare,
    FaCog,
    FaSignOutAlt,
    FaSchool,
    FaHome,

FaUtensils,
} from 'react-icons/fa';
import { Avatar } from '@mui/material';
import { useAuth } from '../../auth/userProvider/AuthProvider'; // Import the useAuth hook

const Menu = ({user}) => {
    const navigate = useNavigate();
    const { logout } = useAuth(); // Destructure the logout function from useAuth

    useEffect(() => {
        // Active Navbar Item
        const navItems = document.querySelectorAll('.nav-item1');
    
        navItems.forEach((navItem1) => {
            navItem1.addEventListener('click', () => {
                navItems.forEach((item) => {
                    item.classList.remove('active');
                });
                navItem1.classList.add('active');
    
                // Extract the option from the span text
                const option = navItem1.querySelector('.nav-text').textContent.toLowerCase();
    
                // Push the corresponding path to history
                if(option !== 'logout') {
                    if(option === 'settings') {
                        // If the option is "Settings", append the userId to the path
                        navigate(`/user-dashboard/${option}/${user?.userId}`);
                    } else {
                        navigate(`/user-dashboard/${option}`);
                    }
                } else {
                    logout();
                    // Call the logout function to log the user out
                    navigate('/welcome');
                }
            });
        });
    }, [navigate, logout, user]);
    

  

    return (
        <div>
            <div className="main-menu" >
                <div>
                    <div className="user-info">
                        {/* <img
                            src={Deepak}
                            alt="u
                            ser"
                        /> */}
                       <Avatar  sx={{ width: 50, height: 50 ,margin:2}}/>
                        <p>{ user?.name ||'Guest'}</p>
                    </div>
                    <ul>
                        <li className="nav-item1">
                            <a >
                                <FaMap className="nav-icon" />
                                <span className="nav-text">Events</span>
                            </a>
                        </li>
                        <li className="nav-item1">
                            <a >
                                <FaHome className="nav-icon" />
                                <span className="nav-text">Stay</span>
                            </a>
                        </li>
                        <li className="nav-item1">
                            <a >
                                <FaSchool className="nav-icon" />
                                <span className="nav-text">University</span>
                            </a>
                        </li>
                        <li className="nav-item1">
                            <a >
                                <FaUtensils className="nav-icon" />
                                <span className="nav-text">Explore</span>
                            </a>
                        </li>
                        <li className="nav-item1">
                            <a >
                                <FaHeart className="nav-icon" />
                                <span className="nav-text">Favorites</span>
                            </a>
                        </li>
                        {/* <li className="nav-item1">
                            <a >
                                <FaPenSquare className="nav-icon" />
                                <span className="nav-text">Reviews</span>
                            </a>
                        </li> */}
                    </ul>
                </div>

                <ul>
                    <li className="nav-item1">
                        <a >
                            <FaCog className="nav-icon" />
                            <span className="nav-text">Settings</span>
                        </a>
                    </li>
                    <li className="nav-item1" > {/* Add onClick event to trigger logout */}
                        <a >
                            <FaSignOutAlt className="nav-icon" />
                            <span className="nav-text">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Menu;
