import React from "react";
import UserMenu from "../../components/layout/userMenu";
import Layout from "../../components/layout/layout";

const Orders = () => {
  return (
    <Layout title={"Dashboard-Orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1 className="card-header d-flex justify-content-center">All Orders</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
