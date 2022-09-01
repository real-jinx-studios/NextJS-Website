import fs from "fs";
export const read = (url) => {
  const jsonData = fs.readFileSync(url, "UTF-8");

  const json = JSON.parse(jsonData);
  return json;
};
