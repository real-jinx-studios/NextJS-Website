export default async function redirect(url, type, body) {
  const res = await fetch(
    "http://" + process.env.BACKEND_HOST + "/kmweb" + url,
    {
      method: type,
      headers: {
        "Expected-Server-Version": "1.0.1",
      },
      body: body,
    }
  );

  return res;
}
