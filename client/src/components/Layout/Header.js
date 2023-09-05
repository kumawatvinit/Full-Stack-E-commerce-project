import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useRedirect } from "../../context/redir";
import SearchInput from "../forms/searchInput";
import useCategory from "./../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [redir, setRedir] = useRedirect();
  const [cart, setCart] = useCart();
  const categories = useCategory();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🛒 ShopSpot
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-2">
              <li className="nav-item me-3">
                <SearchInput />
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </NavLink>
                <ul
                  className="dropdown-menu"
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    borderRadius: "10px 10px",
                  }}
                >
                  <li>
                    <NavLink to={"/categories"} className="dropdown-item">
                      All Categories
                    </NavLink>
                  </li>
                  {categories?.map((c) => (
                    // put the span to right corner, and name to left corner, put little margin in right corner if required
                    <li>
                      <NavLink
                        to={`/category/${c.slug}`}
                        className="dropdown-item d-flex justify-content-between nav-link-item"
                      >
                        <style>
                          {`
                            .nav-link-item:hover {
                              background-color: #f0f0f0;
                            }
                          `}
                        </style>
                        <span>{c.name}</span>
                        <span
                          // reduce the size of the badge
                          className="badge bg-success rounded-pill"
                          key={c._id}
                        >
                          {c.count}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              {auth.user ? (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name || "Buddy"}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/login"
                          className="dropdown-item"
                          onClick={() => {
                            setAuth({
                              ...auth,
                              user: null,
                              token: "",
                            });
                            localStorage.removeItem("auth");

                            setRedir({
                              ...redir,
                              msg: "Logout successful.",
                            });
                          }}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Signup
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Signin
                    </NavLink>
                  </li>{" "}
                </>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <Badge
                    count={cart?.size}
                    color="#9d174d"
                    size="large"
                    showZero
                    offset={[12, 0]}
                  >
                    <div
                      style={{
                        fontSize: "17px",
                        fontFamily: "Poppins",
                      }}
                    >
                      Cart
                    </div>
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
