import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {

    FaHeart,
    FaCog,
    FaSignOutAlt,

    FaUtensils,
} from 'react-icons/fa';
import { Avatar } from '@mui/material';
import { useAuth } from '../../auth/userProvider/AuthProvider'; // Import the useAuth hook
import university from '../../assets/img/university .png';
import accommodation from '../../assets/img/accommodation.png';
import event from '../../assets/img/event.png'
const Menu = ({ user }) => {
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
                if (option !== 'logout') {
                    if (option === 'settings') {
                        // If the option is "Settings", append the userId to the path
                        navigate(`/user-dashboard/${option}/${user?.userId}`);
                    } else {
                        navigate(`/user-dashboard/${option}`);
                    }
                } else {
                    logout();
                    // Call the logout function to log the user out
                    navigate('/');
                }
            });
        });
    }, [navigate, logout, user]);

    return (
        <div>
            <div className="main-menu">
                <div>
                    <div className="user-info">
                        <Avatar sx={{ width: 50, height: 50, margin: 2 }} />
                        <p>{user?.name || 'Guest'}</p>
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
        <FaUtensils className="nav-icon" />
        <span className="nav-text">Explore</span>
    </div>
</li>
<li className="nav-item1">
    <div>
        <FaHeart className="nav-icon" />
        <span className="nav-text">Favorites</span>
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
