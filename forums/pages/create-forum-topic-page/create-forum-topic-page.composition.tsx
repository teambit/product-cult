import React from 'react';
import { CreateForumTopicPage } from './create-forum-topic-page.js';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { User, mockUser as sdkMockUser, PlainUser } from '@infinity/product-hunt-platform.entities.user';
import { Forum, mockForums as sdkMockForums, PlainForum } from '@infinity/forums.entities.forum';
import { MockedProvider as ApolloMockedProvider, MockedResponse } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Define GraphQL operations (simplified versions matching typical patterns)
const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUserComposition { # Renamed to avoid potential clashes if real query has same name
    currentUser {
      id
      userId
      username
      email
      imageUrl
      roles
    }
  }
`;

const LIST_FORUMS_QUERY = gql`
  query ListForumsComposition { # Renamed for safety
    listForums {
      id
      name
      description
      imageUrl
      createdAt
      updatedAt
    }
  }
`;

const defaultForumImage = "https://images.unsplash.com/photo-1649767537763-a0118ad8651a?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBjb21tdW5pdHklMjBkaXNjdXNzaW9ufGVufDF8MHx8b3JhbmdlfDE3NDk1OTkyNjJ8MA&ixlib=rb-4.1.0";

const createMockUser = (overrides?: Partial<PlainUser>): User => {
    const plainUser = sdkMockUser(overrides).toObject();
    return User.from(plainUser); 
};


export const BasicCreateTopicPage = () => {
  const user = createMockUser({ username: 'JaneDoe', email: 'jane.doe@example.com' });
  
  const specificForumOverrides: Partial<PlainForum>[] = [
    { name: "General Discussion", description: "A place for general chats.", imageUrl: defaultForumImage, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), id: "forum-1" },
    { name: "Tech Talk", description: "All about tech.", imageUrl: defaultForumImage, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), id: "forum-2" },
    { name: "Product Feedback", description: "Share your feedback.", imageUrl: defaultForumImage, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), id: "forum-3" }
  ];
  // sdkMockForums is expected to take Partial<PlainForum>[] and return Forum[]
  // The GQL mock needs PlainForum[]
  const forumsForGqlMock: PlainForum[] = sdkMockForums(specificForumOverrides).map(fProto => {
    const forumObj = fProto.toObject();
    return { // Ensure all PlainForum fields are present for the mock
        id: forumObj.id,
        name: forumObj.name,
        description: forumObj.description,
        createdAt: forumObj.createdAt,
        updatedAt: forumObj.updatedAt,
        imageUrl: forumObj.imageUrl || defaultForumImage,
    };
  });


  const mocks: ReadonlyArray<MockedResponse> = [
    {
      request: { query: GET_CURRENT_USER_QUERY },
      result: { data: { currentUser: user.toObject() } },
    },
    {
      request: { query: LIST_FORUMS_QUERY },
      result: { data: { listForums: forumsForGqlMock } },
      delay: 500, 
    },
  ];

  return (
    <MockProvider>
      <ApolloMockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/forums/create']}>
          <Routes>
            <Route path="/forums/create" element={
              <CreateForumTopicPage
                onTopicCreated={(topicId) => {
                  // eslint-disable-next-line no-alert
                  alert(`Demo: Topic created successfully! ID: ${topicId}. In a real app, you'd navigate or show a toast.`);
                }}
              />
            } />
             <Route path="/login" element={<div>Login Page Mock (redirected here if not logged in)</div>} />
             <Route path="/forums/:topicId" element={<div>Mock Topic Page for {typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : ''}</div>} />
          </Routes>
        </MemoryRouter>
      </ApolloMockedProvider>
    </MockProvider>
  );
};

export const CreateTopicPageNotLoggedIn = () => {
  const genericForumsForMocks: PlainForum[] = sdkMockForums([{}, {}, {}]) 
    .map(f => ({ ...f.toObject(), imageUrl: f.toObject().imageUrl || defaultForumImage }));

  const mocks: ReadonlyArray<MockedResponse> = [
    {
      request: { query: GET_CURRENT_USER_QUERY },
      result: { data: { currentUser: null } }, 
    },
    {
      request: { query: LIST_FORUMS_QUERY },
      result: { data: { listForums: genericForumsForMocks } },
    },
  ];

  return (
    <MockProvider>
      <ApolloMockedProvider mocks={mocks} addTypename={false}>
         <MemoryRouter initialEntries={['/forums/create']}>
           <Routes>
            <Route path="/forums/create" element={<CreateForumTopicPage />} />
            <Route path="/login" element={<div>Login Page Mock (redirected here)</div>} />
          </Routes>
        </MemoryRouter>
      </ApolloMockedProvider>
    </MockProvider>
  );
};

export const CreateTopicPageWithForumLoadingError = () => {
  const user = createMockUser({ username: 'ErrorUser' });

  const mocks: ReadonlyArray<MockedResponse> = [
    {
      request: { query: GET_CURRENT_USER_QUERY },
      result: { data: { currentUser: user.toObject() } },
    },
    {
      request: { query: LIST_FORUMS_QUERY },
      error: new GraphQLError('Network error: Failed to fetch forums. Please try again later.'),
    },
  ];

  return (
    <MockProvider>
      <ApolloMockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/forums/create']}>
          <Routes>
            <Route path="/forums/create" element={<CreateForumTopicPage />} />
            <Route path="/login" element={<div>Login Page Mock (redirected here if auth failed)</div>} />
          </Routes>
        </MemoryRouter>
      </ApolloMockedProvider>
    </MockProvider>
  );
};