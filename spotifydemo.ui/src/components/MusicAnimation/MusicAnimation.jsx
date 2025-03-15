"use client";

import { useEffect, useRef } from "react";
import "../MusicAnimation/MusicAnimation.css";

export default function MusicAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = Math.min(window.innerWidth * 0.8, 800);
      canvas.height = Math.min(window.innerHeight * 0.6, 600);
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Create bars for visualization
    const barCount = 64;
    const barWidth = canvas.width / barCount;
    const bars = Array(barCount).fill(0);

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update bar heights with a wave-like motion
      for (let i = 0; i < barCount; i++) {
        const time = Date.now() / 1000;
        const x = i / barCount;

        // Create a wave pattern
        bars[i] = Math.sin(x * 10 + time * 2) * 0.5 + 0.5;
        bars[i] *= Math.sin(x * 5 - time) * 0.5 + 0.5;
        bars[i] = bars[i] * canvas.height * 0.5;

        // Draw bar with gradient
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, "#9333ea"); // Purple
        gradient.addColorStop(1, "#ec4899"); // Pink

        ctx.fillStyle = gradient;
        ctx.fillRect(
          i * barWidth,
          canvas.height - bars[i],
          barWidth - 2,
          bars[i]
        );
      }

      // Draw circular wave
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height / 4,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Pulsating circle
      const pulse = Math.sin(Date.now() / 500) * 0.2 + 0.8;
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        (canvas.height / 4) * pulse,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
      ctx.lineWidth = 3;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="animation-wrapper">
      <canvas ref={canvasRef} className="music-canvas" />
      <h2 className="tagline">Experience the Sound</h2>
    </div>
  );
}
