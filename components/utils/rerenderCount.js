import { useRef } from "react";
export default function RerenderCount() {
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  return (
    <span style={{ backgroundColor: "#fefefe", padding: "0.5em 1em" }}>
      {renderCounter.current}
    </span>
  );
}
