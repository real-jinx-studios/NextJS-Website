import { useState, useContext, createContext, useReducer } from "react";
import Cookies from "js-cookie";
import { promiseResolver } from "./promiseResolver";
import customLog from "../components/utils/customLog";
import { generateItemCustomKey } from "./checkCartItems";
import { setLocalStorageExpirationDate } from "./checkLocalStorage";

const Cart = createContext();
const emptyState = {
  username: "",
  isLoadingDefault: false,
  isAuthenticated: false,
  duePaymentId: "",
  loginToken: "",
  orderType: "standard",
  products: [],
  productsLoaded: false,
  cartLocked: false,
  isCartPreloaded: false,
  setStepToBeActive: false,
  steps: [],
  stepNumberToBeActive: 0,
  stepNumber: 0,
  maxStepNumber: 1,
  response: {},
  supportedPayments: [],
  duePaymentInfo: {
    name: "",
  },
  vat: {
    isVatAvailable: false,
    isValid: false,
    vatNumber: "",
    countryCode: "",
    vatPercentage: 0,
    country: "",
    substractVAT: true,
  },

  items: [],
  optionalProducts: [],
  freeProducts: [],

  payWhatYouWant: {
    isPayWhatYouWant: false,
    price: 0,
  },
  checkoutCountry: "",
  checkout: {
    sameAsBilling: false,
    shippableCount: 0,
    hardwareIdCount: 0,
    installmentCount: 0,
    installmentPlan: 12,
    installmentPlanFee: 0,
    billing: false,
    shipping: false,
    workstation: false,
    payments: false,
  },
  billingInfo: {
    isShippingSameAsBilling: false,
    LegalName: "",
    ContactName: "",
    Email: "",
    VAT_ID: "",
    Billing: {
      Country: "",
      City: "",
      Address: "",
      PostCode: "",
    },
  },
  shippingInfo: {
    CountryCode: "",
    Shipping: {
      Country: "",
      City: "",
      Address: "",
      RecipientName: "",
      RecipientPhone: "",
      PostCode: "",
    },
  },
  workstationIds: [],
};
let initialState = emptyState;
const loadCartState = async () => {
  try {
    const [data, error] = await promiseResolver(fetch("/api/cart/read-cart"));
    if (error) {
      customLog([error]);
    }
    if (data.status === 200) {
      const cartState = await data.json();
      initialState = {
        ...cartState,
        products: [...initialState.products],
        productsNested: [...initialState.productsNested],
      };
    } else if (data.status === 404) {
      initialState = { ...initialState };
      Cookies.remove("cartId");
    }
  } catch (e) {
    customLog([e]);
  }
};

