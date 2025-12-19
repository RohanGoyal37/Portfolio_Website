import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "./utils/adminAuth";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (login(password)) {
      navigate("/admin");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div style={{padding: 40}}>
      <h2>Admin Login</h2>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
