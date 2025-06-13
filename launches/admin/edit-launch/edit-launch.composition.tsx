import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { EditLaunch } from './edit-launch.js';

export const EditExistingLaunch = () => {
  // This composition demonstrates the EditLaunch page for an existing launch.
  // It relies on MockProvider to correctly set up the Apollo Client context.
  // For the form to be populated with initial data, MockProvider would need
  // to be configured (e.g., via an apolloMocks prop or initial cache state)
  // to provide a successful response for the useGetLaunch hook when called with id 'launch-demo-123'.
  // If no specific mock is provided, the page might show a loading state,
  // an error, or an empty form depending on MockProvider's default behavior.
  return (
    <MockProvider /* Pass apolloMocks if supported */>
      <MemoryRouter initialEntries={['/launches/launch-demo-123/edit']}>
        <Routes>
          <Route path="/launches/:launchId/edit" element={<EditLaunch />} />
          <Route 
            path="/launches/:launchId" 
            element={
              <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#333' }}>
                <h2>Mock Launch Detail Page</h2>
                <p>If an update was successful, navigation might lead here.</p>
              </div>
            } 
          />
          <Route 
            path="/login" 
            element={
              <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#333' }}>
                <h2>Mock Login Page</h2>
                <p>Users are redirected here if not authenticated.</p>
              </div>
            } 
          />
        </Routes>
      </MemoryRouter>
    </MockProvider>
  );
};

export const AttemptToEditNonExistentLaunch = () => {
  // This composition shows what might happen if the launchId refers to a non-existent launch.
  // Ideally, MockProvider would be configured to make useGetLaunch return no data or an error
  // for the id 'non-existent-launch-id'.
  // This would then display the "Launch not found." or error message from EditLaunchPageContentInternal.
  return (
    <MockProvider>
      <MemoryRouter initialEntries={['/launches/non-existent-launch-id/edit']}>
        <Routes>
          <Route path="/launches/:launchId/edit" element={<EditLaunch />} />
          <Route 
            path="/login" 
            element={
              <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#333' }}>
                <h2>Mock Login Page</h2>
              </div>
            } 
          />
        </Routes>
      </MemoryRouter>
    </MockProvider>
  );
};

export const EditLaunchWithMissingIdInUrl = () => {
  // This composition demonstrates the component's behavior when the launchId is not present in the URL,
  // which should trigger the specific error message "Launch ID is missing in URL."
  // The EditLaunch component handles this case before attempting to fetch data.
  return (
    <MockProvider>
      {/* Note: The route path "/launches/edit" does not have ":launchId" */}
      <MemoryRouter initialEntries={['/launches/edit']}>
        <Routes>
          <Route path="/launches/edit" element={<EditLaunch />} />
          <Route 
            path="/login" 
            element={
              <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#333' }}>
                <h2>Mock Login Page</h2>
              </div>
            } 
          />
        </Routes>
      </MemoryRouter>
    </MockProvider>
  );
};