export default function handler(req, res) {
  const extractLoginToken = (req) => {
    const cookies = req.headers.cookie;
    if (cookies) {
      const cookie = cookies
        .split(";")
        .find((c) => c.trim().startsWith("uat="));
      if (cookie) {
        return cookie.split("=")[1];
      }
    }
    return null;
  };
  const loginToken = extractLoginToken(req);
  const clientToken = req.body.clientToken;

  const workstationIds = Array.from(
    { length: Math.floor(Math.random() * 15) + 1 },
    () => generateWorkstationId(loginToken)
  );

  res.status(200).json({
    workstationIds,
  });
}

function generateWorkstationId(loginToken) {
  //generate anagram from login token
  const anagram = randomAnagramFromLoginToken(loginToken);
  //generate a random number

  //concatenate anagram and random number
  return anagram;
}

function randomAnagramFromLoginToken(loginToken) {
  //convert login token to an array of characters
  const loginTokenArray = Array.from(loginToken);
  //shuffle the array
  loginTokenArray.sort(() => Math.random() - 0.5);
  //convert the shuffled array to a string
  return loginTokenArray.join("");
}
