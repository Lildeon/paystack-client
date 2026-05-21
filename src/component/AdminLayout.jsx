import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="mx-3">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
