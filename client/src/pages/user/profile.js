import React, { useState } from "react";
import UserMenu from "../../components/layout/userMenu";
import Layout from "./../../components/layout/layout";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState(auth?.user?.name || "");
  const [email, setEmail] = useState(auth?.user?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState(auth?.user?.phone || "");
  const [address, setAddress] = useState(auth?.user?.address || "");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.put(`/api/v1/auth/update-profile`, {
        name,
        email,
        password,
        phone,
        address,
      });

      // console.log(res);

      if (data.success) {
        toast.success("Profile updated successfully");

        // update the auth context
        setAuth({
          ...auth,
          user: data.updateUser,
        });

        localStorage.setItem(
          "auth",
          JSON.stringify({ ...auth, user: data.updateUser })
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Layout title={"Dashboard-Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1 className="card-header d-flex justify-content-center">
                Update Profile
              </h1>
              <form
                onSubmit={handleSubmit}
                className="p-3"
                style={{ width: "70%", margin: "0 auto" }}
              >
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    autoComplete="given-name"
                    value={name}
                    onChange={(evnt) => setName(evnt.target.value)}
                    autoFocus
                    // required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    autoComplete="email"
                    value={email}
                    onChange={(evnt) => setEmail(evnt.target.value)}
                    required
                    disabled
                    style={{ cursor: "not-allowed" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(evnt) => setPassword(evnt.target.value)}
                      // required
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Mobile no.
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Enter your mobile no."
                    autoComplete="phone"
                    value={phone}
                    onChange={(evnt) => setPhone(evnt.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                    autoComplete="address"
                    value={address}
                    onChange={(evnt) => setAddress(evnt.target.value)}
                  ></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
