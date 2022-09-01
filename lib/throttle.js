export default function throttle(fn, delay = 500) {
  let shouldWait = false;
  return (...args) => {
    if (shouldWait) return;

    fn(...args);
    shouldWait = true;
    console.log("throttle");

    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
}
