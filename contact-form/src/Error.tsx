import { useNavigate } from "react-router";
const Error = () => {
  const navigate = useNavigate();
  return (
    <div>
      Error
      <button className="btn" onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
};

export default Error;
