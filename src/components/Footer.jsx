import React from "react";

export default function Footer() {
  return (
    <footer style={{
      marginTop: "60px",
      padding: "40px 0",
      backgroundColor: "#f8fafc",
      borderTop: "1px solid #e2e8f0",
      textAlign: "center"
    }}>
      <div className="container">
        <p style={{ 
          margin: "0", 
          color: "#64748b",
          fontSize: "14px"
        }}>
          © 2024 TicketPro. Built with React for the Multi-Framework Challenge.
        </p>
        <p style={{ 
          margin: "8px 0 0 0", 
          color: "#94a3b8",
          fontSize: "12px"
        }}>
          A clean ticket management application demonstrating frontend mastery.
        </p>
      </div>
    </footer>
  );
}
