import React from "react";
import Layout from "../components/layout/layout.js";
import { useAuth } from "../context/auth.js";

const HomePage = () => {
  const [auth, setAuth] = useAuth();

  return <Layout><h1>HomePage</h1>
  </Layout>;
};

export default HomePage;
