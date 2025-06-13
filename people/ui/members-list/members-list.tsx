import React from 'react';
import classNames from 'classnames';
import { Flex } from '@infinity/design.layouts.flex';
import type { UserProfile } from '@infinity/people.entities.user-profile';
import { UserCard } from '@infinity/people.ui.user-card';
import styles from './members-list.module.scss';

/**
 * Props for the MembersList component.
 */
export type MembersListProps = {
  /**
   * An optional array of user profile objects to display.
   * Each UserProfile object will be rendered as a UserCard.
   * If undefined or empty, the component will render an empty container.
   * @default []
   */
  members?: UserProfile[];
  /**
   * Optional custom CSS class name to apply to the root Flex container of the component.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root Flex container of the component.
   */
  style?: React.CSSProperties;
};

const DEFAULT_MEMBERS: UserProfile[] = [];

/**
 * MembersList is a responsive component that displays a collection of user profiles
 * as UserCard components in a visually appealing grid layout.
 */
export function MembersList({
  members = DEFAULT_MEMBERS,
  className,
  style,
}: MembersListProps): React.JSX.Element {
  if (!members || members.length === 0) {
    return (
      <Flex
        className={classNames(
          styles.membersListContainer,
          styles.emptyListContainer,
          className
        )}
        style={style}
      />
    );
  }

  return (
    <Flex
      wrap="wrap"
      gap="var(--spacing-large)"
      justifyContent="center"
      alignItems="stretch"
      className={classNames(styles.membersListContainer, className)}
      style={style}
    >
      {members.map((member) => (
        <Flex key={member.userId} className={styles.memberItem}>
          <UserCard userProfile={member} />
        </Flex>
      ))}
    </Flex>
  );
}