import React from "react";
import { useNavigate } from "react-router-dom";
import wave from "../../assets/hero-wave.svg";
import "./Hero.css";

export default function Hero() {
  const nav = useNavigate();
  return (
    <div className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <h1 className="hero-title">TicketPro — Manage tickets faster</h1>
          <p className="hero-sub">A clean multi-framework ticket app challenge — React version.</p>
          <div className="hero-cta">
            <button onClick={() => nav("/auth/login")} className="btn">Login</button>
            <button onClick={() => nav("/auth/signup")} className="btn btn-outline">Get Started</button>
          </div>
        </div>
        <div className="decor-circle" aria-hidden="true" />
      </div>

      <img src={wave} className="wave" alt="decorative wave" />
      
      {/* Additional decorative circles */}
      <div className="decor-circle-small decor-circle-1" aria-hidden="true" />
      <div className="decor-circle-small decor-circle-2" aria-hidden="true" />
    </div>
  );
}
