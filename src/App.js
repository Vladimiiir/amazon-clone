import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Subheader from "./components/Subheader";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useStateValue } from "./StateProvider";
import Payment from "./components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51Lzk9UJoJ8eS77pj2T8CX109svzNVbXZfOD26r5wSs14WUjqfnl1njzeB77w4psiljyfJpgD7K8K977cVNlmsiqJ002dSYvsQx",
    {
      locale: "en",
    }
  );

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // this is a listener that will only run once app component loads
    onAuthStateChanged(auth, (user) => {
      console.log("The user is >>>", user);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // if user exists (signed in), this will fire off info to the dL with the user
        dispatch({
          type: "SET_USER",
          user: user,
        });
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    // BEM
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <>
                <Signup />
              </>
            }
          ></Route>

          <Route
            path="/"
            element={
              <>
                <Header />
                <Subheader />
                <Home />
              </>
            }
          ></Route>
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Subheader />
                <Checkout />
              </>
            }
          ></Route>
          <Route
            path="/payment"
            element={
              <>
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </>
            }
          ></Route>
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
