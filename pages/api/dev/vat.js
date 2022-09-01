const soap = require("soap");
const url = "https://ec.europa.eu/taxation_customs/vies/checkVatService.wsdl";
//valid vat for debug FR 96539474064 / SE 969772860901
export default async function handler(req, res) {
  const vat = JSON.parse(req.body).vat;
  const countryCode = JSON.parse(req.body).countryCode;
  const args = { countryCode, vatNumber: vat };
  console.log(req.body);
  return new Promise((resolve, reject) => {
    soap
      .createClientAsync(url, { overridePromiseSuffix: "Promise" })
      .then((client) => {
        client.checkVat(args, function (err, result) {
          res.status(200).json({ valid: result.valid });
          resolve();
        });
      })
      .catch((e) => {
        res.status(418).json({ message: "something i didnt handle broke" });
        resolve();
      });
  });
}
