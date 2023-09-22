import React, { useState, useEffect } from "react";
import Layout from "./../../components/layout/layout";
import AdminMenu from "../../components/layout/adminMenu";
import { toast } from "react-toastify";
import customAxios from "../auth/customAxios";
import ProductCard from "../../components/layout/productCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await customAxios.get(`/api/v1/product/products`);

      // console.log(data);

      if (data.success) {
        // toast.success(data.message);
        setProducts(data.products);

        // console.log(products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // console.log(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Server is down!");

        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Function to group products into rows with a specified number of products per row
  const groupProductsIntoRows = (products, productsPerRow) => {
    const rows = [];
    let rowIndex = 0;

    while (rowIndex < products.length) {
      rows.push(products.slice(rowIndex, rowIndex + productsPerRow));
      rowIndex += productsPerRow;
    }

    return rows;
  };

  // Set the number of products per row, adjust as needed
  const productsPerRow = 3;

  // Group products into rows
  const groupedProducts = groupProductsIntoRows(products, productsPerRow);

  return (
    <Layout title={"ShopSpot-All products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1 className="text-center">All products</h1>

            {groupedProducts.flatMap((rowProducts, rowIndex) => (
              <div key={rowIndex} className="row mb-3">
                {rowProducts.map((product) => (
                  <div key={product._id} className="col-md-4">
                    <ProductCard
                      id={product._id}
                      title={product.name}
                      description={product.description}
                      slug={product.slug}
                      imageUrl={null}
                      price={product.price}
                      quantity={product.quantity}
                      category={product.category?.name || null}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
