import React from 'react';
import classNames from 'classnames';
import { Avatar } from '@infinity/design.content.avatar';
import type { AvatarSize } from '@infinity/design.content.avatar';
import { Heading } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';
import { Card } from '@infinity/design.content.card';
import type { UserProfile } from '@infinity/people.entities.user-profile';
import styles from './user-compact-card.module.scss';

/**
 * Props for the UserCompactCard component.
 */
export type UserCompactCardProps = {
  /**
   * The user profile data to display.
   * This should be an instance of the UserProfile entity.
   */
  user: UserProfile;
  /**
   * Optional click handler for the card.
   * If provided, the card will have interactive styling and be clickable.
   */
  onClick?: (user: UserProfile) => void;
  /**
   * Optional custom CSS class name to apply to the root element of the component.
   */
  className?: string;
  /**
   * Optional custom inline styles to apply to the root element of the component.
   */
  style?: React.CSSProperties;
  /**
   * Specifies the size of the avatar.
   * @default 'large'
   */
  avatarSize?: AvatarSize;
};

const DEFAULT_AVATAR_SIZE: AvatarSize = 'large';

/**
 * UserCompactCard is a component designed to display user information in a compact format,
 * suitable for panels or lists. It features a prominent avatar, user name, and an optional description.
 * The card can be made interactive with an onClick handler.
 */
export function UserCompactCard({
  user,
  onClick,
  className,
  style,
  avatarSize = DEFAULT_AVATAR_SIZE,
}: UserCompactCardProps): React.JSX.Element {
  // Retrieve plain user data object from the UserProfile entity instance
  const plainUser = user.toObject();

  const handleCardClick = onClick ? () => onClick(user) : undefined;

  const handleKeyDown = onClick
    ? (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick(user);
        }
      }
    : undefined;

  return (
    <div
      className={classNames(
        styles.userCompactCardRoot,
        { [styles.clickable]: !!onClick },
        className
      )}
      style={style}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `View profile of ${plainUser.name}` : undefined}
    >
      <Card
        className={styles.cardInner}
        interactive={!!onClick} // Enables visual interactive states on the Card
        variant="primary" // Uses primary card styling; consider making this a prop for more flexibility
      >
        <div className={styles.contentWrapper}>
          <div className={styles.avatarContainer}>
            <Avatar
              src={plainUser.imageUrl}
              alt={plainUser.name || 'User avatar'}
              size={avatarSize}
              shape="circle" // Circular avatars are common for user profiles
              className={styles.avatar}
            />
          </div>
          <div className={styles.userInfo}>
            <Heading level={4} className={styles.name}>
              {plainUser.name || 'Unnamed User'}
            </Heading>
            {plainUser.bio && (
              <Paragraph className={styles.description}>
                {plainUser.bio}
              </Paragraph>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}