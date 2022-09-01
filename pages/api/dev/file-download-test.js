const fs = require("fs").promises;
const https = require("https");

export default async function handler(req, res) {
  const filePath = "https://nextjsstorage.blob.core.windows.net/test-files/";
  const fileName = req.body.name;
  const uri = filePath.concat(fileName);
}
