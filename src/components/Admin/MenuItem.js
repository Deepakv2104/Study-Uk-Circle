import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import SidebarIcons from "./small-comp/SideBarIcons";
import { animated } from "react-spring";
import { signOut } from "firebase/auth";
import { useAuth } from "../../auth/userProvider/AuthProvider";
function MenuItem({ item: { id, title, notifications ,path}, onClick, selected }) {
    const navigate = useNavigate();
    const [logoutLoading, setLogoutLoading] = useState(false);
    const { logout } = useAuth();
  
    const handleClick = async () => {
        console.log(title);
        onClick(title);
      
        if (title === "Logout") {
          // Handle logout separately
          console.log("clicked logout")
          try {
            setLogoutLoading(true); // Disable the button and show loading state
            await logout(); // Call the logout function from your AuthContext
            navigate('/');
            console.log("User logged out successfully");
          } catch (error) {
            console.error("Logout error:", error.message);
          } finally {
            setLogoutLoading(false); // Enable the button and hide loading state
          }
        } else {
          // Navigate to the corresponding path
          navigate(path);
        }
      };
      
    return (
      <animated.div
        className={clsx(
          "w-full mt-6 flex items-center px-3 sm:px-0 xl:px-3 justify-start sm:justify-center xl:justify-start sm:mt-6 xl:mt-3 cursor-pointer",
          selected === id ? "sidebar-item-selected" : "sidebar-item"
        )}
        onClick={handleClick}
      >
        <SidebarIcons id={id} />
        <div className="block sm:hidden xl:block ml-2">{title}</div>
        <div className="block sm:hidden xl:block flex-grow" />
        {notifications && (
          <div className="flex sm:hidden xl:flex bg-pink-600 w-5 h-5 flex items-center justify-center rounded-full mr-2">
            <div className="text-white text-sm">{notifications}</div>
          </div>
        )}
      </animated.div>
    );
  }
  
export default MenuItem;