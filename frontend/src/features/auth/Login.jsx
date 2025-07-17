import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  selectAuthStatus,
  selectAuthError,
} from './authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redux auth state
  const status = useSelector(selectAuthStatus);   // 'idle' | 'loading' | 'succeeded' | 'failed'
  const error  = useSelector(selectAuthError);    // string | null

  // Redirect to dashboard on successful login
  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/dashboard');
    }
  }, [status, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    // Dispatch thunk
    dispatch(loginUser({ email, password }));
  };

  const isLoading = status === 'loading';

  return (
    <div className="max-w-sm mx-auto mt-24 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Log In</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border-gray-300 focus:border-brand focus:ring-brand text-gray-900"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border-gray-300 focus:border-brand focus:ring-brand text-gray-900"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 rounded-md font-medium text-white bg-brand hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isLoading ? 'Logging in…' : 'Log In'}
        </button>
      </form>
    </div>
  );
}

export default Login;
