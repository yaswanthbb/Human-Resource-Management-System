import { useLocation, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

import api from "../api/axios";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Logout failed!");
    }

    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="header-container">
        <img
          src="https://res.cloudinary.com/destro001/image/upload/v1763901732/HRMS/logo-white.png"
          alt="logo"
        />

        <div className="header-items">
          <button
            className={location.pathname === "/employees" ? "active" : ""}
            onClick={() => navigate("/employees")}
          >
            <FaUsers className="header-icon" />
            <p>Employees</p>
          </button>

          <button
            className={location.pathname === "/teams" ? "active" : ""}
            onClick={() => navigate("/teams")}
          >
            <FaPeopleGroup className="header-icon" />
            <p>Teams</p>
          </button>

          <button
            className={location.pathname === "/logout" ? "active" : ""}
            onClick={handleLogout}
          >
            <FiLogOut className="header-icon" />
            <p>Logout</p>
          </button>
        </div>
      </div>
      <div className="mobile-nav">
        <button
          className={location.pathname === "/employees" ? "active" : ""}
          onClick={() => navigate("/employees")}
        >
          <FaUsers />
          <span>Employees</span>
        </button>

        <button
          className={location.pathname === "/teams" ? "active" : ""}
          onClick={() => navigate("/teams")}
        >
          <FaPeopleGroup />
          <span>Teams</span>
        </button>

        <button onClick={handleLogout}>
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}

export default Header;