if (Cookies.get("cartId")) {
  console.log("cartId runs");
  const fetchState = loadStateLocal();

  if (!fetchState) {
    deleteCartState();
  } else {
    initialState = fetchState;
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "SET_AUTH_STATE": {
      return {
        ...state,
        isAuthenticated: action.payload.authenticated,
        loginToken: action.payload.loginToken,
      };
    }

    case "SET_CART_DEFAULT_STATE": {
      return {
        ...action.payload,
        products: [...initialState.products],
        productsNested: [...initialState.productsNested],
      };
    }

    case "ADD_ITEM": {
      // check type of product and set the correct flags

      return state;
    }

    case "UPDATE_HARDWARE_ITEM": {
      const hardwareItems = state.hardwareItems.map((item) => {
        if (item.ProductCode !== action.payload.ProductCode) return item;

        return {
          ...action.payload,
        };
      });

      return {
        ...state,
        hardwareItems,
      };
    }

    case "UPDATE_ITEMS": {
      const newState = { ...state, items: action.payload };
      saveState(newState);
      return newState;
    }

    case "EMPTY_CART":
      return initialState;

    case "CLEAR_CART_META":
      return {
        ...state,
        metadata: {},
      };

    case "SET_CART_META":
      return {
        ...state,
        metadata: {
          ...action.payload,
        },
      };

    case "UPDATE_CART_META":
      return {
        ...state,
        metadata: {
          ...state.metadata,
          ...action.payload,
        },
      };

    case "SET_CART_BILLING":
      return {
        ...state,
        billingDetails: {
          ...action.payload,
        },
      };

    case "SET_VAT_CLEARED":
      return {
        ...state,

        metadata: {
          ...state.metadata,
          isVatCleared: action.payload,
        },
      };

    case "SET_CART_SHIPPING":
      return {
        ...state,
        shippingDetails: {
          ...action.payload,
        },
      };

    case "SET_CART_WORKSTATION":
      return {
        ...state,
        workstationIdDetails: {
          ...action.payload,
        },
      };

    case "UPDATE_INSTALLMENT_PLAN": {
      const items = state.items.map((item) => {
        if (item.paymentPlan === "installment") {
          let price = item.basePrice;
          let customKey = generateItemCustomKey(
            item.options,
            item.paymentPlan,
            action.payload + ""
          );
          if (item.product.preferences.custom.length > 0) {
            try {
              price = item.product.preferences.custom.find(
                (x) => x.key === customKey
              ).price;
            } catch (e) {
              console.log(e);
            }
          }
          return {
            ...item,
            basePrice: price,
            price: price,
            paymentOption: action.payload,
            paymentPlanDetails: item.paymentPlanDetails.map((plan) => {
              if (plan.id === "period" && plan.type === "discrete") {
                return {
                  ...plan,
                  currentValue: action.payload,
                };
              } else {
                return plan;
              }
            }),
          };
        } else {
          return item;
        }
      });
      updateStateLocal({
        ...state,
        items,
        checkout: {
          ...state.checkout,
          installmentPlan: action.payload + "",
        },
      });

      return {
        ...state,
        items,
        checkout: {
          ...state.checkout,
          installmentPlan: action.payload,
        },
      };
    }

    case "SET_CART_STATE":
      return {
        ...state,
        ...action.payload,
      };

    case "SET_STATE":
      return {
        ...state,
        ...action.payload,
      };

    case "SET_PRODUCTS":
      return {
        ...state,
        productsLoaded: true,
        products: action.payload.products,
        supportedPayments: action.payload.payments,
      };

    case "ADD_ITEM_NEW": {
      const newItem = action.payload;

      if (
        state.items.filter(
          (item) => item.productReferenceId === newItem.productReferenceId
        ).length > 0
      ) {
        return {
          ...state,
          items: state.items.map((item) => {
            if (item.productReferenceId === newItem.productReferenceId) {
              item.quantity += newItem.quantity;
            }
            return item;
          }),
        };
      }
      let checkout = { ...state.checkout };

      checkout.shippableCount += newItem.shippableCount;
      checkout.hardwareIdCount += newItem.hardwareIdCount;

      if (newItem.paymentPlan === "installment") {
        if (checkout.installmentCount === 0) {
          checkout.installmentPlan = newItem.paymentOption;
          checkout.installmentPlanFee =
            newItem.paymentTaxes.standardInstallment;
        }
        checkout.installmentCount++;
      }

      //get optional products from the newItem and add them to the cart
      const optionalProducts = newItem.optionalProducts;
      const freeProducts = newItem.freeProducts;
      const newState = {
        ...state,
        checkout: {
          ...checkout,
        },
        optionalProducts: [...state.optionalProducts, ...optionalProducts],
        freeProducts: [...state.freeProducts, ...freeProducts],
        items: [...state.items, action.payload],
      };

      return updateStateLocal(newState);
    }

    case "SET_ITEM_QUANTITY": {
      const newState = {
        ...state,
        items: state.items.map((item) => {
          if (item.productReferenceId === action.payload.productReferenceId) {
            item.quantity = action.payload.quantity;
          }
          return item;
        }),
      };
      return newState;
    }

    case "INCREMENT_ITEM": {
      const newState = {
        ...state,
        items: state.items.map((item) => {
          if (item.productReferenceId === action.payload.productReferenceId) {
            item.quantity += 1;
          }
          return item;
        }),
      };

      return updateStateLocal(newState);
    }
    case "DECREMENT_ITEM": {
      const newState = {
        ...state,
        items: state.items.map((item) => {
          if (item.productReferenceId === action.payload.productReferenceId) {
            item.quantity -= 1;
          }
          return item;
        }),
      };

      return updateStateLocal(newState);
    }

    case "UPDATE_PRICE": {
      const newState = {
        ...state,
        items: state.items.map((item) => {
          if (item.productReferenceId === action.payload.productReferenceId) {
            item.price = action.payload.price;
          }
          return item;
        }),
      };

      return updateStateLocal(newState);
    }

    case "UPDATE_ITEM": {
      const newProductReferenceId = action.payload.newProductReferenceId;
      const newItem = action.payload.item;

      let shippableCount = 0;
      let hardwareIdCount = 0;

      const items = state.items.map((item) => {
        if (item.productReferenceId !== newItem.productReferenceId) {
          shippableCount += item.shippableCount;
          hardwareIdCount += item.hardwareIdCount;
          return item;
        }

        shippableCount += newItem.shippableCount;
        hardwareIdCount += newItem.hardwareIdCount;

        return {
          ...newItem,
          productReferenceId: newProductReferenceId,
        };
      });

      let checkout = { ...state.checkout };
      let installmentCount = 0;
      items.forEach((item) => {
        if (item.paymentPlan === "installment") {
          if (installmentCount === 0) {
            checkout.installmentPlan = item.paymentOption;
            checkout.installmentPlanFee = item.paymentTaxes.standardInstallment;
          }
          installmentCount++;
        }
      });

      if (installmentCount === 0) {
        checkout.installmentPlan = "";
        checkout.installmentPlanCount = 0;
      }
      checkout.installmentCount = installmentCount;

      checkout.shippableCount = shippableCount;
      checkout.hardwareIdCount = hardwareIdCount;

      updateStateLocal({
        ...state,
        items,
        checkout: {
          ...checkout,
        },
      });

      return updateStateLocal({
        ...state,
        items,
        checkout: {
          ...checkout,
        },
      });
    }

    case "REMOVE_ITEM": {
      const itemToRemove = state.items.find(
        (item) => item.productReferenceId === action.payload
      );
      const isInstallment = itemToRemove.paymentPlan === "installment";
      const newState = {
        ...state,
        checkout: {
          ...state.checkout,
          shippableCount:
            state.checkout.shippableCount - itemToRemove.shippableCount,
          hardwareIdCount:
            state.checkout.hardwareIdCount - itemToRemove.hardwareIdCount,
          installmentCount: isInstallment
            ? state.checkout.installmentCount - 1
            : state.checkout.installmentCount,
        },
        items: state.items.filter(
          (item) => item.productReferenceId !== action.payload
        ),
      };
      if (newState.items.length === 0) {
        deleteCartStatePartial();
        return emptyState;
      }
      return updateStateLocal(newState);
    }
    case "SET_VAT": {
      const newState = {
        ...state,
        vat: {
          ...state.vat,
          ...action.payload.vat,
        },
      };
      return newState;
    }
    case "SET_CART_BILLING_COUNTRY_AND_VAT":
      return {
        ...state,
        billingDetails: {
          ...state.billingDetails,
          Country: action.payload.country,
        },
        vat: {
          ...state.vat,
          ...action.payload,
        },
      };

    case "SET_SHIPPING_INFO_COUNTRY_CODE": {
      return {
        ...state,
        shippingInfo: {
          ...state.shippingInfo,
          CountryCode: action.payload.code,
        },
      };
    }
    case "SET_SHIPPING_SAME_AS_BILLING": {
      return {
        ...state,
        billingInfo: {
          ...state.billingInfo,
          isShippingSameAsBilling: action.payload,
        },
      };
    }

    case "CLEAR_CART":
      deleteCartStatePartial();
      return {
        ...emptyState,
        vat: state.vat,
      };

    case "SET_STEP_VALID":
      //filter through state.steps and set the step to valid if it matches the action.payload.step

      const newSteps = state.steps.map((step) => {
        if (step.id === action.payload.stepName) {
          step.isValid = action.payload.isValid;
        }
        return step;
      });

      return {
        ...state,
        steps: newSteps,
        checkout: {
          ...state.checkout,
          [action.payload.stepName]: action.payload.isValid,
        },
      };

    case "SET_BILLING_INFO":
      return {
        ...state,

        billingInfo: {
          ...state.billingInfo,
          ...action.payload.billingDetails,
        },
      };
    case "SET_SHIPPING_INFO":
      return {
        ...state,
        shippingInfo: {
          ...state.shippingInfo,
          ...action.payload,
        },
      };

    case "SET_WORKSTATION_IDS":
      let updatedItems = [];
      const workstationIdsPayload = action.payload;
      updatedItems = state.items.map((item) => {
        Object.keys(workstationIdsPayload).forEach((key) => {
          if (
            item.productReferenceId ===
            workstationIdsPayload[key].productReferenceId
          ) {
            if (workstationIdsPayload[key].hardwareID !== "") {
              item.hardwareIds.push(workstationIdsPayload[key].hardwareID);
            }
          }
        });
        return item;
      });
      updatedItems = [...new Set(updatedItems)];

      return {
        ...state,
        items: [...updatedItems],
        workstationIds: {
          ...state.workstationIds,
          ...action.payload,
        },
      };

    case "CLEAR_WORKSTATION_IDS":
      return {
        ...state,
        workstationIds: [],
      };
    case "SET_CART_LOCKED":
      return {
        ...state,
        cartLocked: action.payload,
      };

    case "ADD_STEP": {
      return {
        ...state,
        steps: [...action.payload],
      };
    }

    case "INCREMENT_STEP":
      return {
        ...state,
        stepNumber: state.stepNumber + 1,
      };
    case "DECREMENT_STEP": {
      if (state.stepNumber > 0) {
        return {
          ...state,
          stepNumber: state.stepNumber - 1,
        };
      }
      return state;
    }

    case "SET_STEP_TO_BE_ACTIVE": {
      return {
        ...state,
        setStepToBeActive: true,
        stepNumberToBeActive: action.payload,
      };
    }

    case "SET_STEP": {
      return {
        ...state,
        setStepToBeActive: false,
        stepNumber: state.stepNumberToBeActive,
      };
    }

    case "SAVE_RESPONSE":
      return {
        ...state,
        response: action.payload,
      };

    case "SET_CHECKOUT_STEPS_LENGTH":
      if (state.items.length === 0) {
        deleteCartStatePartial();
        return emptyState;
      }
      return {
        ...state,
        checkoutStepsLength: action.payload,
      };

    case "SET_DUE_PAYMENTS":
      let checkout = { ...state.checkout };

      return {
        ...state,
        checkout: {
          ...checkout,
        },
        orderType: "duePayment",
        duePaymentId: action.payload.OrderId,
        duePaymentInfo: {
          name: action.payload.Name,
        },
        isCartPreloaded: true,
        items: [],
      };

    case "FIX_OPTIONAL_ITEMS_IN_CART":
      let items = [...state.items];
      let optionalProducts = [];
      items.forEach((item) => {
        item.optionalProducts.forEach((optionalProduct) => {
          optionalProducts.push(optionalProduct.id);
        });
      });
      optionalProducts = [...new Set(optionalProducts)];
      let newItems = [];
      items.forEach((item) => {
        if (!optionalProducts.includes(item.id)) {
          newItems.push(item);
        }
      });
      return {
        ...state,
        items: newItems,
      };

    case "SET_CUSTOM_PAYMENT":
      return {
        ...state,
        orderType: "customPayment",
        isCartPreloaded: true,
      };

    case "SET_CART_PRELOADED":
      return {
        ...state,
        isCartPreloaded: action.payload,
      };

    case "COMPLETE_PURCHASE":
      deleteCartState();
      return emptyState;

    case "SET-PAY-WHAT-YOU-WANT":
      return {
        ...state,
        payWhatYouWant: action.payload,
      };

    case "SET-CHECKOUT-COUNTRY":
      return {
        ...state,
        checkoutCountry: action.payload,
      };

    case "SET_ORDER_ID":
      return {
        ...state,
        orderId: action.payload,
      };

    case "SET_ORDER_PROCESSING": {
      return {
        ...state,
        checkout: {
          ...state.checkout,
          orderProcessing: action.payload,
        },
      };
    }

    default:
      return state;
  }
}

