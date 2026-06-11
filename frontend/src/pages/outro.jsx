import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import outroVideo from "../assets/tony3.mp4";
import "./outro.css";
function Outro() {
  const navigate = useNavigate();

  return (
    <div className="outro-container">
  <video
    autoPlay
    muted
    playsInline
    className="outro-video"
    onEnded={() => navigate("/")}
  >
    <source
      src={outroVideo}
      type="video/mp4"
    />
  </video>

  <h1 className="outro-text">
    SESSION TERMINATED
  </h1>

  <h2 className="outro-subtext">
    Powering Down STARK FINANCE...
  </h2>
</div>
  );
}

export default Outro;