import { Card } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiExternalLinkFill } from "react-icons/ri";
import { useSearch } from "../context/search";
import Layout from "./../components/layout/layout";
import { useCart } from "../context/cart";
const { Meta } = Card;

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  return (
    <Layout title={"Search Results"}>
      <div className="container-fluid">
        <div className="text-center mt-4">
          <h4>
            {values?.results.products.length < 1
              ? "No products found"
              : `${values?.results.products.length} products found`}
          </h4>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {values.results.products.map((product) => (
          <div className="m-4">
            <Card
              style={{
                width: 300,
                background: "#f2f2f2",
              }}
              cover={
                <img
                  alt="example"
                  src={`/api/v1/product/product-photo/${product._id}`}
                  style={{
                    height: 280,
                    width: 300,
                    objectFit: "crop",
                  }}
                />
              }
              actions={[
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
                />,
                <HiOutlineShoppingCart
                  key="cart"
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
                    // toast.success(product.name + "added to cart");
                  }}
                  style={{
                    fontSize: 20,
                    cursor: "pointer",
                    marginRight: 8,
                    color: "#444",
                  }}
                />,
              ]}
              hoverable={true}
            >
              <Meta
                title={product.name || "Card title"}
                description={
                  product.description && product.description.length > 30
                    ? product.description.substring(0, 30) + "..."
                    : product.description ||
                      "This is the description of the product"
                }
              />
              <div className="d-flex justify-content-between mt-2">
                <div>Price: {product.price || "N/A"} Rs.</div>
                <div>Quantity: {product.quantity || "N/A"}</div>
              </div>
              <div>Category: {product.category.name || "N/A"}</div>
            </Card>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Search;
