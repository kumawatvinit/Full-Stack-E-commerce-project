import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { RiExternalLinkFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  const params = useParams();
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/single-product/${params.slug}`
      );

      setProduct(data?.product);
    } catch (error) {
      // console.log(error);
    }
  };

  const getRelatedProducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-products/${product._id}`
      );

      setRelatedProducts(data?.products);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line
  }, [params]);

  useEffect(() => {
    if (product?._id) getRelatedProducts();
    // eslint-disable-next-line
  }, [product]);

  return (
    <Layout
      title={`ShopSpot-${product.name}`}
      applyBackground={false}
      bgcolor={"#1a1a1a"}
    >
      <div className="row container mt-5">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={500}
            width={400}
          />
        </div>
        <div className="col-md-6 text-center">
          <div
            style={{
              // background: "linear-gradient(to bottom, #0c0c0c, #111111)",
              border: "5px solid #1a1a1a",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              color: "black",
              marginLeft: "20px",
            }}
          >
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "10px",
                textAlign: "left",
              }}
            >
              {product.name}
            </h1>
            <p
              style={{
                fontSize: "16px",
                marginBottom: "10px",
                textAlign: "left",
              }}
            >
              {product.description}
            </p>
            <p
              style={{
                fontSize: "16px",
                marginBottom: "10px",
                textAlign: "left",
              }}
            >
              Price: {product.price}
            </p>
            <p
              style={{
                fontSize: "16px",
                marginBottom: "10px",
                textAlign: "left",
              }}
            >
              Category: {product?.category?.name}
            </p>
            <p
              style={{
                fontSize: "16px",
                marginBottom: "10px",
                textAlign: "left",
              }}
            >
              Available Quantity: {product.quantity}
            </p>
            <button
              className="btn btn-primary mt-2"
              style={{
                fontSize: "16px",
                padding: "10px 20px",
                background: "#007bff",
                border: "1px solid #007bff",
              }}
              onClick={() => {
                setCart(() => {
                  const newCart = new Map(cart); // Create a new map
                  if (newCart.has(product._id)) {
                    newCart.get(product._id).count += 1;
                  } else {
                    newCart.set(product._id, { product, count: 1 });
                  }
                  localStorage.setItem(
                    "cart",
                    JSON.stringify(Array.from(newCart.entries()))
                  );
                  toast.success(product.name + " added to cart");
                  return newCart;
                });
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="row container mt-3">
        {relatedProducts?.length < 1 && (
          <h2 className="text-center mb-3" style={{ color: "black" }}>
            No Related Products found!
          </h2>
        )}
        {relatedProducts?.length > 0 && (
          <h2 className="text-center mb-3" style={{ color: "black" }}>
            Related Products
          </h2>
        )}
        {relatedProducts?.map((product) => (
          <div className="col-md-4" key={product._id}>
            <div
              className="card"
              style={{
                // background: "linear-gradient(to bottom, #0c0c0c, #111111)",
                border: "5px solid #1a1a1a",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                color: "black",
                marginBottom: "20px",
                marginLeft: "20px",
                marginRight: "20px",
              }}
            >
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
                height={300}
                width={400}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  {product.description && product.description.length > 30
                    ? product.description.substring(0, 30) + "..."
                    : product.description ||
                      "This is the description of the product"}
                </p>
                <p className="card-text">Price: {product.price || "N/A"}</p>
                <p className="card-text">
                  Category: {product?.category?.name || "N/A"}
                </p>
                <p className="card-text">
                  Available Quantity: {product.quantity || "N/A"}
                </p>
                {/* Make a div use className, and give both childrens half-half of the width available to parent card */}
                <div className="d-flex justify-content-between ms-4 me-4">
                  <div className="d-flex align-items-center">
                    <RiExternalLinkFill
                      key="link"
                      onClick={() => {
                        toast.info("Redirecting to " + product.name);
                        navigate(`/product/${product.slug}`);
                      }}
                      style={{
                        fontSize: 20,
                        cursor: "pointer",
                        marginRight: 8,
                        color: "#1976D2",
                      }}
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setCart(() => {
                          const newCart = new Map(cart); // Create a new map
                          if (newCart.has(product._id)) {
                            newCart.get(product._id).count += 1;
                          } else {
                            newCart.set(product._id, { product, count: 1 });
                          }
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(Array.from(newCart.entries()))
                          );
                          toast.success(product.name + " added to cart");
                          return newCart;
                        });
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;
