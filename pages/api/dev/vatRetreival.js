const soap = require("soap");
const url =
  "https://ec.europa.eu/taxation_customs/tedb/ws/VatRetrievalService.wsdl";
//valid vat for debug FR 96539474064
export default async function handler(req, res) {
  const args = {
    memberStates: [{ isoCode: "FR" }],

    situationOn: "2016-01-01",
  };
  return new Promise((resolve, reject) => {
    soap
      .createClientAsync(url, { overridePromiseSuffix: "Promise" })
      .then((client) => {
        console.log("client", client);
        console.log(JSON.stringify(client));
        client.retrieveVatRatesReqMsg(args, function (err, result) {
          res.status(200).json({ result, err });
          resolve();
        });
      })
      .catch((e) => {
        res.status(418).json({ message: "something i didnt handle broke", e });
        resolve();
      });
  });
}
