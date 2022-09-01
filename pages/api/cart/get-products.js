import fs from "fs";
import path from "path";
import { read } from "../../../lib/fileManipulation";

export default function handler(req, res) {
  //read json file from the public folder and return the data and fetch record based on user id
  const products = read("products.json");

  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ result: "not found" });
  }
}
