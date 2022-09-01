import { useDebugValue, useEffect, useState } from "react";

function useDisplayName() {
  const [displayName, setDisplayName] = useState();
  useEffect(() => {
    const data = fetchFromDatabase(props.userId);
    setDisplayName(data.displayName);
  }, []);
  //for reactdev tools to debug stuff
  useDebugValue(displayName ?? "loading...");

  return displayName;
}
