import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios  from "axios";
import Spinner from "../spinner";

const Private = () => {
  const [ ok, setOk ] = useState(false);
  const [auth, setAuth] = useAuth();

  // console.log("in private, Auth: ", auth);
  // console.log(auth?.token);

  useEffect(() => {
    // console.log("In useEffect of private.js");

    const authCheck = async () => {

      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/userauth`
          , {
            headers: {
              "Authorization": auth?.token,
            },
          }
        );
        // console.log("Request has been made to the user-auth route", res.data);

        // console.log(res.data);
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      }
      catch (err) {
        console.log("Error in private.js: ", err);
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
  return ok ? <Outlet /> : <Spinner />;
};

export default Private;