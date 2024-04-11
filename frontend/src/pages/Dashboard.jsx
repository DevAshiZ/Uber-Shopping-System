import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashSidebar from "../components/DashSidebar";
import Employee_level from "../components/Employee_level";
import DashProfile from "../components/DashProfile";
import Settings from "../components/Settings";
import Employee_DeliveriesDone from "../components/Employee_DeliveriesDone";
import Contact_Admin from "../components/Contact_Admin";
import AdminPage from "../components/AdminPage";

import React from "react";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === "profile" && <DashProfile />}
      {tab === "Employee_level" && <Employee_level />}
      {tab === "Settings" && <Settings />}
      {tab === "Employee_DeliveriesDone" && <Employee_DeliveriesDone />}
      {tab === "Contact_Admin" && <Contact_Admin />}
      {tab === "AdminPage" && <AdminPage />}
    </div>
  );
}
