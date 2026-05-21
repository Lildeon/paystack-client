import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="mx-5">
        <nav className="py-4 justify-center gap-5 flex text-xl font-bold">
          <NavLink
            className={({ isActive }) => (isActive ? "border-b-2" : "")}
            to="/"
          >
            Events
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "border-b-2" : "")}
            to={`/register`}
          >
            Register
          </NavLink>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
