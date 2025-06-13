import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Link } from '@infinity/design.navigation.link';
import { ProtectedRoute } from './protected-route.js';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
// useAuth is implicitly used by ProtectedRoute, which is part of these compositions.
// MockProvider provides the context for useAuth.


const CurrentLocationDisplay: React.FC = () => {
  const location = useLocation();
  return (
    <p style={{ marginTop: '10px', color: '#555', fontSize: '0.9em', textAlign: 'center' }}>
      Current route: <code>{location.pathname}</code>
    </p>
  );
};

const commonWrapperStyle: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  marginBottom: '20px',
  backgroundColor: '#f0f2f5',
};

const titleStyle: React.CSSProperties = {
  fontSize: '1.4em',
  color: '#2c3e50',
  borderBottom: '2px solid #3498db',
  paddingBottom: '8px',
  marginBottom: '20px',
  textAlign: 'center',
};

const contentBoxStyle: React.CSSProperties = {
  padding: '25px',
  backgroundColor: '#ffffff',
  border: '1px solid #d1d8e0',
  borderRadius: '6px',
  minHeight: '120px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
};

const navStyle: React.CSSProperties = {
  marginBottom: '20px',
  paddingBottom: '10px',
  borderBottom: '1px dashed #bdc3c7',
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
};

const textMutedStyle: React.CSSProperties = {
  color: '#7f8c8d',
  fontSize: '0.9em',
  marginTop: '5px',
};

export const AuthenticatedUserAccessesProtectedContent = () => {
  // The behavior of useAuth is now determined by MockProvider.
  // This composition demonstrates accessing protected content,
  // assuming MockProvider is configured for an authenticated user state.
  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <h3 style={titleStyle}>Authenticated User Access</h3>
        <nav style={navStyle}>
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard (Protected)</Link>
        </nav>
        <div style={contentBoxStyle}>
          <Routes>
            <Route path="/" element={<div><h4>Public Home Page</h4><p style={textMutedStyle}>Anyone can see this.</p></div>} />
            <Route path="/dashboard" element={
              <ProtectedRoute redirectTo="/login-required">
                <h4>Welcome to your Dashboard!</h4>
                <p style={textMutedStyle}>This content is protected and visible to you.</p>
              </ProtectedRoute>
            } />
            <Route path="/login-required" element={<div><h4>Login Page</h4><p style={textMutedStyle}>Redirected here if unauthenticated (should not happen in this scenario).</p></div>} />
          </Routes>
        </div>
        <CurrentLocationDisplay />
      </div>
    </MockProvider>
  );
};

export const UnauthenticatedUserIsRedirected = () => {
  // The behavior of useAuth is now determined by MockProvider.
  // This composition demonstrates redirection for unauthenticated users,
  // assuming MockProvider is configured for an unauthenticated user state.
  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <h3 style={titleStyle}>Unauthenticated User Redirection</h3>
        <nav style={navStyle}>
          <Link href="/">Home</Link>
          <Link href="/my-profile">My Profile (Protected)</Link>
        </nav>
        <div style={contentBoxStyle}>
          <Routes>
            <Route path="/" element={<div><h4>Public Home Page</h4><p style={textMutedStyle}>Anyone can see this.</p></div>} />
            <Route path="/my-profile" element={
              <ProtectedRoute redirectTo="/auth/login">
                <div>This is protected profile content. <strong style={{color: 'red'}}>You should not see this.</strong></div>
              </ProtectedRoute>
            } />
            <Route path="/auth/login" element={
              <div>
                <h4>Login Required</h4>
                <p style={textMutedStyle}>You've been redirected here. Please log in to continue.</p>
              </div>
            } />
          </Routes>
        </div>
        <CurrentLocationDisplay />
      </div>
    </MockProvider>
  );
};

export const LoadingStateShowsSpinnerForProtectedRoute = () => {
  // The behavior of useAuth is now determined by MockProvider.
  // This composition demonstrates the loading state,
  // assuming MockProvider is configured for a loading auth state.
  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <h3 style={titleStyle}>Loading Authentication State</h3>
        <nav style={navStyle}>
          <Link href="/">Home</Link>
          <Link href="/app-settings">App Settings (Protected)</Link>
        </nav>
        <div style={contentBoxStyle}>
          <Routes>
            <Route path="/" element={<div><h4>Public Home Page</h4><p style={textMutedStyle}>Anyone can see this.</p></div>} />
            <Route path="/app-settings" element={
              <ProtectedRoute redirectTo="/auth/login-fallback">
                <div>This is protected settings content. You should not see this if loading or unauthenticated.</div>
              </ProtectedRoute>
            } />
            <Route path="/auth/login-fallback" element={<div><h4>Login Page</h4> <p style={textMutedStyle}>Redirect target if not authenticated post-loading.</p></div>} />
          </Routes>
        </div>
        <CurrentLocationDisplay />
        <p style={{textAlign: 'center', marginTop: '15px', fontStyle: 'italic', color: '#555'}}>
          Navigate to "App Settings (Protected)" to see the loading spinner from ProtectedRoute.
        </p>
      </div>
    </MockProvider>
  );
};