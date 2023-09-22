import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import customAxios from "./../../pages/auth/customAxios";

const { Meta } = Card;

const ProductCard = ({
  id = null,
  title = "title",
  description,
  slug,
  price,
  quantity,
  category = "category",
  photo = null,
  actions = true,
  redirect = true,
}) => {
  const [imageSrc, setImageSrc] = useState(
    process.env.PUBLIC_URL + "/ocean.jpeg"
  );
  const navigate = useNavigate();

  const fetchImageFromServer = async () => {
    try {
      const response = await fetch(`/api/v1/product/product-photo/${id}`);
      const data = await response.blob();
      const ISrc = URL.createObjectURL(data);
      setImageSrc(ISrc);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (id) fetchImageFromServer();
  }, []);

  const handleHomeClick = () => {
    // we will redirect to product page
    toast.info("Redirecting to " + title);
    setTimeout(() => {
      //   navigate("/");
      navigate(`/product/${slug}`);
    }, 2000);
  };

  const handleEditClick = (e) => {
    // we will redirect to update page
    e.stopPropagation();
    toast.info("Redirecting to update page");
    setTimeout(() => {
      navigate("/dashboard/admin/product/" + slug);
    }, 2000);
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!id) return;

    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      toast.info("Deleting product");
      const response = await customAxios.delete(
        `/api/v1/product/delete-product/${id}`
      );

      // console.log(response);

      if (response.data.success) {
        toast.success(title + " deleted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(response.data?.message);
      }
    } catch (error) {
      // console.log(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Server is down!");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <Card
      style={{
        width: 300,
        background: "#f2f2f2",
      }}
      cover={
        <img
          alt="example"
          //   src={`/api/v1/product/product-photo/${id}`}
          src={photo ? photo : imageSrc}
          style={{
            height: 280,
            width: 300,
            objectFit: "crop",
          }}
        />
      }
      actions={
        actions
          ? [
              <EditOutlined
                key="edit"
                onClick={handleEditClick}
                style={{
                  fontSize: 18,
                  cursor: "pointer",
                  marginRight: 8,
                  color: "green",
                }}
              />,
              <DeleteOutlined
                key="delete"
                onClick={(event) => {
                  handleDeleteClick(event);
                }}
                style={{
                  fontSize: 18,
                  cursor: "pointer",
                  marginRight: 8,
                  color: "red",
                }}
              />,
            ]
          : null
      }
      hoverable={true}
      onClick={redirect ? handleHomeClick : null}
    >
      <Meta
        title={title || "Card title"}
        description={
          description && description.length > 30
            ? description.substring(0, 35) + "..."
            : description || "This is the description of the product"
        }
      />
      <div className="d-flex justify-content-between mt-2">
        <div>Price: {price || "N/A"} Rs.</div>
        <div>Quantity: {quantity || "N/A"}</div>
      </div>
      <div>Category: {category || "N/A"}</div>
    </Card>
  );
};

export default ProductCard;
