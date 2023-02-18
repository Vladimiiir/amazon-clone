import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import "animate.css";

function Order({ order }) {
  const [{ basket, user }, dispatch] = useStateValue();

  const firstWords = (str) => {
    const firstSpaceIndex = str.indexOf(" ");
    return str.substring(0, firstSpaceIndex);
  };
  // animate__fadeIn
  return (
    <div className="order scale-y-50 ease-in-out duration-200">
      {/* <h2>Order</h2> */}
      <div className="order__header">
        <div className="order__orderPlaced">
          <p>ORDER PLACED</p>
          <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
        </div>
        <div className="order__total">
          <p>TOTAL</p>
          <CurrencyFormat
            renderText={(value) => <h3>{value}</h3>}
            decimalScale={2}
            value={order.data.amount / 100}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </div>
        <div className="order__shipTo">
          <p>SHIP TO</p>
          <p style={{ color: "#007185" }}>{firstWords(user?.displayName)}</p>
        </div>
      </div>
      <p className="order__orderId">
        <small>{order.id}</small>
      </p>
      <div className="order__orderDetails">
        {order.data.basket?.map((item) => (
          <>
            {" "}
            <p className="order__orderDetails__child">{item.title}</p>
            <img
              className="order__orderDetails__child"
              src={item.image}
              style={{ width: "150px" }}
            />
          </>
        ))}
      </div>
    </div>
  );
}

export default Order;
