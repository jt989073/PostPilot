// frontend/src/features/auth/Login.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectAuthStatus, selectAuthError } from './authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error  = useSelector(selectAuthError);

  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: 'auto', padding: 20 }}>
      <h2>Log In</h2>

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
      </label>

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{ width: '100%', padding: '8px 0' }}
      >
        {status === 'loading' ? 'Logging in…' : 'Log In'}
      </button>

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
    </form>
  );
}
