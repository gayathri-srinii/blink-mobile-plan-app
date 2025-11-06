import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import blinkLogo from "../assets/blink-logo.png";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const isDashboard = location.pathname.startsWith("/dashboard");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    // localStorage.removeItem("token");
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm fixed-top">
      <div className="container">
        {/* Logo + App Name */}
        <Link
          className="navbar-brand d-flex align-items-center"
          to={token ? "/dashboard" : "/"}
        >
          <img
            src={blinkLogo}
            alt="Blink logo"
            width="40"
            height="40"
            className="me-2"
            style={{ borderRadius: "10px" }}
          />
          <span className="fw-bold text-primary fs-4">Blink</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center">
            {isDashboard && token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/view-plan">
                    Base Plan
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/add-on">
                    Add On
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/customise-plan">
                    Customise Plan
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/recommendations">
                    Recommendations
                  </Link>
                </li>

                {/* Hover Dropdown Menu on Right */}
                <li
                  className="nav-item dropdown ms-3 position-relative"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <button
                    className="btn border-0 menu-btn"
                    id="profileMenu"
                    aria-expanded={showDropdown}
                    style={{
                      borderRadius: "6px",
                      padding: "6px 10px",
                    }}
                  >
                    <i className="bi bi-list fs-4"></i>
                  </button>

                  <ul
                    className={`dropdown-menu dropdown-menu-end ${showDropdown ? "show" : ""
                      }`}
                    aria-labelledby="profileMenu"
                    style={{
                      right: 0,
                      left: "auto",
                      minWidth: "150px",
                      marginTop: "8px",
                    }}
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/dashboard/cart"
                        onClick={() => setShowDropdown(false)}
                      >
                        🛒 Cart
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/dashboard/profile"
                        onClick={() => setShowDropdown(false)}
                      >
                        👤 User Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => {
                          setShowDropdown(false);
                          handleLogout();
                        }}
                      >
                        🚪 Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/login" ? "active-link" : ""
                      }`}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/signup" ? "active-link" : ""
                      }`}
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
