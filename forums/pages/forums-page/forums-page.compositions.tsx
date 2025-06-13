import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Forum } from '@infinity/forums.entities.forum';
import { ForumsPage } from './forums-page.js';

// Define common date strings
const createdAt = new Date(2024, 0, 15, 10, 30, 0).toISOString(); // Jan 15, 2024
const updatedAt = new Date(2024, 2, 10, 12, 0, 0).toISOString(); // Mar 10, 2024

// Mock data for BasicForumsPage
const basicForums: Forum[] = [
  new Forum(
    'General Discussion',
    'A place for all community members to chat about various topics, share ideas, and get to know each other. Non-product specific discussions welcome!',
    createdAt,
    updatedAt,
    undefined, // No image
    'forum-general-discussion'
  ),
  new Forum(
    'Product Feedback',
    'Have suggestions or feedback for our platform? Share your thoughts here to help us improve and build better features for everyone.',
    createdAt,
    updatedAt,
    undefined, // No image
    'forum-product-feedback'
  ),
  new Forum(
    'Announcements',
    'Stay updated with the latest news, updates, and announcements from the platform team. Important information will be posted here.',
    createdAt,
    updatedAt,
    undefined, // No image
    'forum-announcements'
  ),
];

// Mock data for ForumsPageWithImages
const forumsWithImages: Forum[] = [
  new Forum(
    'Developer\'s Den',
    'Connect with fellow developers. Discuss coding challenges, new frameworks, best practices, and collaborate on projects. All levels welcome!',
    createdAt,
    updatedAt,
    'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw0fHxvbmxpbmUlMjBjb21tdW5pdHklMjBkaXNjdXNzaW9uJTIwYWJzdHJhY3R8ZW58MXwwfHxvcmFuZ2V8MTc0OTU5OTI2MHww&ixlib=rb-4.1.0', // Minimal pencils
    'forum-developers-den'
  ),
  new Forum(
    'Startup Central',
    'For entrepreneurs and aspiring founders. Share your startup journey, ask for advice on challenges, find co-founders, and discuss funding strategies.',
    createdAt,
    updatedAt,
    'https://images.unsplash.com/photo-1652542572867-9356e399be5f?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHxvbmxpbmUlMjBjb21tdW5pdHklMjBkaXNjdXNzaW9uJTIwYWJzdHJhY3R8ZW58MXwwfHxvcmFuZ2V8MTc0OTU5OTI2MHww&ixlib=rb-4.1.0', // Yellow pattern
    'forum-startup-central'
  ),
  new Forum(
    'Design & UX Showcase',
    'A forum for UI/UX designers, graphic artists, and product designers. Share your portfolios, critique work, discuss design tools, and latest trends.',
    createdAt,
    updatedAt,
    'https://images.unsplash.com/photo-1598008059006-eb85defaa105?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw2fHxvbmxpbmUlMjBjb21tdW5pdHklMjBkaXNjdXNzaW9uJTIwYWJzdHJhY3R8ZW58MXwwfHxvcmFuZ2V8MTc0OTU5OTI2MHww&ixlib=rb-4.1.0', // orange and white abstract painting
    'forum-design-ux'
  ),
];

export const BasicForumsPage = () => (
  <MockProvider>
    <ForumsPage mockForumsData={basicForums} />
  </MockProvider>
);

export const ForumsPageWithImages = () => (
  <MockProvider>
    <ForumsPage
      mockForumsData={forumsWithImages}
      pageTitle="Our Vibrant Communities"
    />
  </MockProvider>
);

export const ForumsPageEmpty = () => (
  <MockProvider>
    <ForumsPage
      mockForumsData={[]}
      pageTitle="No Discussions Started Yet"
    />
  </MockProvider>
);