import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);

    if (count === 0) {
      navigate("/login", {
        state: location.pathname,
      });
    }
    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <div>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h3 className="Text-center"> Redirecting you in {count} seconds</h3>
        <div class="spinner-border" role="status">
          <span class="sr-only">|||</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
