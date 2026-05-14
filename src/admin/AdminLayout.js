import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { isAdmin, logout } from "./utils/adminAuth";
import { FiGrid, FiBriefcase, FiFolder, FiLogOut, FiExternalLink } from "react-icons/fi";
import "./Admin.css";

export default function AdminLayout() {
  const location = useLocation();
  
  if (!isAdmin()) return <Navigate to="/admin/login" />;

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span className="logo-accent">RG</span>
          <span className="logo-text">Admin</span>
        </div>

        <nav className="admin-nav">
          <Link 
            to="/admin" 
            className={`admin-nav-item ${isActive("/admin") ? "active" : ""}`}
          >
            <FiGrid className="nav-icon" /> 
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/admin/projects" 
            className={`admin-nav-item ${isActive("/admin/projects") ? "active" : ""}`}
          >
            <FiFolder className="nav-icon" /> 
            <span>Projects</span>
          </Link>
          <Link 
            to="/admin/experience" 
            className={`admin-nav-item ${isActive("/admin/experience") ? "active" : ""}`}
          >
            <FiBriefcase className="nav-icon" /> 
            <span>Experience</span>
          </Link>
        </nav>

        <div className="admin-sidebar-footer">
          <a 
            href="/" 
            target="_blank" 
            rel="noreferrer" 
            className="admin-nav-item"
          >
            <FiExternalLink className="nav-icon" /> 
            <span>View Website</span>
          </a>
          <button onClick={logout} className="admin-nav-item logout-btn">
            <FiLogOut className="nav-icon" /> 
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <div className="admin-main-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
