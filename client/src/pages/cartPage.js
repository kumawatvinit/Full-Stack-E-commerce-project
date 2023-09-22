import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "antd";
import PlusIcon from "@mui/icons-material/Add";
import MinusIcon from "@mui/icons-material/Remove";
import {
  MdArrowCircleRight,
  MdDoubleArrow,
  MdLocationOn,
} from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const ButtonGroup = Button.Group;
  const navigate = useNavigate();

  const cartArray = [...cart.entries()];

  const totalPrice = cartArray.reduce(
    (total, item) => total + item[1].product.price * item[1].count,
    0
  );

  const [animation, setAnimation] = useState(true);

  // Toggle the animation direction
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation(!animation);
    }, 1000); // Adjust the duration as needed
    return () => clearInterval(interval);
  }, [animation]);

  const getToken = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/braintree/get-token`);

      setClientToken(data.clientToken);
      // console.log(data.clientToken);
    } catch (error) {
      // console.log(error);

      toast.error("Error in getting braintree token");
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();

      const productsArray = Array.from(cart.values());

      // console.log(productsArray);
      const { data } = await axios.post(`/api/v1/product/braintree/payment`, {
        nonce,
        productsArray,
      });

      toast.success("Payment Successfull");
      setLoading(false);

      localStorage.removeItem("cart");
      setCart(new Map());

      setTimeout(() => {
        navigate("/dashboard/user/orders");
      }, 2000);
    } catch (error) {
      // console.log(error);
      toast.error("Error in making payment");
      setLoading(false);
    }
  };

  return (
    <Layout title={"Cart-ShopSpot"}>
      <div className="container">
        <div className="row mb-2">
          <div className="col-md-12">
            <h1
              className="text-center p-2 mb-1"
              style={{ fontFamily: "Playfair Display" }}
            >
              {auth.user ? `Hello ${auth.user.name}!` : "Hello Buddy!"}
            </h1>

            <h4 className="text-center">
              {cart.size > 0 ? (
                `You have ${cart.size} items in your cart.`
              ) : (
                <div className="d-flex flex-row justify-content-center">
                  <div>Cart Empty! Head over to the</div>
                  <Link to="/" className="nav-link">
                    <div
                      style={{
                        fontFamily: "Poppins",
                        textDecoration: "underline",
                        marginLeft: "5px",
                      }}
                    >
                      Shop
                    </div>
                  </Link>
                </div>
              )}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {cartArray?.map((item) => {
              const product = item[1].product;
              const count = item[1].count;

              return (
                <div className="row">
                  <div
                    className="card mb-3 shadow"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${product._id}`}
                          alt={product.name}
                          className="img-fluid"
                          style={{
                            height: "200px",
                            width: "200px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">
                            {product.description &&
                            product.description.length > 40
                              ? product.description.substring(0, 40) + "..."
                              : product.description ||
                                "This is the description of the product"}
                          </p>
                          <p className="card-text">
                            Price: &#8377;{product.price}
                          </p>
                          <div className="d-flex align-items-center">
                            <ButtonGroup>
                              <Button
                                onClick={() => {
                                  setCart(() => {
                                    const newCart = new Map(cart); // Create a new map
                                    if (newCart.has(product._id)) {
                                      if (newCart.get(product._id).count > 1) {
                                        newCart.get(product._id).count -= 1; // Reduce the count by 1
                                      } else {
                                        newCart.delete(product._id); // Remove the item if count is 1 or less
                                      }
                                    }
                                    return newCart;
                                  });
                                  localStorage.setItem(
                                    "cart",
                                    JSON.stringify(cartArray)
                                  );
                                }}
                                disabled={count === 1}
                                size="large"
                              >
                                <MinusIcon sx={{ color: "#f50057" }} />
                              </Button>
                              <Button onClick={() => {}} size="large">
                                <b>{count}</b>
                              </Button>
                              <Button
                                onClick={() => {
                                  setCart(() => {
                                    const newCart = new Map(cart); // Create a new map
                                    if (newCart.has(product._id)) {
                                      newCart.get(product._id).count += 1;
                                    } else {
                                      newCart.set(product._id, {
                                        product,
                                        count: 1,
                                      });
                                    }
                                    return newCart;
                                  });
                                  localStorage.setItem(
                                    "cart",
                                    JSON.stringify(cartArray)
                                  );
                                }}
                                size="large"
                              >
                                <PlusIcon color="success" />
                              </Button>
                            </ButtonGroup>
                            <button
                              className="btn btn-danger ms-auto"
                              onClick={() => {
                                setCart(() => {
                                  const newCart = new Map(cart); // Create a new map
                                  newCart.delete(product._id); // Remove the item by product ID
                                  localStorage.setItem(
                                    "cart",
                                    JSON.stringify(
                                      Array.from(newCart.entries())
                                    )
                                  );
                                  return newCart;
                                });
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="col-md-6">
            <div className="d-flex flex-column justify-content-end">
              <div className="card p-3">
                <h5 className="card-title">Cart Summary</h5>
                <hr className="border-dark" />

                <div className="d-flex justify-content-between">
                  <h4>Total: &#8377;{totalPrice}</h4>
                  <div style={{ maxWidth: "200px" }}>
                    <NavLink className="btn btn-info w-100" to="/">
                      Continue Shopping
                    </NavLink>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-end">
                  <div style={{ maxWidth: "200px" }}>
                    <button
                      className="btn btn-danger mt-3 w-100"
                      onClick={() => {
                        setCart(() => {
                          const newCart = new Map(); // Create a new map
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(Array.from(newCart.entries()))
                          );
                          return newCart;
                        });
                      }}
                      disabled={cart.size === 0}
                    >
                      Clear Cart
                    </button>
                  </div>

                  <div
                    className="d-flex flex-row justify-content-end mt-3"
                    style={{ maxWidth: "400px" }}
                  >
                    {auth?.user?.address ? (
                      <>
                        <div
                          className="address-box border border-dark p-2"
                          style={{ fontFamily: "Arial", fontSize: "14px" }}
                        >
                          <div
                            className="text-black p-3 border"
                            style={{ backgroundColor: "#e3faee" }}
                          >
                            <MdLocationOn style={{ fontSize: "24px" }} />
                            <strong>Current Address</strong>
                          </div>
                          <div
                            className="address-content overflow-auto p-3 border"
                            // style={{ backgroundColor: "#92d6b2" }}
                          >
                            {auth.user.address}
                          </div>
                          <NavLink
                            className="text-decoration-none"
                            to="/dashboard/user/profile"
                            style={{
                              color: "black",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "10px",
                              backgroundColor: "rgb(255, 193, 7)",
                              border: "1px solid #000",
                            }}
                          >
                            <span>Change Current Addresss</span>
                            <MdDoubleArrow style={{ fontSize: "24px" }} />
                          </NavLink>
                        </div>
                      </>
                    ) : (
                      <div
                        className="mt-3"
                        style={{
                          maxWidth: "200px",
                          borderBottom: "1px solid #000",
                          borderRadius: "5px",
                        }}
                      >
                        <button
                          className={`text-decoration-none ${
                            animation ? "shining-line" : ""
                          }`}
                          onClick={() => navigate("/login", { state: "/cart" })}
                          style={{
                            color: "black",
                            backgroundColor: "#c7b9ff", // Green color
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px",
                            position: "relative",
                            overflow: "hidden",
                            border: "1px solid #000",
                            borderRadius: "5px",
                          }}
                        >
                          <span>Login</span>
                          <div className="line-animation"></div>
                          <MdArrowCircleRight style={{ fontSize: "24px" }} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* {auth?.user ? (
                  <div className="d-flex justify-content-end">
                    
                  </div>
                ) : (
                  <></>
                )} */}
              </div>
            </div>

            <div className="mt-2">
              {!clientToken || !cart.size ? (
                <></>
              ) : (
                <>
                  <h4 className="text-center">Pay with Braintree</h4>
                  <hr className="border-dark" />
                  <DropIn
                    options={{
                      authorization: clientToken,
                      // paypal: { flow: "vault", },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <div className="d-flex justify-content-center">
                    <div
                      className="mt-3"
                      style={{
                        maxWidth: "150px",
                        borderBottom: "1px solid #000",
                        borderRadius: "5px",
                        marginBottom: "20px",
                      }}
                    >
                      <button
                        className={`text-decoration-none ${
                          animation ? "shining-line" : ""
                        }`}
                        onClick={handlePayment}
                        style={{
                          color: "black",
                          backgroundColor: "#c7b9ff", // Green color
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px",
                          position: "relative",
                          overflow: "hidden",
                          border: "1px solid #000",
                          borderRadius: "5px",
                          width: "150px",
                        }}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        <span>{loading ? "Loading..." : "Pay now"}</span>
                        <div className="line-animation"></div>
                        <MdArrowCircleRight style={{ fontSize: "24px" }} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
