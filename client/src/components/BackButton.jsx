import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="back-button"
    >
      ← Back
    </button>
  );
}

export default BackButton;