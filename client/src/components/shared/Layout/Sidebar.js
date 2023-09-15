import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { userMenu } from "./Menus/userMenu";
import { useSelector } from "react-redux";
function Sidebar() {
  const location = useLocation();
  const isActive = location.pathname;
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {user?.role === "organization" && (
            <>
              <div className={`menu-item ${isActive === "/" && "active"}`}>
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/">INVENTORY</Link>
              </div>

              <div className={`menu-item ${isActive === "/donar" && "active"}`}>
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/donar">DONAR</Link>
              </div>

              <div
                className={`menu-item ${isActive === "/hospital" && "active"}`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/hospital">HOSPITAL</Link>
              </div>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <div
                className={`menu-item ${
                  isActive === "/donar-list" && "active"
                }`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/donar-list">DONAR LIST</Link>
              </div>

              <div
                className={`menu-item ${
                  isActive === "/hospital-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/hospital-list">HOSPITAL LIST</Link>
              </div>

              <div
                className={`menu-item ${isActive === "/org-list" && "active"}`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/org-list">ORGANIZATION LIST</Link>
              </div>
            </>
          )}

          {(user?.role === "donar" || user?.role === "hospital") && (
            <>
              <div
                className={`menu-item ${
                  isActive === "/organization" && "active"
                }`}
              >
                <i className="fa-solid fa-building-ngo"></i>
                <Link to="/organization">ORGANIZATION</Link>
              </div>
            </>
          )}

          {user?.role === "hospital" && (
            <>
              <div
                className={`menu-item ${isActive === "/consumer" && "active"}`}
              >
                <i className="fa-solid fa-building-ngo"></i>
                <Link to="/consumer">Consumer</Link>
              </div>
            </>
          )}

          {user?.role === "donar" && (
            <>
              <div
                className={`menu-item ${isActive === "/donation" && "active"}`}
              >
                <i className="fa-solid fa-building-ngo"></i>
                <Link to="/donation">Donation</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
