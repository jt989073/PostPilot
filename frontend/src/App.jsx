import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchHealth } from "./features/health/healthSlice";

import Login from "./features/auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import Dashboard from "./features/dashboard/Dashboard";

function App() {
  const dispatch = useDispatch();

  // Kick off backend health check once on mount
  useEffect(() => {
    dispatch(fetchHealth());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;