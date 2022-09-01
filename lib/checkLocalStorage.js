export function checkIfLocalStorageExpired() {
  //check if local storage is expired for all local storage items and delete if expired
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    let obj = JSON.parse(value);
    if (obj.expirationDate < Date.now()) {
      localStorage.removeItem(key);
    }
  }
}

export function setLocalStorageExpirationDate() {
  //set expiration date for all local storage items to 3 days from now (in milliseconds) that dont already have an expiration date
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    let obj = JSON.parse(value);
    if (!obj.expirationDate) {
      obj.expirationDate = Date.now() + 3 * 24 * 60 * 60 * 1000;
      localStorage.setItem(key, JSON.stringify(obj));
    }
  }
}
