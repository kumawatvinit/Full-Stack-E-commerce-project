import React from "react";
import Layout from "../components/layout/layout.js";
import { useRedirect } from "../context/redir.js";
import { toast } from "react-toastify";
import { useEffect } from "react";
// import { ToastContainer } from "react-toastify";

const HomePage = () => {
  const [redir, setRedir] = useRedirect();

  // toast msg will be displayed after the component has rendered 
  // and the state has been updated. 
  // This should ensure that the toast msg shows up properly when the user is redirected
  useEffect(() => {
    if (redir.msg) {
      toast.success(redir.msg);
      setRedir({
        ...redir,
        msg: "",
      });
    }
  }, [redir, setRedir]);

  return (
    <Layout>
      <h1>HomePage</h1>
    </Layout>
  );
};

export default HomePage;
