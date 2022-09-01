export default function handler(req, res) {
  const timestamp = JSON.parse(req.body.timestamp);

  const isValid = new Date(timestamp).getTime() > 0;

  res.status(200).json({
    timestamp: timestamp,
    message: isValid,
    generated_date: generated_date,
    parsed: parsed,
  });
}
