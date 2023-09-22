import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "./../../components/layout/adminMenu";
import { Select } from "antd";
import customAxios from "./../auth/customAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ProductCard from "./../../components/layout/productCard";
import axios from "axios";
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      const categoryObject = categories.find(
        (categoryObject) => categoryObject.name === category
      );
      formData.append("category", categoryObject._id);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping === "1" ? true : false);
      formData.append("photo", photo);

      setLoading(true);

      const { data } = await axios.post(
        `/api/v1/product/create-product`,
        formData
      );

      // console.log(data);

      if (data?.success) {
        setLoading(false);
        toast.success(data.message);

        toast("Redirecting to products page");

        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setQuantity("");
        setPhoto("");
        setShipping("");

        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      // console.log(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Server is down!");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  // fetch all categories
  const getAllCategories = async () => {
    try {
      const response = await customAxios.get(`/api/v1/category/categories`);

      // console.log(response);

      if (response.data?.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      // console.log(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Server is down!");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout title={"Dashboard-Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1 className="card-header">Create Products</h1>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label className="text-secondary mb-1">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Product Name"
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    {/* {name.length < 3 && (
                      <small className="text-danger">
                        Name must be at least 3 characters long
                      </small>
                    )} */}
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-muted mb-1">Description</label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Product Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* {description.length < 10 && (
                      <small className="text-danger">
                        Description must be at least 10 characters long
                      </small>
                    )} */}
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-muted mb-1">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Set Product Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />

                    {/* {price <= 0 && (
                      <small className="text-danger">
                        Price must be positive
                      </small>
                    )} */}
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-muted mb-1">Category</label>
                    <Select
                      showSearch={true}
                      className="form-control"
                      placeholder="Please select a category"
                      bordered={false}
                      allowClear={true}
                      size="large"
                      onChange={(value) => setCategory(value)}
                    >
                      {categories.map((aCategory) => (
                        <Option key={aCategory._id} value={aCategory.name}>
                          {aCategory.name}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-muted mb-1">Shipping</label>
                    <Select
                      className="form-control"
                      placeholder="Please select a shipping option"
                      bordered={false}
                      size="large"
                      onChange={(value) => setShipping(value)}
                      defaultActiveFirstOption={true}
                    >
                      <Option value="1">Yes</Option>
                      <Option value="0">No</Option>
                    </Select>
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-muted mb-1">Quantity</label>
                    <input
                      // I want the number should be an integer only
                      type="number"
                      className="form-control"
                      placeholder="Product Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      onKeyDown={(e) => {
                        // Allow only digits (0-9) and some specific control keys (e.g., backspace, delete, arrow keys)
                        if (
                          !/[\d\b]/.test(e.key) &&
                          ![
                            "ArrowLeft",
                            "ArrowRight",
                            "ArrowUp",
                            "ArrowDown",
                            "Backspace",
                            "Delete",
                            "Home",
                            "End",
                          ].includes(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />

                    {/* {quantity <= 0 && (
                      <small className="text-danger">
                        Quantity must be positive
                      </small>
                    )} */}
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-muted mb-1">Product Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control text-secondary"
                      onChange={(e) => {
                        setPhoto(e.target.files[0]);
                      }}
                      style={{
                        cursor: "pointer",
                        ...(photo
                          ? {
                              borderRightColor: "green",
                              background:
                                "linear-gradient(to right, rgb(174, 242, 229), rgb(166, 237, 164))",
                            }
                          : {
                              borderRightColor: "red",
                              background:
                                "linear-gradient(to right, rgb(252, 240, 230), rgb(255, 130, 125))",
                            }),
                      }}
                    />
                  </div>

                  {photo && (
                    <div className="d-flex justify-content-center mt-3 col-md-6">
                      {/* // eslint-disable-next-line */}
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product image"
                        className="img-fluid img-responsive"
                      />
                    </div>
                  )}

                  <hr />

                  <div className="d-flex justify-content-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-success btn-lg"
                      style={{ fontFamily: "Montserrat" }}
                      disabled={
                        loading ||
                        !name ||
                        !description ||
                        !price ||
                        !category ||
                        !shipping ||
                        !quantity ||
                        !photo
                      }
                    >
                      {loading ? "Loading..." : "Create Product"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div>
            <div className="d-flex justify-content-center mt-4">
              <h4>Product Preview</h4>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <ProductCard
                photo={photo ? URL.createObjectURL(photo) : ""}
                title={name}
                description={description}
                price={price}
                category={category}
                quantity={quantity}
                actions={false}
                redirect={false}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

/*
  Zod can be used for validation of input data.
*/
