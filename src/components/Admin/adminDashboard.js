import React, { useState } from "react";

import "./adminDashboard.css";
import { logout } from "../../firebase";
import Sidebar from "./sidebar";


import Content from "./Content";

const AdminDashboard = () => {
  const [showSidebar, onSetShowSidebar] = useState(false);
  return (
    <div className="relative">
      <Sidebar
        onSidebarHide={() => {
          onSetShowSidebar(false);
        }}
        showSidebar={showSidebar}
      />
      <Content
        onSidebarHide={() => {
          onSetShowSidebar(true);
        }}
      />
    </div>
  );
};



export default AdminDashboard;
