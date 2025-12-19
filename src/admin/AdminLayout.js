import {Navigate, Outlet} from "react-router-dom";
import {isAdmin, logout} from "./utils/adminAuth";

export default function AdminLayout() {
  if (!isAdmin()) return <Navigate to="/admin/login" />;

  return (
    <div style={{padding: 20}}>
      <h2>Admin Panel</h2>
      <button onClick={logout}>Logout</button>
      <hr />
      <Outlet />
    </div>
  );
}
