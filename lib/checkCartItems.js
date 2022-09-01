export function checkIfShippable(
  preferences,
  selectedOptions,
  paymentPlan,
  paymentOption,
  selectedOptionalProducts,
  freeProducts
) {
  let shipCount = 0;
  let customKey = generateItemCustomKey(
    selectedOptions,
    paymentPlan,
    paymentOption
  );

  if (!preferences.custom.length > 0) {
    if (preferences.defaults?.shippable) {
      shipCount++;
    }
  } else if (preferences?.custom?.find((x) => x.key === customKey).shippable) {
    shipCount++;
  } else if (preferences?.defaults?.shippable) {
    shipCount++;
  }

  selectedOptionalProducts.forEach((item) => {
    if (item.shippable) {
      shipCount++;
    }
  });

  freeProducts.forEach((item) => {
    if (item.shippable) {
      shipCount++;
    }
  });

  return shipCount;
}

export function checkIfHardwareIdRequired(
  preferences,
  selectedOptions,
  paymentPlan,
  paymentOption,
  selectedOptionalProducts,
  freeProducts
) {
  let hardwareIdRequiredCount = 0;
  let customKey = generateItemCustomKey(
    selectedOptions,
    paymentPlan,
    paymentOption
  );

  if (!preferences.custom.length > 0) {
    if (preferences.defaults?.workstationId) {
      hardwareIdRequiredCount++;
    }
  } else if (
    preferences?.custom?.find((x) => x.key === customKey).workstationId
  ) {
    hardwareIdRequiredCount++;
  } else if (preferences?.defaults?.workstationId) {
    hardwareIdRequiredCount++;
  }

  selectedOptionalProducts.forEach((item) => {
    if (item.workstationId) {
      hardwareIdRequiredCount++;
    }
  });
  freeProducts.forEach((item) => {
    if (item.workstationId) {
      hardwareIdRequiredCount++;
    }
  });

  return hardwareIdRequiredCount;
}

export function checkFreeProducts(
  preferences,
  selectedOptions,
  paymentPlan,
  paymentOption,
  selectedOptionalProducts
) {
  let fProducts = [];
  let customKey = generateItemCustomKey(
    selectedOptions,
    paymentPlan,
    paymentOption
  );

  if (!preferences.custom.length > 0) {
    if (preferences.defaults?.free) {
      freeCount++;
    }
  } else if (preferences?.custom?.find((x) => x.key === customKey).free) {
    freeCount++;
  } else if (preferences?.defaults?.free) {
    freeCount++;
  }

  selectedOptionalProducts.forEach((item) => {
    if (item.free) {
      freeCount++;
    }
  });

  return freeCount;
}

export function generateItemCustomKey(
  selectedOptions,
  paymentPlan,
  paymentOption
) {
  if (selectedOptions) {
    return JSON.stringify({
      ...selectedOptions,
      supportedPayments: [
        paymentPlan + (paymentOption.length > 0 ? "_" + paymentOption : ""),
      ],
    });
  }

  return JSON.stringify({
    supportedPayments: [
      paymentPlan + (paymentOption.length > 0 ? "_" + paymentOption : ""),
    ],
  });
}
