import React from "react";
import Layout from "./../../components/layout/layout";
import { useEffect } from "react";
import { useRedirect } from "../../context/redir";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [redir, setRedir] = useRedirect();

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
    <Layout title={"Dashboard-ShopStop"}>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1>User Dashboard page</h1>
      </div>
    </Layout>
  );
};

export default Dashboard;
