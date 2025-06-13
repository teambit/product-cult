import React from 'react';
import classNames from 'classnames';
import { Card } from '@infinity/design.content.card';
import { Avatar, type AvatarSize } from '@infinity/design.content.avatar';
import { Heading, type HeadingLevel } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';
import type { UserProfile } from '@infinity/people.entities.user-profile';

import styles from './user-card.module.scss';

/**
 * Props for the UserCard component.
 */
export type UserCardProps = {
  /**
   * The user profile data to display.
   * This object contains all necessary information like name, bio, and avatar URL.
   */
  userProfile: UserProfile;
  /**
   * Optional custom CSS class name to apply to the root card element.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root card element.
   */
  style?: React.CSSProperties;
  /**
   * Callback function triggered when the avatar is clicked.
   * Receives the user's ID as an argument.
   */
  onAvatarClick?: (userId: string) => void;
  /**
   * Callback function triggered when the user's name is clicked.
   * Receives the user's ID as an argument.
   */
  onNameClick?: (userId: string) => void;
  /**
   * The size of the avatar.
   * Defaults to 'xlarge'.
   */
  avatarSize?: AvatarSize;
  /**
   * The semantic and visual heading level for the user's name.
   * Defaults to 3 (<h3>).
   */
  nameHeadingLevel?: HeadingLevel;
};

const DEFAULT_AVATAR_SIZE: AvatarSize = 'xlarge';
const DEFAULT_NAME_HEADING_LEVEL: HeadingLevel = 3;

/**
 * UserCard is a component designed to display user information in a visually appealing card format,
 * suitable for lists, grids, or profile summaries. It features a prominent avatar, user's name,
 * and an optional bio, with interactive elements for enhanced user engagement.
 */
export function UserCard({
  userProfile,
  className,
  style,
  onAvatarClick,
  onNameClick,
  avatarSize = DEFAULT_AVATAR_SIZE,
  nameHeadingLevel = DEFAULT_NAME_HEADING_LEVEL,
}: UserCardProps): React.JSX.Element {
  const handleAvatarClick = () => {
    if (onAvatarClick) {
      onAvatarClick(userProfile.userId);
    }
  };

  const handleNameClick = () => {
    if (onNameClick) {
      onNameClick(userProfile.userId);
    }
  };

  const canClickAvatar = !!onAvatarClick;
  const canClickName = !!onNameClick;

  return (
    <Card
      className={classNames(styles.userCardRoot, className)}
      style={style}
    >
      <div className={styles.contentLayout}>
        <div
          className={classNames(
            styles.avatarWrapper,
            canClickAvatar && styles.clickableElement
          )}
          onClick={canClickAvatar ? handleAvatarClick : undefined}
          onKeyDown={
            canClickAvatar
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAvatarClick();
                  }
                }
              : undefined
          }
          role={canClickAvatar ? 'button' : undefined}
          tabIndex={canClickAvatar ? 0 : undefined}
          aria-label={
            canClickAvatar ? `View profile of ${userProfile.name}` : undefined
          }
        >
          <Avatar
            src={userProfile.imageUrl}
            alt={userProfile.name}
            size={avatarSize}
            shape="circle"
            className={styles.avatar}
          />
        </div>

        <div
          className={classNames(
            styles.nameWrapper,
            canClickName && styles.clickableElement
          )}
          onClick={canClickName ? handleNameClick : undefined}
          onKeyDown={
            canClickName
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNameClick();
                  }
                }
              : undefined
          }
          role={canClickName ? 'button' : undefined}
          tabIndex={canClickName ? 0 : undefined}
          aria-label={
            canClickName ? `View profile of ${userProfile.name}` : undefined
          }
        >
          <Heading
            level={nameHeadingLevel}
            visualLevel={nameHeadingLevel}
            className={styles.userName}
          >
            {userProfile.name}
          </Heading>
        </div>

        {userProfile.bio && userProfile.bio.trim().length > 0 && (
          <Paragraph className={styles.userDescription}>
            {userProfile.bio}
          </Paragraph>
        )}
      </div>
    </Card>
  );
}