import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function NetworkBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: {
            repulse: { distance: 120, duration: 0.5 },
          },
        },
        particles: {
          color: { value: "#6366f1" }, // Indigo glow
          links: {
            color: "#6366f1",
            distance: 130,
            enable: true,
            opacity: 0.25, // 🔹 чуть ярче (было 0.15)
            width: 1, // 🔹 немного толще
          },
          move: {
            enable: true,
            speed: 0.6, // плавное, немного живее
            direction: "none",
            outModes: { default: "bounce" },
          },
          number: {
            value: 75, // 🔹 чуть больше частиц (было 60)
            density: { enable: true, area: 900 },
          },
          opacity: {
            value: 0.6, // 🔹 ярче точки (было 0.4)
            animation: {
              enable: true,
              speed: 0.4,
              minimumValue: 0.2,
              sync: false,
            },
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1.2, max: 3 },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.4,
              sync: false,
            },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
