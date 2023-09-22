import React, { useEffect, useState } from "react";
import UserMenu from "../../components/layout/userMenu";
import Layout from "../../components/layout/layout";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const Orders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get(`/api/v1/product/orders`, { user });

        setOrder(data.orders);
      } catch (error) {
        // console.log(error);
        toast.error("Error in getting orders");
      }
    };

    getOrders();
  }, []);

  function getStatusSpan(status) {
    let color, fontWeight, backgroundColor;

    switch (status) {
      case "Pending":
        color = "black";
        backgroundColor = "#dab01d";
        fontWeight = "bold";
        break;
      case "Processing":
        color = "black";
        backgroundColor = "#9878d6";
        fontWeight = "bold";
        break;
      case "Shipped":
        color = "white";
        backgroundColor = "#11a68f";
        fontWeight = "bold";
        break;
      case "Delivered":
        color = "white";
        backgroundColor = "green";
        fontWeight = "bold";
        break;
      case "Cancelled":
        color = "white";
        backgroundColor = "#da2e53";
        fontWeight = "bold";
        break;
      default:
        break;
    }

    return (
      <span
        style={{
          color,
          backgroundColor,
          fontWeight,
          borderRadius: "8px",
          padding: "3px 8px",
          display: "inline-block",
          border: "1px solid black",
        }}
      >
        {status}
      </span>
    );
  }

  return (
    <Layout title={"Dashboard-Orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1 className="card-header d-flex justify-content-center">
                All Orders
              </h1>

              <div className="card-body table-responsive">
                <table className="table table-striped table-hover table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product</th>
                      <th scope="col">Date</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    {order.map((order, i) => (
                      <tr key={order._id}>
                        <td>{i + 1}</td>
                        <td>
                          {order.products.map((item, j) => (
                            <div key={j} className="row align-items-center">
                              <div className="col-md-4">
                                <img
                                  src={`/api/v1/product/product-photo/${item.product._id}`}
                                  alt={item.product.name}
                                  className="img-fluid"
                                  style={{
                                    height: "100px",
                                    width: "100px",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                              <div className="col-md-8">
                                <h5>{item.product.name}</h5>
                                <p style={{ fontFamily: "monospace" }}>
                                  Price: &#8377;{item.product.price}
                                </p>
                                <p
                                  style={{
                                    fontFamily: "monospace",
                                    marginTop: "5px",
                                  }}
                                >
                                  Quantity: {item.count}
                                </p>
                                <hr />
                              </div>
                            </div>
                          ))}
                        </td>

                        <td>{moment(order.createdAt).fromNow()}</td>
                        <td>&#8377;{order.payment.transaction.amount}</td>
                        <td>{getStatusSpan(order.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
