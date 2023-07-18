import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios  from "axios";
import Spinner from "../spinner";

const Private = () => {
  const [ ok, setOk ] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/user-auth")
      //   , {
      //     headers: {
      //       "Authorization": auth?.token,
      //     },
      //   }
      if (res.data.ok) {
        setOk(true);
      } else {
        // setAuth(null);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.token]);

  // outlet: renders the child route's element, if there is one
  return ok ? <Outlet /> : <Spinner />;
};

export default Private;
