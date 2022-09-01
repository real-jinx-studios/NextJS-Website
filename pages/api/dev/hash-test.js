export default async function handler(req, res) {
  const { randomBytes } = require("crypto");
  if (req.method === "GET") {
    const random_bytes = await randomBytes(32);
    const hexedBytes = random_bytes.toString("hex");
    res.status(200).json({ randomBytes: random_bytes, hexedBytes: hexedBytes });
  }
}
