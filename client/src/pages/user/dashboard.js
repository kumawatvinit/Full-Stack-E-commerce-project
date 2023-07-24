import React from "react";
import Layout from "./../../components/layout/layout";
import { useEffect } from "react";
import { useRedirect } from "../../context/redir";
import { toast } from "react-toastify";
import UserMenu from './../../components/layout/userMenu';
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [redir, setRedir] = useRedirect();
  const [auth] = useAuth();

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
    <Layout title={"User Dashboard"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1 className="card-header">User Dashboard</h1>
              <div className="card-body">
                <h5 className="card-title">Welcome {auth?.user?.name}!</h5>
                <p className="card-text">
                  This is your dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
