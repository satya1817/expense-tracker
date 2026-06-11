import { useNavigate } from "react-router-dom";
import registerVideo from "../assets/tony6.mp4";
import "./outro.css";
function RegisterSuccess() {
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
          src={registerVideo}
          type="video/mp4"
        />
      </video>

      <h1 className="outro-text">
        WELCOME TO
        STARK INDUSTRIES
      </h1>

      <h2 className="outro-subtext">
        User Access Initialized...
      </h2>
    </div>
  );
}

export default RegisterSuccess;