import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { createMockUserProfile, UserProfile } from '@infinity/people.entities.user-profile';
import { MembersList } from './members-list.js';

const imageUser1 = "https://images.unsplash.com/photo-1606230272523-e267930aafa1?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdXNlciUyMHByb2ZpbGVzfGVufDF8MXx8b3JhbmdlfDE3NDk1OTkyNTZ8MA&ixlib=rb-4.1.0";
const imageUser2 = "https://images.unsplash.com/photo-1606277894279-55ff7b200315?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHxkaXZlcnNlJTIwdXNlciUyMHByb2ZpbGVzfGVufDF8MXx8b3JhbmdlfDE3NDk1OTkyNTZ8MA&ixlib=rb-4.1.0";
const imageUser3 = "https://images.unsplash.com/photo-1603160010616-b62e010a854d?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHxkaXZlcnNlJTIwdXNlciUyMHByb2ZpbGVzfGVufDF8MXx8b3JhbmdlfDE3NDk1OTkyNTZ8MA&ixlib=rb-4.1.0";
const imageUser4 = "https://images.unsplash.com/photo-1619891059344-ee1c029b6347?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw0fHxkaXZlcnNlJTIwdXNlciUyMHByb2ZpbGVzfGVufDF8MXx8b3JhbmdlfDE3NDk1OTkyNTZ8MA&ixlib=rb-4.1.0";

const mockMembers: UserProfile[] = [
  createMockUserProfile({
    userId: 'user-1',
    name: 'Elena Rodriguez',
    bio: 'Passionate product manager driving innovation in SaaS. Loves hiking and discovering new tech.',
    imageUrl: imageUser1,
    company: 'Innovate Solutions',
    location: 'Austin, TX',
  }),
  createMockUserProfile({
    userId: 'user-2',
    name: 'Ben Carter',
    bio: 'Full-stack developer with a keen eye for UI/UX. Enjoys contributing to open-source projects.',
    imageUrl: imageUser2,
    company: 'Tech Crafters',
    location: 'London, UK',
  }),
  createMockUserProfile({
    userId: 'user-3',
    name: 'Aisha Khan',
    bio: 'Digital marketer specializing in growth strategies for startups. Avid reader and coffee enthusiast.',
    imageUrl: imageUser3,
    company: 'Growth Spark Inc.',
    location: 'Toronto, CA',
  }),
  createMockUserProfile({
    userId: 'user-4',
    name: 'Marcus Cole',
    bio: 'UX designer crafting intuitive and delightful user experiences. Always exploring new design tools.',
    imageUrl: imageUser4,
    company: 'Pixel Perfect Co.',
    location: 'Berlin, DE',
  }),
];

export const BasicMembersList = () => {
  return (
    <MockProvider>
      <MembersList members={mockMembers} />
    </MockProvider>
  );
};

export const EmptyMembersList = () => {
  return (
    <MockProvider>
      <MembersList members={[]} />
    </MockProvider>
  );
};

export const MembersListWithOneMember = () => {
  const singleMember = [
    createMockUserProfile({
      userId: 'user-5',
      name: 'Sophia Loren',
      bio: 'Lead engineer focused on scalable backend systems. Enjoys chess and jazz music.',
      imageUrl: "https://images.unsplash.com/photo-1615714258866-81a35aa47739?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw1fHxkaXZlcnNlJTIwdXNlciUyMHByb2ZpbGVzfGVufDF8MXx8b3JhbmdlfDE3NDk1OTkyNTZ8MA&ixlib=rb-4.1.0",
      company: 'Core Systems Ltd.',
      location: 'Paris, FR',
    }),
  ];
  return (
    <MockProvider>
      <MembersList members={singleMember} />
    </MockProvider>
  );
};