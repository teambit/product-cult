import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { createMockUserProfile, UserProfile } from '@infinity/people.entities.user-profile';
import { MembersList } from './members-list.js';
import styles from './members-list.module.scss';

describe('MembersList', () => {
  const mockMembers: UserProfile[] = [
    createMockUserProfile({
      userId: 'user-1',
      name: 'Elena Rodriguez',
      bio: 'Passionate product manager driving innovation in SaaS.',
    }),
    createMockUserProfile({
      userId: 'user-2',
      name: 'Ben Carter',
      bio: 'Full-stack developer with a keen eye for UI/UX.',
    }),
  ];

  it('should render the members list with the correct number of UserCard components', () => {
    const { container } = render(
      <MockProvider>
        <MembersList members={mockMembers} />
      </MockProvider>
    );

    const memberItems = container.querySelectorAll(`.${styles.memberItem}`);
    expect(memberItems.length).toBe(2);
  });

  it('should render an empty container when members is an empty array', () => {
    const { container } = render(
      <MockProvider>
        <MembersList members={[]} />
      </MockProvider>
    );

    const membersListContainer = container.querySelector(`.${styles.membersListContainer}`);
    expect(membersListContainer).toBeInTheDocument();

    const emptyListContainer = container.querySelector(`.${styles.emptyListContainer}`);
    expect(emptyListContainer).toBeInTheDocument();
  });

  it('should render a member item with the memberItem class', () => {
    const { container } = render(
      <MockProvider>
        <MembersList members={[mockMembers[0]]} />
      </MockProvider>
    );
    const memberItem = container.querySelector(`.${styles.memberItem}`);
    expect(memberItem).toBeInTheDocument();
  });
});