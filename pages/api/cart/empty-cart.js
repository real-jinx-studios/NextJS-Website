import fs from "fs";
import path from "path";
export default async function handler(req, res) {
  //update cart data in json format in a json file in the public folder based on id
  const uid = req.body.uid; //maybe no need for uid cart alrady contains it

  //read json file from the public folder and remove an entry from it
  let cartFile = await fs.readFile(`cart.json`, "utf-8", async (err, data) => {
    if (err) throw err;
    console.log(data);

    let cartArray = JSON.parse(data);
    //remove object in array based on object id attribute return new array
    cartArray.cart = cartArray.cart.filter((c) => c.id !== uid);
    cartArray = JSON.stringify(cartArray);

    fs.writeFile(`cart.json`, cartArray, (err) => {
      if (err) throw err;
      res.json(cartArray);
    });
  });
}
