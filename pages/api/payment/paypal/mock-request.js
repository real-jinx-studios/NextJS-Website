import { promiseResolver } from "../../../../lib/promiseResolver";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    console.log(JSON.stringify(body, null, 5), "body");

    if (body.paymentMethod === "paypal") {
      res.status(400).json({ result: "failed" });
    } else if (body.paymentMethod === "credit") {
      res.status(200).json({ result: "success" });
    } else {
      res.status(400).json({ result: "failed" });
    }
  }
}
