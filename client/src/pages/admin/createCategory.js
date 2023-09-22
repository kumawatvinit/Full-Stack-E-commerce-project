import React, { useState, useEffect } from "react";
import Layout from "./../../components/layout/layout";
import AdminMenu from "./../../components/layout/adminMenu";
import { toast } from "react-toastify";
import customAxios from "./../auth/customAxios";
import CategoryCreateForm from "../../components/forms/categoryCreateForm";
import { Modal } from "antd";
import CategoryUpdateForm from "../../components/forms/categoryUpdateForm";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);

  // modal
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [count, setCount] = useState(0);

  // create category
  const [category, setCategory] = useState("");

  // update/delete category
  const [updatedCategoryId, setUpdatedCategoryId] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");

  let counter = 1;

  // handle category creation
  const handleCreate = async (event) => {
    event.preventDefault();

    if (category.length < 4) {
      toast.error("Category name too short!");
      return;
    }

    try {
      const response = await customAxios.post(
        `/api/v1/category/create-category`,
        { name: category }
      );

      // console.log(response);

      if (response.data?.success) {
        // toast.success(response.data.message);
        getAllCategories();
        toast.success(`${category} category created successfully!`);
        setCategory("");
      } else {
        // toast.error(response.data?.message);
        toast.error("Something went wrong!");
      }
    } catch (error) {
      // console.log(error);

      toast.error(error.response?.data);
      toast.error("Something went wrong!");
    }
  };

  // handle category update
  const handleUpdate = async (event) => {
    event.preventDefault();

    if (updatedCategory.length < 4) {
      toast.error("Category name too short!");
      return;
    }

    try {
      const response = await customAxios.put(
        `/api/v1/category/update-category/${updatedCategoryId}`,
        { name: updatedCategory }
      );

      // console.log(response);

      if (response.data?.success) {
        getAllCategories();
        setVisible(false);
        toast.success(response.data.message);
        setUpdatedCategory("");
        setUpdatedCategoryId("");
      } else {
        toast.error(response.data?.message);
      }
    } catch (error) {
      // console.log(error);

      toast.error(error.response?.data);
      toast.error("Something went wrong!");
    }
  };

  // handle category deletion
  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const response = await customAxios.delete(
        `/api/v1/category/delete-category/${updatedCategoryId}`
      );

      // console.log(response);

      if (response.data.success) {
        getAllCategories();
        setDeleteVisible(false);
        toast.success(updatedCategory + " deleted successfully!");
        setUpdatedCategory("");
        setUpdatedCategoryId("");
      } else {
        toast.error(response.data?.message);
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

  // fetch all categories
  const getAllCategories = async () => {
    try {
      const response = await customAxios.get(
        `/api/v1/product/category-with-product-count`
      );

      // console.log(response);

      if (response.data?.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      // console.log(error);

      if (error.response) {
        // request made and server responded
        toast.error(error.response.data.message);
      } else if (error.request) {
        // server is down
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
    <Layout title={"Dashboard-Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1 className="card-header">Create new category</h1>
              <div className="card-body">
                <CategoryCreateForm
                  value={category}
                  setValue={setCategory}
                  handleSubmit={handleCreate}
                />

                <hr />

                <h4 className="text-muted">Manage Categories</h4>
                <div className="table-responsive">
                  <table className="table table-striped table-light table-hover table-bordered table-responsive ">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Category</th>
                        <th scope="col">Products</th>
                        <th scope="col">Update</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {categories?.map((cat) => (
                        <tr>
                          <th scope="row">{counter++}</th>
                          <td>{cat.name}</td>
                          <td>{cat.count}</td>
                          <td>
                            <div className="d-flex justify-content-end">
                              <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => {
                                  setUpdatedCategoryId(cat._id);
                                  setUpdatedCategory(cat.name);
                                  setVisible(true);
                                }}
                              >
                                Update
                              </button>
                              <button
                                className="btn btn-danger btn-sm me-2"
                                onClick={() => {
                                  setUpdatedCategoryId(cat._id);
                                  setUpdatedCategory(cat.name);
                                  setCount(cat.count);
                                  setDeleteVisible(true);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Modal
            title="Update Category"
            open={visible}
            onCancel={() => setVisible(false)}
            onOk={(event) => {
              handleUpdate(event);
              setVisible(false);
            }}
            okText="Update"
          >
            <CategoryUpdateForm
              value={updatedCategory}
              setValue={setUpdatedCategory}
            />
          </Modal>

          <Modal
            title={String("Confirm Delete Category")}
            open={deleteVisible}
            onCancel={() => setDeleteVisible(false)}
            onOk={(event) => {
              handleDelete(event);
              setDeleteVisible(false);
            }}
            okText="Delete"
            okButtonProps={{ danger: true }}
          >
            <div>
              <p className="text-muted">
                Are you sure you want to delete{" "}
                <b className="text-success">'{updatedCategory}'</b> category?
              </p>
              <span className="text-danger fw-bold">
                All {count} products associated to this category will be
                deleted!
              </span>
            </div>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
