import React from "react";
import Navbar from "../MusicAnimation/Navbar";
import MusicAnimation from "../MusicAnimation/MusicAnimation";

export default function Main() {
  return (
    <main className="main-container">
      <Navbar />
      <div className="animation-container">
        <MusicAnimation />
      </div>
    </main>
  );
}
