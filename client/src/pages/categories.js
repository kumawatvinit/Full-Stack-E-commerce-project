import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import useCategory from "./../hooks/useCategory";
import { NavLink, useNavigate } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  const navigate = useNavigate();

  return (
    <Layout title={"All Categories"}>
      <div className="container m-3">
        <div className="row">
          {categories.map((c) => (
            <div className="col-xs-1 col-md-3">
              <div
                className="card mb-3"
                key={c._id}
                style={{
                  cursor: "pointer",
                  background: 'linear-gradient(to bottom, #2979db, #8e44ad)'
                }}
                onClick={() => navigate(`/category/${c.slug}`)}
              >
                <div className="card-body">
                  {/* <NavLink to={`/category/${c.slug}`} className="btn "> */}
                  <h5 className="card-title">{c.name}</h5>
                  <p className="card-text">Total products: <b>{c.count}</b></p>
                  {/* </NavLink> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
