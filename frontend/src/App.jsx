import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHealth,
  selectHealthLoading,
  selectHealthStatus,
  selectHealthError,
} from "./features/health/healthSlice";
import { getHealth } from "./api/health";
import Login from "./features/auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import Dashboard from "./features/dashboard/Dashboard";

function App() {
  const dispatch = useDispatch();

  // Selectors to read state
  const loading = useSelector(selectHealthLoading);
  const status = useSelector(selectHealthStatus);
  const error = useSelector(selectHealthError);

  useEffect(() => {
    dispatch(fetchHealth());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* For now, redirect the root to /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* Future protected routes go here: */}
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
