import React from "react";
import Layout from "../components/layout/layout.js";
import { useRedirect } from "../context/redir.js";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
// import { ToastContainer } from "react-toastify";
import customAxios from "./auth/customAxios";
import { Card, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiExternalLinkFill } from "react-icons/ri";
import { Prices } from "./../components/prices.js";
import axios from "axios";
import { useCart } from "../context/cart.js";

const { Meta } = Card;

const HomePage = () => {
  const [redir, setRedir] = useRedirect();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  // toast msg will be displayed after the component has rendered
  // and the state has been updated.
  // This should ensure that the toast msg shows up properly when the user is redirected
  useEffect(() => {
    if (redir.msg) {
      toast.success(redir.msg);
      setRedir({
        ...redir,
        msg: "",
      });
    }
  }, [redir, setRedir]);

  const getAllCategories = async () => {
    try {
      setLoading(true);
      const { data } = await customAxios.get(
        `/api/v1/product/category-with-product-count`
      );

      setLoading(false);
      if (data.success) {
        // toast(data.message);
        setCategories(data.categories);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // console.log(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Error connecting to server");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await customAxios.get(
        `/api/v1/product/products/${page}`
      );
      setLoading(false);

      if (data.success) {
        // toast(data.message);
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // console.log(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Error connecting to server");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // get total products
  const getTotalProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/total-products`);
      setLoading(false);

      setTotal(data?.total);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllProducts();
    getTotalProducts();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [page]);

  // useEffect(() => {
  //   if(!checked.length || !radio.length) getAllProducts();
  // });

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // filter products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filter`, {
        checked,
        radio,
      });

      if (data.success) {
        setProducts(data?.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // console.log(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Error connecting to server");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Layout title={"ShopSpot-Home"} description={"Node React E-commerce App"}>
      <img
        src="/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      <div className="row">
        <div className="col-md-3">
          <div className="filters-container bg-light p-4 rounded shadow m-4">
            <h3 className="text-center mb-4">Filter by category</h3>
            <div className="category-list">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="category-item d-flex justify-content-between align-items-center mb-2"
                >
                  <label className="category-label d-flex align-items-center">
                    <input
                      type="checkbox"
                      className="category-checkbox me-2"
                      key={category._id}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setChecked([...checked, category._id]);
                        } else {
                          setChecked(
                            checked.filter((id) => id !== category._id)
                          );
                        }
                      }}
                    />
                    {category.name}
                  </label>
                  <span
                    className="badge bg-primary rounded-pill"
                    key={category._id}
                  >
                    {category.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="filters-container bg-light p-4 rounded shadow m-4">
            <h3 className="text-center mb-4">Filter by price</h3>
            <div className="price-list">
              <Radio.Group
                onChange={(e) => setRadio(e.target.value)}
                buttonStyle="solid"
              >
                {Prices?.map((price) => (
                  <div key={price._id}>
                    <Radio value={price.array}>{price.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            {/* create a small button, with text reset filter, make it beautiful */}
            <div className="text-center mt-4">
              <button
                className="btn btn-primary"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <h3 className="text-center">All Products</h3>
          <div className="d-flex flex-wrap">
            {products.map((product) => (
              <div className="m-4">
                <Card
                  style={{
                    width: 300,
                    background: "#f2f2f2",
                  }}
                  cover={
                    <img
                      alt="example"
                      src={`/api/v1/product/product-photo/${product._id}`}
                      style={{
                        height: 280,
                        width: 300,
                        objectFit: "crop",
                      }}
                    />
                  }
                  actions={[
                    <RiExternalLinkFill
                      key="link"
                      onClick={() => {
                        toast.info("Redirecting to " + product.name);
                        navigate(`/product/${product.slug}`);
                      }}
                      style={{
                        fontSize: 20,
                        cursor: "pointer",
                        marginRight: 8,
                        color: "#1976D2",
                      }}
                    />,
                    <HiOutlineShoppingCart
                      key="cart"
                      onClick={() => {
                        setCart(() => {
                          const newCart = new Map(cart); // Create a new map
                          if (newCart.has(product._id)) {
                            newCart.get(product._id).count += 1;
                          } else {
                            newCart.set(product._id, { product, count: 1 });
                          }

                          localStorage.setItem(
                            "cart",
                            JSON.stringify(Array.from(newCart.entries()))
                          );
                          toast.success(product.name + " added to cart");
                          return newCart;
                        });
                        // toast.success(product.name + "added to cart");
                      }}
                      style={{
                        fontSize: 20,
                        cursor: "pointer",
                        marginRight: 8,
                        color: "#444",
                      }}
                    />,
                  ]}
                  hoverable={true}
                >
                  <Meta
                    title={product.name || "Card title"}
                    description={
                      product.description && product.description.length > 30
                        ? product.description.substring(0, 30) + "..."
                        : product.description ||
                          "This is the description of the product"
                    }
                  />
                  {/* style category also */}
                  <div className="d-flex justify-content-between mt-2">
                    {/* Change font of price and quantity */}
                    <div>Price: {product.price || "N/A"} Rs.</div>
                    <div>Quantity: {product.quantity || "N/A"}</div>
                  </div>
                  <div>Category: {product.category.name || "N/A"}</div>
                </Card>
              </div>
            ))}
          </div>
          {checked.length || radio.length ? (
            <div></div>
          ) : (
            <div>
              <div className="d-flex justify-content-center m-4 p-3">
                <button
                  className={`btn btn-dark mr-2 ${
                    page === 1 ? "disabled" : ""
                  }`}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                  disabled={!loading ? page === 1 : true}
                >
                  Prev
                </button>
                <button className="btn btn-dark mx-2" disabled>
                  {page}
                </button>
                <button
                  className={`btn btn-dark ${
                    page === Math.ceil(total / 5.0) ? "disabled" : ""
                  }`}
                  onClick={() => {
                    setPage(page + 1);
                  }}
                  disabled={!loading ? page === Math.ceil(total / 5.0) : true}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
