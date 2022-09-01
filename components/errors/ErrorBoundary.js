import React from "react";
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("something went horribly wrong", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="section flex-center-center">
          <div className="text-center">
            <h1>An error occured 💫💫💫</h1>
            <button
              className="button"
              onClick={() => {
                this.setState({ hasError: false });
              }}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
