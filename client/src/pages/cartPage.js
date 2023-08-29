import React from "react";
import Layout from "../components/layout/layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  const ButtonGroup = Button.Group;
  const navigate = useNavigate();

  const cartArray = [...cart.entries()];

  const totalPrice = cartArray.reduce(
    (total, item) => total + item[1].product.price * item[1].count,
    0
  );

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
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
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
                                <MinusOutlined />
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
                                <PlusOutlined />
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

          <div className="col-md-3">
            <div className="d-flex flex-row justify-content-end">
              <button
                className="btn btn-primary"
                disabled={cart.size === 0}
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                Checkout | Payment
              </button>

              <button
                className="btn btn-primary ms-2"
                onClick={() => {
                  navigate("/");
                }}
              >
                Continue Shopping
              </button>
            </div>
            <div className="d-flex flex-row justify-content-end mt-3">
              <h4>Total Price: &#8377;{totalPrice}</h4>

              <button
                className="btn btn-danger "
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
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
