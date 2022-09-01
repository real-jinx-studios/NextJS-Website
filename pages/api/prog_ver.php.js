export default async function handler(req, res) {
  try {
    const results = "php -r \"echo json_encode(array('version' => '1.0.0'));\"";
    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
