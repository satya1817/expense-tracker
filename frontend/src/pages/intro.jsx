import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import introVideo from "../assets/tony4.mp4";
import "./intro.css";

function Intro() {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
const [fadeOut, setFadeOut] =
  useState(false);
  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += 1;

      if (value <= 100) {
        setProgress(value);
      }

      if (value >= 100) {
        clearInterval(interval);
      }
    }, 140);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
  className={`intro-container ${
    fadeOut ? "fade-out" : ""
  }`}
>
      <video
  autoPlay
  muted
  playsInline
  className="intro-video"
  onEnded={() => {
    setFadeOut(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  }}
>
  <source
    src={introVideo}
    type="video/mp4"
  />
</video>

      <h1 className="jarvis-text">
        Welcome Back Sir...
      </h1>

      <h2 className="loading-text">
        Initializing STARK FINANCE
      </h2>

      <h2 className="progress-text">
        {progress}%
      </h2>
    </div>
  );
}

export default Intro;