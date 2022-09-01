import customLog from "../../../components/utils/customLog";
import redirect from "../../../lib/redirectService";
let apiCalls = 0;
export default async function relay(req, res) {
  const { apiEndpoint } = req.query;
  apiCalls++;
  customLog(
    [
      "apiEndpoint",
      apiEndpoint[0],
      apiEndpoint[1],
      req.query,
      apiCalls,
      new Date(Date.now()).toLocaleString(),
    ],

    "log"
  );

  const relayResponse = await redirect(
    "/" + apiEndpoint[0] + "/" + apiEndpoint[1],
    req.method,
    req.body
  );

  res.status(relayResponse.status).send(relayResponse.body);
}
