import React, { useState, useEffect } from "react";
import gsap from "gsap";
import "./adminDashboard.css";

import Sidebar from "./sidebar";
import Content from "./Content";

const AdminDashboard = () => {
  const [showSidebar, onSetShowSidebar] = useState(false);

  useEffect(() => {
    // Animation to hide the black screen
    const tl = gsap.timeline();
    tl.to(".black-screen", { duration: 1, scaleY: 0, ease: "power4.inOut" });
  }, []);

  return (
    <div className="relative">
      {/* Black screen */}
      <div className="black-screen"></div>

      {/* Sidebar and Content */}
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
