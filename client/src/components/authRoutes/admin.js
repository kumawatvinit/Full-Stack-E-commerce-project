import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../spinner";

const AuthAdmin = () => {
  const [ok, setOk] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`/api/v1/auth/adminauth`, {
          headers: {
            Authorization: auth?.token,
          },
        });
        // console.log("Request has been made to the Admin-auth route", res.data);

        // console.log(res.data);
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (err) {
        // console.log("Error in AuthAdmin.js: ", err);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.token]);

  // console.log("Ok: ", ok);
  // outlet: renders the child route's element, if there is one
  return ok ? <Outlet /> : <Spinner path="/dashboard/user" />;
};

export default AuthAdmin;
