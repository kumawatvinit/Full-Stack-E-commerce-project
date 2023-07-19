import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);

    if(count === 0) {
      navigate("/login");
    }
    return () => clearInterval(interval);
  }, [count]);

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
