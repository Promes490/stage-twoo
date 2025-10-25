import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const nav = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error("Username required");
      return;
    }
    signup({ username });
    toast.success("Account created");
    nav("/dashboard");
  };

  return (
    <div className="container card auth-card">
      <h2>Signup</h2>
      <form onSubmit={handle}>
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <button type="submit" className="btn">Signup</button>
      </form>
      <p>
        Have an account? <Link to="/auth/login">Login</Link>
      </p>
    </div>
  );
}
