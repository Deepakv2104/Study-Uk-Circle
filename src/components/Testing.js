import React from "react";
import '../styles/Testing.css'; // Import CSS for styling sidebar

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="hamburger" onClick={toggleSidebar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      {/* Add sidebar content here */}
    </div>
  );
};

export default Sidebar;
