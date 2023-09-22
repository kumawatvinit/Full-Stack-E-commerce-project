import React, { useEffect, useState } from "react";
import Layout from "./../../components/layout/layout";
import AdminMenu from "../../components/layout/adminMenu";
import axios from "axios";
import { Select } from "antd";
import { useAuth } from "../../context/auth";

const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useAuth();

  const getUsers = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/all-users`);

      setUsers(data.users);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = async (value, id) => {
    try {
      const { data } = await axios.put(`/api/v1/product/change-role/${id}`, {
        role: value,
      });

      getUsers();
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Layout title={"Dashboard-All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-90 p-3">
              <h1 className="card-header">All users</h1>

              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-light table-hover table-bordered table-responsive ">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile no.</th>
                        <th scope="col">Role</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {users?.map((user, idx) => (
                        <tr>
                          <th scope="row">{idx}</th>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>
                            {user.email === auth?.user?.email ? (
                              <div className="text-success fw-bold">Admin*</div>
                            ) : (
                              <Select
                                bordered={false}
                                defaultValue={user.role ? "Admin" : "User"}
                                onChange={(value) => {
                                  handleChange(value, user._id);
                                }}
                                dropdownStyle={{ minWidth: "80px" }}
                                width={100}
                              >
                                <Option key={0} value="0">
                                  User
                                </Option>
                                <Option key={1} value="1">
                                  Admin
                                </Option>
                              </Select>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
