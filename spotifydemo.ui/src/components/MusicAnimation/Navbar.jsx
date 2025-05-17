import "../MusicAnimation/Navbar.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo-container">
        <h1 className="logo" onClick={() => navigate("/")}>
          Melodify
        </h1>
      </div>
      <div className="auth-buttons">
        <button className="sign-in-button" onClick={() => navigate("/login")}>
          Sign In
        </button>
        <button
          className="sign-up-button"
          onClick={() => navigate("/register")}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}
