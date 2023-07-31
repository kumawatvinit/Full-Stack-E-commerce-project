import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const ProductCard = ({
  id,
  title,
  description,
  slug,
  imageUrl,
  price,
  quantity,
  category,
  photo = null,
  actions = true,
  redirect = true,
}) => {
  const navigate = useNavigate();
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
      navigate("/dashboard/admin/product/"+slug);
    }, 2000);
  };

  const handleDeleteClick = (e) => {
    // first we will show a confirm dialog/modal
    // if user clicks on yes,
    // then we will delete the product,
    // and show a success message
    // else we will do nothing
    e.stopPropagation();
    toast.info("Deleting product");
    setTimeout(() => {
      navigate("/dashboard/admin/products");
    }, 2000);
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
        //   src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
        src={
          id ?
           `${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}` :
            photo ? photo :
            "https://images.unsplash.com/photo-1690620368365-f0e394e1510e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        }
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
                onClick={handleDeleteClick}
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
      onClick={redirect? handleHomeClick: null}
    >
      <Meta
        title={title || "Card title"}
        description={description || "This is the description"}
      />
      {/* style category also */}
      <div className="d-flex justify-content-between mt-2">
        {/* Change font of price and quantity */}
        <div>Price: {price || "N/A"} Rs.</div>
        <div>Quantity: {quantity || "N/A"}</div>
      </div>
      <div>Category: {category || "N/A"}</div>
    </Card>
  );
};

export default ProductCard;
