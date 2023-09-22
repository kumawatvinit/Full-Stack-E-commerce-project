import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Card } from "antd";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiExternalLinkFill } from "react-icons/ri";
import { useCart } from "../context/cart";

const { Meta } = Card;

const CategoryProducts = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  const getProductsByCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/products-by-category/${params.slug}/${page}`
      );
      setLoading(false);

      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // get total products
  const getTotalProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/total-products-by-category/${params.slug}`
      );
      setLoading(false);

      setTotal(data?.total);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getProductsByCategory();
    getTotalProducts();
  }, [params?.slug]);

  useEffect(() => {
    getProductsByCategory();
  }, [page]);

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center text-uppercase font-weight-bold">
          {category?.name}
        </h4>
        <h6 className="text-center">{total} results found</h6>

        <div className="row">
          <div className="d-flex flex-wrap">
            {products.map((product) => (
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
                  {/* style category also */}
                  <div className="d-flex justify-content-between mt-2">
                    {/* Change font of price and quantity */}
                    <div>Price: {product.price || "N/A"} Rs.</div>
                    <div>Quantity: {product.quantity || "N/A"}</div>
                  </div>
                  <div>Category: {product.category.name || "N/A"}</div>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-center m-4 p-3">
            <button
              className={`btn btn-dark mr-2 ${page === 1 ? "disabled" : ""}`}
              onClick={() => {
                setPage(page - 1);
              }}
              disabled={!loading ? page === 1 : true}
            >
              Prev
            </button>
            <button className="btn btn-dark mx-2" disabled>
              {page}
            </button>
            <button
              className={`btn btn-dark ${
                page === Math.ceil(total / 5.0) ? "disabled" : ""
              }`}
              onClick={() => {
                setPage(page + 1);
              }}
              disabled={
                !loading ? total == 0 || page === Math.ceil(total / 5.0) : true
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
