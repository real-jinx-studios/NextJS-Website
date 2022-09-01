export default function calculateInstallmentFee(
  installmentProductsTotalPrices = [46500, 277500],
  installmentPlan = 12,
  fixedFee = 7
) {
  const numberOfInstallments = installmentPlan / 3;
  const productPriceTimesNumberOfInstallments =
    installmentProductsTotalPrices.map(
      (price) => Math.round((price * numberOfInstallments) / 100) * 100
    );
  const feeTimesNumberOfInstallmentsMinusOne =
    fixedFee * (numberOfInstallments - 1);
  const sumOfProductPricesAndFee =
    productPriceTimesNumberOfInstallments.reduce((a, b) => a + b) +
    feeTimesNumberOfInstallmentsMinusOne;
  const standardInstallment =
    Math.round(sumOfProductPricesAndFee / installmentPlan / 100) * 100;
  const firstStandardInstallment =
    sumOfProductPricesAndFee - (installmentPlan - 1) * standardInstallment;

  const firstsActualInstallment =
    firstStandardInstallment + 2 * standardInstallment;
  const installmentFee =
    firstsActualInstallment -
    installmentProductsTotalPrices.reduce((a, b) => a + b);
  //console log everything
  console.log(
    "installmentFee",
    installmentFee,
    "installmentProductsTotalPrices",
    installmentProductsTotalPrices,
    "installmentPlan",
    installmentPlan,
    "fixedFee",
    fixedFee,
    "numberOfInstallments",
    numberOfInstallments,
    "productPriceTimesNumberOfInstallments",
    productPriceTimesNumberOfInstallments,
    "feeTimesNumberOfInstallmentsMinusOne",
    feeTimesNumberOfInstallmentsMinusOne,
    "sumOfProductPricesAndFee",
    sumOfProductPricesAndFee,
    "standardInstallment",
    standardInstallment,
    "firstStandardInstallment",
    firstStandardInstallment,
    "firstsActualInstallment",
    firstsActualInstallment
  );

  return {
    fee: installmentFee,
    fSt: firstStandardInstallment,
    firstInstallment: firstsActualInstallment,
  };
}
