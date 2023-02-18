import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import "./Orders.css";
import Subheader from "./Subheader";
import Order from "./Order";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      onSnapshot(
        query(
          collection(db, `users/${user.uid}/orders`),
          orderBy("created", "desc")
        ),
        (snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        }
      );
    } else {
      setOrders([]);
      // navigate("../login", { replace: true });
    }
  }, [user]);

  return (
    <>
      <Subheader />
      <div className="orders">
        <h1>Your Orders</h1>
        <div className="orders__order">
          {orders?.map((order) => (
            <Order order={order} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Orders;
