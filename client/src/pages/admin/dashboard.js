import React from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/adminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Admin Dashboard"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1 className="card-header">Admin Dashboard</h1>
              <div className="card-body">
                <h5 className="card-title">Welcome {auth?.user?.name}!</h5>
                <h5 className="card-title">ID: {auth?.user?.email}</h5>
                <p className="card-text">
                  This is a special area for Admins. You can create, read,
                  update and delete categories and products here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
