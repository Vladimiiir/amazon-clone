import React, { useEffect } from "react";
import "./Payment.css";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useStateValue } from "../StateProvider";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "../axios";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

function CheckoutPage() {
  const [{ user, basket }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate special stripe client secret which allows us to charge customer
    // dependent on basket! -> new secret has to be generated
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("the client secret is >>>", clientSecret);
  console.log("User >>> ", user);

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })

      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id);
        setDoc(ref, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        navigate("../orders", { replace: true });
      });
  };

  const handleChange = (e) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="checkoutpage">
      <div className="checkoutpage__upper">
        <div className="logo">
          <Link to="/">
            <img
              className="checkoutpage__logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png"
            />
          </Link>
        </div>
        <h2>{"Checkout "}</h2>
        <h2 style={{ marginLeft: "5px" }}>(</h2>
        <h2 style={{ color: "#007185" }}>{basket?.length} items</h2>
        <h2>)</h2>
      </div>
      <div className="checkoutpage__middle">
        <div className="checkoutpage__left">
          <div className="checkoutpage__123">
            <div className="checkoutpage__shippingAddress">
              <h4>1</h4>
              <h4>Shipping address</h4>
              <div>
                <p>{user?.displayName}</p>
                <p>Al Sufouh Street</p>
                <p>Lavender Suites Building</p>
                <p>Dubai, Al Sufouh</p>
              </div>
              <p>Change</p>
            </div>
            <div className="checkoutpage__paymentMethod">
              <div className="checkoutpage__paymentMethod__title">
                <h4 className="first">2</h4>
                <p className="second">Choose a payment method</p>
              </div>
              <div className="haha">
                <div className="checkoutpage__paymentMethod__balance">
                  <h3>Your available balance</h3>
                  <div className="checkoutpage__paymentMethod__balance__giftCard">
                    <h5>Enter a gift card or promotional code</h5>
                    <div className="inputs">
                      <AddIcon className="checkoutpage__paymentMethod__balance__giftCard__plussign" />
                      <input type="text" placeholder="Enter code" />
                      <button type="submit">Apply</button>
                    </div>
                  </div>
                </div>
                {/* Start: Your credit and debit cards */}
                <div className="checkoutpage__creditDebit">
                  <h3>Your credit and debit cards</h3>
                  <div className="checkoutpage__creditDebit__cardInfo">
                    <div className="expiresOn">Expires on</div>
                    <div className="nameOnCard">Name on card</div>
                  </div>
                  <div className="checkoutpage__creditDebit__add">
                    <AddIcon className="checkoutpage__creditDebit__add_plussign" />
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/01/payments-portal/r1/add-payment-method/card-logo-compact._CB478583243_.gif" />
                    <p className="addCreditDebit">
                      Add a credit or debit card >
                    </p>
                    <p>Amazon.ae accepts all major credit cards</p>
                  </div>
                  <div className="cardInfo">
                    <input className="radioCard" type="radio" />
                    <div className="cardElement">
                      <CardElement onChange={handleChange} />
                    </div>
                    <input
                      className="actualNameOnCard"
                      placeholder="Name on Card..."
                    />
                  </div>
                </div>
                {/* End: Your credit and debit cards */}

                <div className="checkoutpage__otherPaymentOptions">
                  <h3>Other payment options</h3>
                  <div className="checkoutpage__otherPaymentOptions__content">
                    <input type="radio" />
                    <div>
                      <p>Cash on Delivery (COD)</p>
                      <p>
                        Cash on delivery is not available for this order. Why?
                      </p>
                      <p>Please use another payment method to proceed.</p>
                    </div>
                  </div>
                  <div className="paymentButtonDiv">
                    <form onSubmit={handleSubmit}>
                      <button
                        className="paymentButton"
                        disabled={processing || disabled || succeeded}
                      >
                        <span>
                          {processing ? (
                            <p>Processing</p>
                          ) : (
                            "Use this payment method"
                          )}
                        </span>
                      </button>
                    </form>
                    {error && <div>{error}</div>}
                  </div>
                </div>
              </div>
            </div>
            <div className="checkoutpage__itemsAndShipping">
              <div className="checkoutpage__itemsAndShipping__title">
                <h4>3</h4>
                <h4>Items and shipping</h4>
              </div>
              <div className="checkoutpage__itemsAndShipping__title__content">
                <p>
                  *Why has sales tax been applied?
                  <span style={{ color: "#007185" }}>
                    {" "}
                    See tax and seller information
                  </span>
                </p>
                <p>
                  Need help? Check our{" "}
                  <span style={{ color: "#007185" }}>Help pages </span>or
                  <span style={{ color: "#007185" }}> contact us</span>
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.{" "}
                  <span style={{ color: "#007185" }}>here</span>.
                </p>
                <p>
                  You may return new, unopened merchandise in original condition
                  within 15 days of delivery. Exceptions and restrictions apply.
                  See amazon.ae's{" "}
                  <span style={{ color: "#007185" }}>Returns Policy</span>.
                </p>
                <p>
                  Need to add more items to your order? Continue shopping on the
                  <span style={{ color: "#007185" }}> amazon.ae homepage</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="checkoutpage__right">
          <div className="checkoutpage__right__buttonDiv">
            <form onSubmit={handleSubmit}>
              <button
                className="checkoutpage__right__buttonBtn"
                disabled={processing || disabled || succeeded}
              >
                <span>
                  {processing ? <p>Processing</p> : "Use this payment method"}
                </span>
              </button>
            </form>
            {error && <div>{error}</div>}
          </div>
          <div className="checkoutpage__right__note1">
            <p>
              Choose a payment method to continue checking out. You'll still
              have a chance to review and edit your order before it's final.
            </p>
          </div>
          <div>
            <h3 className="checkoutpage__right__orderSummary">Order Summary</h3>
            <div className="checkoutpage__right__orderDetails">
              <div className="checkoutpage__right__orderDetails__items">
                <span>Items:</span>
                <span>
                  <CurrencyFormat
                    renderText={(value) => <p>{value}</p>}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </span>
              </div>
              <div className="checkoutpage__right__orderDetails__shipping">
                <span>Shipping & handling: </span>
                <span>--</span>
              </div>

              <div className="checkoutpage__right__orderDetails__import">
                <span style={{ color: "#007185" }}>Import Fees Deposit:</span>
                <span>--</span>
              </div>

              <div className="checkoutpage__right__orderDetails__total">
                <span>Total: </span>
                <span>--</span>
              </div>

              <div className="checkoutpage__right__orderDetails__promotion">
                <span>Promotion applied:</span>
                <span>--</span>
              </div>

              <div className="checkoutpage__right__orderDetails__giftCard">
                <span>Gift Card Balance:</span>
                <span>--</span>
              </div>
            </div>
          </div>
          <div className="checkoutpage__right__orderTotal">
            <h4>Order total: </h4>
            <p style={{ color: "black" }}>
              <CurrencyFormat
                renderText={(value) => <p>{value}</p>}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </p>
          </div>
          <div className="checkoutpage__right__note2">
            <div>
              <span>
                Additional Conditions of Sale apply to Global Store item(s) in
                your order. Any warranty descriptions were intended for
                purchasers in the country of origin. Warranty may not be valid
                in the UAE.
              </span>
            </div>
            <div>
              <span>How are shipping costs calculated?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

{
}
