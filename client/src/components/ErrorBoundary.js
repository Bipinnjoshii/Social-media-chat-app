import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleClearAndReload = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {}
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#FAF7F2",
            color: "#292524",
            padding: "24px",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          }}
        >
          <div
            style={{
              maxWidth: "440px",
              width: "100%",
              padding: "36px 30px",
              background: "#FFFFFF",
              borderRadius: "20px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
              border: "1px solid #E7E5E4",
              textAlign: "center"
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "rgba(194, 94, 62, 0.12)",
                color: "#C25E3E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px",
                fontSize: "24px"
              }}
            >
              <i className="fas fa-sync-alt"></i>
            </div>
            <h4 style={{ fontWeight: 700, marginBottom: "10px", color: "#1C1917" }}>
              Session Update Available
            </h4>
            <p style={{ color: "#78716C", fontSize: "0.92rem", lineHeight: 1.5, marginBottom: "24px" }}>
              Your browser held cached state from an earlier version. Click below to refresh your session.
            </p>
            <button
              onClick={this.handleClearAndReload}
              style={{
                width: "100%",
                padding: "12px 20px",
                borderRadius: "12px",
                background: "#C25E3E",
                color: "#FFFFFF",
                border: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(194, 94, 62, 0.25)"
              }}
            >
              Refresh &amp; Open App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
