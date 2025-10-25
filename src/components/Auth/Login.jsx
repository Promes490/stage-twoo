import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const nav = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error("Username required");
      return;
    }
    login({ username });
    toast.success("Logged in");
    nav("/dashboard");
  };

  return (
    <div className="container card auth-card">
      <h2>Login</h2>
      <form onSubmit={handle}>
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <button type="submit" className="btn">Login</button>
      </form>
      <p>
        No account? <Link to="/auth/signup">Signup</Link>
      </p>
    </div>
  );
}

