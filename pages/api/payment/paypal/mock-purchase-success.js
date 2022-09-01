import { read } from "../../../../lib/fileManipulation";
import { promiseResolver } from "../../../../lib/promiseResolver";
export default async function handler(req, res) {
  const cartId = req.cookies.cartId;
  const uat = req.cookies.uat;
  const userInfo = req.body;

  const cartData = read("cart.json");
  const userCart = cartData.cart.filter((c) => c.cartId === cartId);
  const paymentObject = makePaymentApiCall(userCart);

  const [data, error] = await finalAPIcall(
    paymentObject,
    userInfo,
    cartId,
    uat
  );
  if (paymentObject) {
    res.status(200).json({ paymentObject });
    return;
  }
  res.status(400).json({ result: "failed" });
}

function makePaymentApiCall(userCart) {
  const paymentObject = calculatePricesOfItems(userCart);
  return paymentObject;
}

function calculatePricesOfItems(userCart) {
  const productData = read("products.json");
  //fetch the product prices from productData and match them to items in userCart and return the total price
  const individualPrices = userCart[0].items.map((item) => {
    const product = productData.products.find(
      (p) => p.ProductCode === item.ProductCode
    );

    return {
      ProductCode: item.ProductCode,
      ProductName: product.ProductName,
      Price:
        item.License === "Purchase"
          ? product.baseProductPrice
          : product.baseRentalPrice,
      Quantity: item.Quantity,
      License: item.License,
      Duration: item.Duration,
      TotalItemPrice: Math.abs(
        item.License === "Purchase"
          ? product.baseProductPrice * item.Quantity
          : product.baseRentalPrice * item.Quantity * item.Duration
      ),
    };
  });
  return {
    individualPrices,
    total: individualPrices.reduce((acc, curr) => acc + curr.TotalItemPrice, 0),
  };
}

async function finalAPIcall(paymentObject, userInfo, cartId, uat) {
  //make api call to nodejs-vm-api to save the paymentObject to the database
  const purchasedItems = paymentObject.individualPrices.filter(
    (item) => item.License === "Purchase"
  );
  const rentalItems = paymentObject.individualPrices.filter(
    (item) => item.License === "Rental"
  );

  if (purchasedItems.length > 0) {
    const [data, error] = await promiseResolver(
      fetch("/api/rest/WebSite/purchase-complete", {
        method: "POST",
        body: JSON.stringify({
          Details: {
            Subtotal: paymentObject.total,
            VAT: 0,
            Total: paymentObject.total,
            Items: purchasedItems.map((item) => {
              return {
                ProductCode: item.ProductCode,
                ProductName: item.ProductName,
                UnitPrice: item.Price,
                Quantity: item.Quantity,
                Amount: item.TotalItemPrice,
              };
            }),
          },
          userInfo,
          LoginToken: uat,
        }),
      })
    );
    if (error) {
      console.log(error, "purchase");
    }
    if (data.status !== 200) {
      const err = await data.text();
      console.log(err, "purchase");
    }
    if (data.status === 200) {
      console.log("success purchase");
    }
  }

  if (rentalItems.length > 0) {
    const [data, error] = await promiseResolver(
      fetch("http://nodejs-vm.elf.local/kmweb/WebSite/rent-complete", {
        method: "POST",
        headers: {
          "Expected-Server-Version": "1.0.1",
        },
        body: JSON.stringify({
          Details: {
            Subtotal: paymentObject.total,
            VAT: 0,
            Total: paymentObject.total,
            Items: rentalItems.map((item) => {
              return {
                ProductCode: item.ProductCode,
                ProductName: item.ProductName,
                UnitPrice: item.Price,
                Quantity: item.Quantity,
                Period: item.Duration,
                Amount: item.TotalItemPrice,
              };
            }),
          },
          userInfo,
          LoginToken: uat,
        }),
      })
    );
    if (error) {
      console.log(error, "rental");
    }
    if (data.status !== 200) {
      const err = await data.text();
      console.log(err, "purchase");
    }
    if (data.status === 200) {
      console.log("success rental");
    }
  }

  return ["data", null];
}
