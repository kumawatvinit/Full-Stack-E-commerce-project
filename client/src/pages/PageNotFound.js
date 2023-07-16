import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout>
      <div
        className="image-container"
        style={{
          backgroundImage: `url('404.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          width: "100%",
          minHeight: "80vh",
        }}
      >
        <Link to={"/"} className="home-link">
          GO TO HOMEPAGE &rarr;
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
