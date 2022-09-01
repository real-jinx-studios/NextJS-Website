import customLog from "../components/utils/customLog";

var soap = require("soap");
const url = "https://ec.europa.eu/taxation_customs/vies/checkVatService.wsdl";

var args = { countryCode: "FR", vatNumber: "96539474064" };

export async function sp() {
  soap.createClient(url, function (err, client) {
    client.MyFunction(args, function (err, result) {
      customLog([result]);
    });
  });
}
