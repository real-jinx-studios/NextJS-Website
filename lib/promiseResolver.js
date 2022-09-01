import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export async function promiseResolver(promise, options, router) {
  if (options?.endpoint) {
    if (process.env.NEXT_PUBLIC_IS_DEVELOPMENT) {
      toast.warn("API call to: " + options?.endpoint, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  }
  try {
    const data = await promise;
    if (data?.status === 500) {
      if (process.env.NEXT_PUBLIC_IS_DEVELOPMENT) {
        toast.error("internal server error from promise resolver", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    }
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

//usage example
//const [data, error] = await promiseResolver(whateverNeedsToBeAwaited);
