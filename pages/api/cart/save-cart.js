import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const cartId = req.cookies.cartId;
  let cart = req.body;
  if (!cartId) {
    //generate random string for cartId
    const cartId = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "");
    //read json file from the public folder and append new entry to it
    let cartFile = await fs.readFile(
      `cart.json`,
      "utf-8",
      async (err, data) => {
        if (err) {
          res.status(500).json({ error: err.toString() });
          return;
        }

        cart.cartId = cartId;

        let cartArray = JSON.parse(data);

        cartArray.cart.push(cart);

        //write cart data in json format to a json file in the public folder
        const cartJson = JSON.stringify(cartArray);
        await fs.writeFile(`cart.json`, cartJson, (err) => {
          if (err) {
            res.status(500).json({ error: err.toString(), cart: "what" });
            return;
          }
        });

        res.status(200).json({ cartId });
        return;
      }
    );
  } else {
    try {
      await updateCart(cartId, cart);
      res.status(200).json({ cartId });
    } catch (err) {
      res.status(500).json({ error: err.toString() });
      return;
    }
  }
}

async function updateCart(cartId, newCart) {
  //read json file from the public folder and append new entry to it
  let cartFile = await fs.readFile(`cart.json`, "utf-8", async (err, data) => {
    if (err) throw err;

    let cartArray = JSON.parse(data);
    //replace object in array based on object id attribute return new array
    cartArray.cart = cartArray.cart.map((c) =>
      c.cartId === cartId ? newCart : c
    );
    cartArray = JSON.stringify(cartArray);

    fs.writeFile(`cart.json`, cartArray, (err) => {
      if (err) throw err;
    });
  });
}
