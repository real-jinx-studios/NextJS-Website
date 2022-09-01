import { useDebugValue, useEffect, useState } from "react";

export default function usePriceConverter() {
  const [formattedPrice, setFormattedPrice] = useState("0");

  function formatNumber(unformattedNumber) {
    return unformattedNumber
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function formatNumberToCurrency(defaultNumber) {
    // appends $ to value, validates decimal side

    let input_val = formattedNumber;

    let original_len = input_val.length;

    // check for decimal
    if (input_val.indexOf(".") >= 0) {
      // get position of first decimal
      // this prevents multiple decimals from
      // being entered
      let decimal_pos = input_val.indexOf(".");

      // split number by decimal point
      let left_side = input_val.substring(0, decimal_pos);
      let right_side = input_val.substring(decimal_pos);

      // add commas to left side of number
      left_side = formatNumber(left_side);

      // validate right side
      right_side = formatNumber(right_side);

      // On blur make sure 2 numbers after decimal
      right_side += "00";

      // Limit decimal to only 2 digits
      right_side = right_side.substring(0, 2);

      // join number by .
      input_val = "€" + left_side + "." + right_side;
    } else {
      // no decimal entered
      // add commas to number
      // remove all non-digits
      input_val = formatNumber(input_val);
      input_val = "€" + input_val;

      // final formatting

      input_val += ".00";
    }

    // send updated string to input
    setFormattedPrice(input_val);
  }

  //for react dev tools to debug stuff
  useDebugValue(formattedPrice ?? "loading...");

  return [formattedPrice, formatNumberToCurrency];
}
