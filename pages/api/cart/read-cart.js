import fs from "fs";
import path from "path";
import { read } from "../../../lib/fileManipulation";

export default function handler(req, res) {
  //read json file from the public folder and return the data and fetch record based on user id
  const cartId = req.cookies.cartId;
  const cartData = read("cart.json");
  const userCart = cartData.cart.filter((c) => c.cartId === cartId);
  if (userCart[0]) {
    res.status(200).json(userCart[0]);
  } else {
    res.status(404).json({ result: "not found" });
  }
}
