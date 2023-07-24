import React from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "./../../components/layout/adminMenu";

const CreateProduct = () => {
  return (
    <Layout title={"Dashboard-Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1 className="card-header">Create Products</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
