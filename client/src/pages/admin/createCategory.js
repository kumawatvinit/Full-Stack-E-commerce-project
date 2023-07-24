import React from "react";
import Layout from "./../../components/layout/layout";
import AdminMenu from "./../../components/layout/adminMenu";

const CreateCategory = () => {
  return (
    <Layout title={"Dashboard-Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1 className="card-header">Create Category</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
