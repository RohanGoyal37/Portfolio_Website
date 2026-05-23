import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./utils/adminAuth";
import { FiMail, FiLock, FiShield, FiArrowRight } from "react-icons/fi";
import "./Admin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    
    if (result.success) {
      navigate("/admin");
    } else {
      alert("Login failed: " + result.error);
    }
  };

  return (
    <div className="admin-body">
      <div className="login-screen">
        {/* Abstract animated glowing orbs in the background */}
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>

        <div className="login-card">
          {/* Subtle top accent line */}
          <div className="login-accent-bar"></div>

          {/* Branded Logo */}
          <div className="admin-logo-container">
            <div className="admin-logo-badge">RG</div>
            <div className="admin-logo-text">
              <span>Admin</span>
              <span className="admin-logo-sub">Workspace</span>
            </div>
          </div>

          <div className="login-header">
            <h2>Secure Gateway</h2>
            <p>Authorized access only. Authentication required.</p>
          </div>
          
          <div className="login-form">
            {/* Email Field */}
            <div className="admin-form-group">
              <label className="admin-label">Admin Email</label>
              <div className="admin-input-wrapper">
                <FiMail className="admin-input-icon" />
                <input
                  className="admin-input-with-icon"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleLogin()}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="admin-form-group">
              <label className="admin-label">Password</label>
              <div className="admin-input-wrapper">
                <FiLock className="admin-input-icon" />
                <input
                  className="admin-input-with-icon"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleLogin()}
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <button 
              className="admin-btn-premium" 
              onClick={handleLogin}
              disabled={loading}
            >
              <span>{loading ? "Verifying Credentials..." : "Authenticate"}</span>
              {!loading && <FiArrowRight className="btn-arrow" />}
            </button>
          </div>
          
          {/* High-fidelity security footer */}
          <div className="login-footer">
            <FiShield className="security-icon" />
            <span>Encrypted Firebase Security SSL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
