import { useState } from "react";
import priceFormatter from "../utils/priceFormatter";
import { cartState } from "../../lib/cartContext";
import { useProducts } from "../../lib/productsContext";
export default function OptionalProduct({
  product,
  hasPresets,
  presetProduct,
  setSelectedOptionalProducts,
}) {
  const { cState, dispatch } = cartState();
  const { getProduct } = useProducts();

  const { preferences, options, name, id, supportedPayments } =
    getProduct(product) || {};
  const [checked, setChecked] = useState(() => {
    if (hasPresets) {
      return presetProduct.optionalProducts.find((p) => p.id === id)
        ? true
        : false;
    }
    return false;
  });
  const [currentPrice, setCurrentPrice] = useState(() => {
    if (
      preferences.custom.length > 0 &&
      product.options &&
      product.options.length > 0
    ) {
      if (
        JSON.stringify({
          [product.options[0].id]: [product.options[0].values[0].id],
          supportedPayments: [product.supportedPayments[0]],
        }) in preferences.custom &&
        preferences.custom[
          JSON.stringify({
            [product.options[0].id]: [product.options[0].values[0].id],
            supportedPayments: [product.supportedPayments[0]],
          })
        ].price
      )
        return preferences.custom[
          JSON.stringify({
            [product.options[0].id]: [product.options[0].values[0].id],
            supportedPayments: [product.supportedPayments[0]],
          })
        ].price;
    }
    return preferences.defaults.price;
  });

  const handleChange = (e) => {
    setChecked(!checked);
    if (e.target.checked) {
      setSelectedOptionalProducts((prev) => [
        ...prev,
        {
          id,
          name,
          price: currentPrice,
          quantity: 1,
          shippable: preferences.defaults.shippable,
          workstationId: preferences.defaults.workstationId,
        },
      ]);
    } else {
      // remove from selected optional products
      setSelectedOptionalProducts((prev) => {
        const newa = prev.filter((p) => p.id !== id);
        return newa;
      });
    }
  };

  return (
    <div key={product.id + product.name}>
      <style jsx>{``}</style>

      <input
        type="checkbox"
        id="special"
        name={`special-${name}`}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={`special-${name}`}>
        Add {name} for {priceFormatter(currentPrice)} w/o VAT
      </label>
    </div>
  );
}
