import React, { useEffect, useState, useContext } from "react";
import { ticketService } from "../../services/ticketService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const { logout } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    ticketService.list().then(setTickets).catch((err) => {
      toast.error("Failed to load tickets. Please retry.");
    });
  }, []);

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const resolved = tickets.filter((t) => t.status === "closed").length;

  return (
    <div className="container">
      <header className="dash-header">
        <h1>Dashboard</h1>
        <div>
          <button onClick={() => { logout(); nav("/"); }} className="btn btn-ghost">Logout</button>
        </div>
      </header>

      <section className="cards-grid">
        <div className="card">
          <h3>Total tickets</h3>
          <p className="stat">{total}</p>
        </div>
        <div className="card">
          <h3>Open</h3>
          <p className="stat">{open}</p>
        </div>
        <div className="card">
          <h3>Resolved</h3>
          <p className="stat">{resolved}</p>
        </div>
      </section>

      <section style={{marginTop:20}}>
        <Link to="/tickets" className="btn">Manage Tickets</Link>
      </section>
    </div>
  );
}