export const CartContext = ({ children }) => {
  const [cState, dispatch] = useReducer(cartReducer, initialState);
  return <Cart.Provider value={{ cState, dispatch }}>{children}</Cart.Provider>;
};

export const cartState = () => {
  return useContext(Cart);
};

export const saveState = async (state) => {
  //create unique id for cart state
  const id = new Date().getTime();

  //save cart state to local storage
  const serializedState = JSON.stringify(state);
  try {
    localStorage.setItem(`cart-${id}`, serializedState);
  } catch (e) {
    customLog([e]);
  }
  //call api to save state to db
  try {
    const [data, error] = await promiseResolver(
      fetch("/api/cart/save-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: serializedState,
      })
    );
    if (error) {
      customLog([error]);
    }
    if (data.status === 200) {
      const cartId = await data.json();
      //save id to cookie for reference
      Cookies.set("cartId", cartId.cartId);
      //remove state from localStorage
      localStorage.removeItem(`cart-${id}`);
    }
  } catch (e) {
    customLog([e]);
  }
};
//save state to local storage
export const saveStateLocal = (state) => {
  if (Cookies.get("cartId")) {
    updateStateLocal(state, Cookies.get("cartId"));
    return;
  }
  const cartId = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "");

  //save cookie for reference
  Cookies.set("cartId", cartId);
  //get username from session storage from user object
  const username = JSON.parse(sessionStorage.getItem("user")).uInfo.SiteUser;

  state.username = username;

  //save cart state to local storage
  const serializedState = JSON.stringify(state);
  try {
    localStorage.setItem(`cart-${cartId}`, serializedState);
  } catch (e) {
    customLog([e]);
  }
};

