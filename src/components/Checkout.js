import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  const deselectAllItems = () => {
    <CheckoutProduct />;
  };

  return (
    <div className="checkout">
      <div className="checkout__left">
        {/* <img
          className="checkout__ad"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/Shopping_Feb22/1500x250PCbanneFeb22.jpg"
        /> */}
        <div>
          <h1>Hello, {user?.email}</h1>
          <h2 className="checkout__title">Shopping Cart</h2>
          <h4 className="checkout__deselect" onClick={deselectAllItems}>
            Deselect all items
          </h4>
          <h5 className="checkout__price">Price</h5>
        </div>
        <div className="checkout__shoppingCart">
          {basket.map((item) => (
            <>
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            </>
          ))}
        </div>
        <div className="checkout__subtotal">
          Subtotal ({basket.length} items):{" "}
          <strong>${getBasketTotal(basket)}</strong>
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
