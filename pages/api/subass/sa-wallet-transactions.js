export default async function handler(req, res) {
  const redirect = await fetch(
    "http://nodejs-vm.elf.local/kmweb/SubtitlingAssistant/sa-wallet-transactions",
    {
      method: req.method,
      headers: {
        "Expected-Server-Version": "1.0.1",
      },
      body: req.body,
    }
  );

  if (redirect.status === 200) {
    res.status(200).send("success");
    return;
  }
  res.status(redirect.status).send(redirect.statusText);
}
