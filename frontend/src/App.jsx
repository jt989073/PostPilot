import React, { useState, useEffect } from "react";
import { getHealth } from "./api/health";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHealth,
  selectHealthLoading,
  selectHealthStatus,
  selectHealthError,
} from "./features/health/healthSlice";

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
    <div style={{ padding: 20 }}>
      <h1>✅ React is working!</h1>
      {loading && <p>Loading…</p>}
      {!loading && error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && <p>Backend status: {status}</p>}
    </div>
  );
}

export default App;
