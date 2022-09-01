export default async function handler(req, res) {
  //always return failure
  res.status(400).json({ result: "failed" });
}
