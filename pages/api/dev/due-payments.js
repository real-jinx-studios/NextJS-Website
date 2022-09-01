import guidGenerator from "../../../lib/uuid";

export default function handler(req, res) {
  if (req.method === "POST") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        Payments: [
          {
            OrderType: "duePayment",
            OrderId: guidGenerator(),
            Items: [
              {
                ProductId: "SAToken",
                Name: "Subtitling assistant tokens",
                ProductOptions: {},
                PaymentPlan: "lifetime",
                PaymentPlanOptions: {},
                WorkstationIds: [],
                OptionalProducts: [],
                FreeProducts: [],
                Quantity: 2500,
                Price: {
                  UnitPrice: 50,
                  VAT: 0,
                },
              },
            ],
          },
          {
            OrderType: "duePayment",
            OrderId: guidGenerator(),
            Items: [
              {
                ProductId: "EZTitles",
                Name: "EZTitles",
                ProductOptions: {
                  licenseType: "ultimate",
                },
                PaymentPlan: "installment",
                PaymentPlanOptions: {
                  period: "36",
                },
                WorkstationIds: [],
                OptionalProducts: [],
                FreeProducts: ["HardwareKey"],
                Quantity: 1,
                Price: {
                  UnitPrice: 24500,
                  VAT: 0,
                },
              },
            ],
          },
        ],
      })
    );
  }
}
