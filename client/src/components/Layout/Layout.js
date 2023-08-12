import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({
  children,
  title,
  description,
  keywords,
  author,
  applyBackground = true,
  bgcolor = null,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: bgcolor
          ? bgcolor
          : applyBackground
          ? "linear-gradient(to left, #2b3038, #45608b, #273a2b)"
          : "none", // Set background to none if applyBackground is false
      }}
    >
      <Helmet>
        <meta charSet="utf-8" />

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>
      <Header />

      <main style={{ flex: "1 0 auto", minHeight: "70vh" }}>
        <ToastContainer position="top-center" />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "ShopSpot",
  description: "We are a one-stop shop for all your fashion and tech needs.",
  keywords:
    "ShopSpot, Ecommerce, Fashion, Tech, Shopping, Online Shopping, Online Store, Online Shop, Shop, Store,mern, react,node, mongodb",
  author: "kumawatvinit",
};

export default Layout;
