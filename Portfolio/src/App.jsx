import React, { useState } from "react";
import AuthPage from "./pages/AuthPage";
import Portfolio from "./pages/Portfolio";

/**
 * Main Application Routing
 * - AuthPage.jsx is the absolute first screen seen on load.
 * - Once authenticated (via Cast Login Spell or Fast-Track Demo Login),
 *   smoothly transitions to Portfolio.jsx.
 */
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return <Portfolio onBackToPortal={() => setIsAuthenticated(false)} />;
  }

  return <AuthPage onAuthenticated={() => setIsAuthenticated(true)} />;
}