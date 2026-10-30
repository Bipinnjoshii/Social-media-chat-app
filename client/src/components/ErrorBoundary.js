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
            background: "#080B11",
            color: "#F8FAFC",
            padding: "24px",
            fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          }}
        >
          <div
            style={{
              maxWidth: "460px",
              width: "100%",
              padding: "40px 32px",
              background: "#0E131F",
              borderRadius: "24px",
              boxShadow: "0 24px 48px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)",
              textAlign: "center"
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "16px",
                background: "rgba(0, 229, 153, 0.12)",
                color: "#00E599",
                border: "1px solid rgba(0, 229, 153, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: "24px"
              }}
            >
              <i className="fas fa-satellite-dish"></i>
            </div>
            <h3 style={{ fontWeight: 800, fontSize: "1.35rem", letterSpacing: "-0.03em", marginBottom: "10px", color: "#F8FAFC" }}>
              Syncing with Chirp
            </h3>
            <p style={{ color: "#94A3B8", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "28px" }}>
              A network state update was detected. Refresh to restore your real-time connection.
            </p>
            <button
              onClick={this.handleClearAndReload}
              style={{
                width: "100%",
                padding: "13px 24px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #00E599 0%, #00C882 100%)",
                color: "#051A12",
                border: "none",
                fontWeight: 700,
                fontSize: "0.95rem",
                letterSpacing: "-0.01em",
                cursor: "pointer",
                boxShadow: "0 8px 24px -4px rgba(0, 229, 153, 0.45)",
                transition: "transform 0.15s ease"
              }}
            >
              Reconnect &amp; Open Chirp
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
