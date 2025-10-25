import React, { useEffect, useState, useContext } from "react";
import { ticketService } from "../../services/ticketService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import TicketForm from "./TicketForm";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const { logout } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const ticketList = await ticketService.list();
      setTickets(ticketList);
    } catch (err) {
      toast.error("Failed to load tickets. Please retry.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await ticketService.remove(id);
        toast.success("Ticket deleted successfully");
        loadTickets();
      } catch (err) {
        toast.error(err.message || "Failed to delete ticket");
      }
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await ticketService.update(id, { status });
      toast.success("Ticket status updated");
      loadTickets();
    } catch (err) {
      toast.error(err.message || "Failed to update ticket");
    }
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
  };

  const handleFormSaved = () => {
    setEditingTicket(null);
    loadTickets();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open": return "green";
      case "in_progress": return "amber";
      case "closed": return "gray";
      default: return "gray";
    }
  };

  return (
    <div className="container">
      <header className="dash-header">
        <h1>Ticket Management</h1>
        <div>
          <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>
          <button onClick={() => { logout(); nav("/"); }} className="btn btn-ghost">Logout</button>
        </div>
      </header>

      <div className="grid-two">
        <div>
          <TicketForm 
            initial={editingTicket || { title: "", status: "open", description: "" }}
            onSaved={handleFormSaved}
          />
        </div>

        <div>
          <h2>All Tickets ({tickets.length})</h2>
          {tickets.length === 0 ? (
            <div className="card">
              <p>No tickets yet. Create your first ticket!</p>
            </div>
          ) : (
            tickets.map((ticket) => (
              <div key={ticket.id} className="card ticket-card">
                <div className="ticket-head">
                  <h3>{ticket.title}</h3>
                  <span className={`tag ${ticket.status}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
                
                {ticket.description && (
                  <p style={{ margin: "8px 0", color: "#6b7280" }}>
                    {ticket.description}
                  </p>
                )}
                
                <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button 
                    className="btn btn-small" 
                    onClick={() => handleStatusUpdate(ticket.id, "open")}
                    style={{ backgroundColor: ticket.status === "open" ? "#10b981" : "#e5e7eb", color: ticket.status === "open" ? "white" : "#374151" }}
                  >
                    Open
                  </button>
                  <button 
                    className="btn btn-small" 
                    onClick={() => handleStatusUpdate(ticket.id, "in_progress")}
                    style={{ backgroundColor: ticket.status === "in_progress" ? "#f59e0b" : "#e5e7eb", color: ticket.status === "in_progress" ? "white" : "#374151" }}
                  >
                    In Progress
                  </button>
                  <button 
                    className="btn btn-small" 
                    onClick={() => handleStatusUpdate(ticket.id, "closed")}
                    style={{ backgroundColor: ticket.status === "closed" ? "#6b7280" : "#e5e7eb", color: ticket.status === "closed" ? "white" : "#374151" }}
                  >
                    Closed
                  </button>
                  <button 
                    className="btn btn-small" 
                    onClick={() => handleEdit(ticket)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-small btn-danger" 
                    onClick={() => handleDelete(ticket.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
