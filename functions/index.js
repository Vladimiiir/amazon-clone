const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Lzk9UJoJ8eS77pj3STarUS2LEUcbIKlbtmdoC6FNaJ5ctcdTvLvsdNNY6GHtNaXWpoPPRLWkoJ9FF2QYMHlgWab00al9sgDQh"
);

// API

// - App Config : creating Express.js app ----
const app = express();
// -------------------------------------------

// - Middlewares -----------------------------
app.use(cors({ origin: true }));
// allows req from any origin
app.use(express.json());
// allows us to parse incoming req in json format
// -------------------------------------------

// - API Routes ------------------------------
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment Request Recieved for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// -------------------------------------------

// - Listen command --------------------------
exports.api = functions.https.onRequest(app);
// -------------------------------------------