//load state from local storage
export function loadStateLocal() {
  const cartId = Cookies.get("cartId");
  if (cartId) {
    const serializedState = localStorage.getItem(`cart-${cartId}`);
    if (serializedState && sessionStorage.getItem("user")) {
      const parsedUser = JSON.parse(sessionStorage.getItem("user"));
      const parsedState = JSON.parse(serializedState);
      const username = parsedUser?.uInfo?.SiteUser;
      if (username && parsedState.username === username) {
        console.log(
          "cart state loaded from local storage",
          username,
          parsedState.username
        );
        return parsedState;
      } else {
        //delete cart state from local storage
        localStorage.removeItem(`cart-${cartId}`);
        //delete cart id from cookie
        Cookies.remove("cartId");
      }
    }
  }
  return;
}

function updateStateLocal(state) {
  const cartId = Cookies.get("cartId");

  if (cartId) {
    const serializedState = JSON.stringify(state);
    try {
      localStorage.setItem(`cart-${cartId}`, serializedState);
    } catch (e) {
      customLog([e]);
    }
  }
  return state;
}

function deleteCartState() {
  if (Cookies.get("cartId")) {
    localStorage.removeItem(`cart-${Cookies.get("cartId")}`);

    Cookies.remove("cartId");
  }
  localStorage.removeItem(`products`);
}

function deleteCartStatePartial() {
  if (Cookies.get("cartId")) {
    localStorage.removeItem(`cart-${Cookies.get("cartId")}`);

    Cookies.remove("cartId");
  }
}
