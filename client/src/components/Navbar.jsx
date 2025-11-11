import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        🩺 HealthLink
      </Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/facilities">Facilities</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/education">Education</Link>
        {user ? (
          <button onClick={logout} className="ml-2 bg-green-700 px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="ml-2 bg-green-700 px-3 py-1 rounded">
              Login
            </Link>
            <Link to="/register" className="ml-2 bg-white text-green-600 px-3 py-1 rounded">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
