import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./utils/adminAuth";
import "./Admin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
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
        <div className="login-card">
          <div className="admin-logo" style={{justifyContent: 'center', marginBottom: '2rem'}}>
            <span>RG</span>
            <span style={{color: 'white', fontWeight: 300}}>Admin</span>
          </div>
          <h2 style={{marginBottom: '2rem', fontWeight: 600}}>Secure Access</h2>
          
          <div className="admin-form-group">
            <label className="admin-label">Admin Email</label>
            <input
              className="admin-input"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Password</label>
            <input
              className="admin-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleLogin()}
            />
          </div>
          
          <button 
            className="admin-btn" 
            style={{width: '100%', justifyContent: 'center'}} 
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
          
          <p style={{marginTop: '2rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)'}}>
            Firebase Protected Area
          </p>
        </div>
      </div>
    </div>
  );
}

