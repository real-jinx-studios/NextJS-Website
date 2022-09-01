import React from "react";
export default class ErrorBoundaryMissingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("something was not found", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h3
          style={{
            color: "var(--clr-warn)",
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
          something was not found 💫💫💫
        </h3>
      );
    }

    return this.props.children;
  }
}
