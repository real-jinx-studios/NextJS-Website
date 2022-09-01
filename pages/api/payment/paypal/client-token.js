const base = "https://api-m.sandbox.paypal.com";
const CLIENT_ID =
  "AbPfHl4rmjuW5fptWJJec7Vx9_VqCUxsqR48RSTepYhyE9dcYDsimVGgontvstnHOcrYZBE6WPMglcR3";
const APP_SECRET =
  "EB1fy5C1LBA-9XG8yg4ccUWyrP19cdQJjqU-8y17pprYPNycNx2Yxfj4Nyg1MkY3Vo4RPbk9jqyq0xis";
export default async function handler(req, res) {
  const { method, body } = req;
  console.log("get token");

  if (method === "GET") {
    //get client token
    const clientToken = await generateClientToken();
    res.json({ clientToken });
  }
}

async function generateClientToken() {
  const accessToken = await generateAccessToken();

  const response = await fetch(`${base}/v1/identity/generate-token`, {
    method: "post",

    headers: {
      Authorization: `Bearer ${accessToken}`,

      "Accept-Language": "en_US",

      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data, "client token");

  return data.client_token;
}

export async function generateAccessToken() {
  const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");

  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "post",

    body: "grant_type=client_credentials",

    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const data = await response.json();
  console.log(data, "access token function");

  return data.access_token;
}
