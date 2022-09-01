export default function quantityMultiplierTable(
  quantity = 1,
  quantityMultiplierTable = []
) {
  let multiplierTable = quantityMultiplierTable;

  const multiplierTableKeys = Object.keys(multiplierTable);
  const multiplierTableValues = Object.values(multiplierTable);

  const multiplierTableKeysLength = multiplierTableKeys.length;
  const multiplierTableValuesLength = multiplierTableValues.length;

  if (multiplierTableKeysLength !== multiplierTableValuesLength) {
    throw new Error(
      "quantityMultiplierTable: multiplierTable keys and values must have the same length"
    );
  }

  let quantityMultiplier = 1;

  for (let i = 0; i < multiplierTableKeysLength; i++) {
    if (multiplierTableKeys[i] == -1) {
      multiplierTableKeys[i] = Infinity;
    }

    if (quantity <= multiplierTableKeys[i]) {
      quantityMultiplier = multiplierTableValues[i];
      break;
    }
  }

  return quantityMultiplier;
}

export function formatMultiplierTable(quantityMultiplierTable) {
  let multiplierTable = {};

  quantityMultiplierTable.forEach((multiplierObject) => {
    //set the key to the quantity and the value to the multiplier
    multiplierTable[multiplierObject.lessThan] = multiplierObject.multiplier;
  });

  return multiplierTable;
}
