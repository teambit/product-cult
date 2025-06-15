import React from 'react';
import classNames from 'classnames';
import { useAuth } from '@infinity/product-hunt-platform.hooks.use-auth';
import type { User } from '@infinity/product-hunt-platform.entities.user';
import { Avatar } from '@infinity/design.content.avatar';
import { Button } from '@infinity/design.actions.button';
import { Dropdown } from '@infinity/design.overlays.dropdown';
import { Link, useNavigate } from '@infinity/design.navigation.link';

import type { UserBarProps } from './user-bar-props-type.js';
import type { UserBarMenuItem } from './user-bar-menu-item-type.js';
import styles from './user-bar.module.scss';

/**
 * UserBar component displays user authentication status and actions.
 * It shows an avatar and a dropdown menu for logged-in users,
 * or "Get started" and "Login" actions for logged-out users.
 */
export function UserBar(props: UserBarProps): React.JSX.Element | null {
  const { menuItems = [], className, style } = props;
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/'); // Navigate to homepage after logout
    }
    // Handle logout failure if needed
  };

  if (loading) {
    // Render nothing or a minimal placeholder during loading to avoid layout shifts
    return null;
  }

  const loggedInUser = user as User | null; // Cast to specific User type if needed for properties

  const getInitials = (username?: string): string | undefined => {
    if (!username) return undefined;
    const parts = username.split(' ');
    let initials = parts[0]?.charAt(0) || '';
    if (parts.length > 1) {
      initials += parts[parts.length - 1]?.charAt(0) || '';
    }
    return initials.toUpperCase().substring(0, 2);
  };

  const visibleMenuItems = loggedInUser
    ? menuItems.filter((item) => {
        if (!item.allowedRoles || item.allowedRoles.length === 0) {
          return true; // Public item, visible to all authenticated users
        }
        if (!loggedInUser.roles || loggedInUser.roles.length === 0) {
          return false; // Restricted item, but user has no roles
        }
        // User has roles, check if any of their roles match the allowed roles for the item
        return item.allowedRoles.some((allowedRole) =>
          (loggedInUser.roles as readonly string[]).includes(allowedRole)
        );
      })
    : [];

  return (
    <div className={classNames(styles.userBar, className)} style={style}>
      {loggedInUser ? (
        <div className={styles.loggedInContainer}>
          <Dropdown
            placeholder={
              <Avatar
                src={loggedInUser.imageUrl}
                alt={loggedInUser.username}
                initials={getInitials(loggedInUser.username)}
                size="medium"
                shape="circle"
                className={styles.avatarPlaceholder}
              />
            }
            openPosition="bottom-end"
            overlayClassName={styles.dropdownMenuOverlay} // If specific styling for overlay itself is needed
          >
            <div className={styles.dropdownMenu}>
              <ul className={styles.menuList}>
                {visibleMenuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <li key={item.name}>
                      <Link href={item.href} className={styles.menuItemLink}>
                        {IconComponent && (
                          <IconComponent className={styles.menuItemIcon} />
                        )}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
                <li key="logout">
                  <Button
                    appearance="tertiary"
                    onClick={handleLogout}
                    className={styles.logoutButton}
                  >
                    Logout
                  </Button>
                </li>
              </ul>
            </div>
          </Dropdown>
        </div>
      ) : (
        <div className={styles.loggedOutActions}>
          <Button
            appearance="primary"
            href="/signup"
            className={styles.getStartedButton}
          >
            Get started
          </Button>
          <Button appearance="tertiary" href="/login" className={styles.loginLink}>
            Login
          </Button>
        </div>
      )}
    </div>
  );
}