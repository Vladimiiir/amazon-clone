import React from "react";
import { useStateValue } from "../StateProvider";
import "./CheckoutProduct.css";
import { Link, useNavigate } from "react-router-dom";

function CheckoutProduct({ id, image, price, title, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const removeFromBasket = () => {
    // remove items from basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="checkoutProduct">
      <label className="checkoutProduct__checkbox">
        <input type="checkbox"></input>
      </label>
      <img className="checkoutProduct__image" src={image} />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>

        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>

        <button onClick={removeFromBasket}>Remove from Basket</button>
      </div>
      <div className="checkoutProduct__price">
        <p>
          <strong>$</strong>
          <strong>{price}</strong>
        </p>
      </div>
    </div>
  );
}

export default CheckoutProduct;
