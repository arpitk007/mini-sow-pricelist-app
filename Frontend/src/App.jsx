import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import AppShell from "./components/layout/AppShell";

// Pages
import Login from "./pages/Login";
import Terms from "./pages/Terms";
import Pricelist from "./pages/Pricelist";

// Auth Wrapper
import ProtectedRoute from "./components/common/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* 🟢 Public Route */}
      <Route path="/login" element={<Login />} />

      {/* 🔒 Protected Routes inside AppShell */}
      <Route
        path="/terms"
        element={
          <ProtectedRoute>
            <AppShell>
              <Terms />
            </AppShell>
          </ProtectedRoute>
        }
      />

      <Route
        path="/pricelist"
        element={
          <ProtectedRoute>
            <AppShell>
              <Pricelist />
            </AppShell>
          </ProtectedRoute>
        }
      />

      {/* Redirect base URL to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
