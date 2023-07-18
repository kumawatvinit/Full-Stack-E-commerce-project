import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useRedirect } from "../../context/redir";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [redir, setRedir] = useRedirect();

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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category" className="nav-link">
                  Category
                </NavLink>
              </li>
              {auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link"
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
                      logout
                    </NavLink>
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
                  Cart(0)
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
