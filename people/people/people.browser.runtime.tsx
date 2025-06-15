import React from 'react';
import { useParams } from 'react-router-dom';
import { SymphonyPlatformAspect, type SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';

import { ProductHuntPlatformAspect, type ProductHuntPlatformBrowser } from '@infinity/product-hunt-platform.product-hunt-platform';
import type { PeopleConfig } from './people-config.js';
import type { UserProfileTab, UserProfileTabSlot } from './user-profile-tab.js';
import type { UserProfileAction, UserProfileActionSlot } from './user-profile-action.js';
import type { UserProfileCard, UserProfileCardSlot } from './user-profile-card.js';

import { UserIcon } from '@infinity/people.icons.user-icon';
import { UserProfilePage } from '@infinity/people.pages.user-profile-page';
import { EditUserProfilePage } from '@infinity/people.pages.edit-user-profile-page';
import { MembersList } from '@infinity/people.ui.members-list';
import { useListUserProfiles } from '@infinity/people.hooks.use-user-profile';

export class PeopleBrowser {
  constructor(
    private peopleConfig: PeopleConfig,
    private userProfileTabSlot: UserProfileTabSlot,
    private userProfileActionSlot: UserProfileActionSlot,
    private userProfileCardSlot: UserProfileCardSlot,
    private symphonyPlatform: SymphonyPlatformBrowser,
    private productHuntPlatform: ProductHuntPlatformBrowser,
  ) {}

  /**
   * register a list of user profile-tab.
   */
  registerUserProfileTab(userProfileTabs: UserProfileTab[]) {
    this.userProfileTabSlot.register(userProfileTabs);
    return this;
  }

  /**
   * list all user profile-tab.
   */
  listUserProfileTabs() {
    return this.userProfileTabSlot.flatValues();
  }

  /**
   * register a list of user profile-action.
   */
  registerUserProfileAction(userProfileActions: UserProfileAction[]) {
    this.userProfileActionSlot.register(userProfileActions);
    return this;
  }

  /**
   * list all user profile-action.
   */
  listUserProfileActions() {
    return this.userProfileActionSlot.flatValues();
  }

  /**
   * register a list of user profile-card.
   */
  registerUserProfileCard(userProfileCards: UserProfileCard[]) {
    this.userProfileCardSlot.register(userProfileCards);
    return this;
  }

  /**
   * list all user profile-card.
   */
  listUserProfileCards() {
    return this.userProfileCardSlot.flatValues();
  }

  static dependencies = [SymphonyPlatformAspect, ProductHuntPlatformAspect];

  static async provider(
    [symphonyPlatform, productHuntPlatform]: [SymphonyPlatformBrowser, ProductHuntPlatformBrowser],
    config: PeopleConfig,
    [userProfileTabSlot, userProfileActionSlot, userProfileCardSlot]: [UserProfileTabSlot, UserProfileActionSlot, UserProfileCardSlot]
  ) {
    const people = new PeopleBrowser(config, userProfileTabSlot, userProfileActionSlot, userProfileCardSlot, symphonyPlatform, productHuntPlatform);

    // Define internal components for tabs
    const ProductsTabContent = () => (
      <div style={{ padding: 'var(--spacing-medium)', backgroundColor: 'var(--colors-surface-secondary)', borderRadius: 'var(--borders-radius-medium)', boxShadow: 'var(--effects-shadows-small)' }}>
        <h3>My Products</h3>
        <p>A curated list of products I have launched or significantly contributed to.</p>
        <div>Product 1</div>
        <div>Product 2</div>
      </div>
    );

    const ActivityTabContent = () => (
      <div style={{ padding: 'var(--spacing-medium)', backgroundColor: 'var(--colors-surface-secondary)', borderRadius: 'var(--borders-radius-medium)', boxShadow: 'var(--effects-shadows-small)' }}>
        <h3>Recent Activity</h3>
        <p>Stay updated with my latest contributions and interactions within the community.</p>
        <ul>
          <li>Commented on "The Future of AI in Design" - 2 hours ago</li>
          <li>Upvoted "InnovateHub X Launch" - 1 day ago</li>
        </ul>
      </div>
    );

    const SettingsTabContent = () => (
      <div style={{ padding: 'var(--spacing-medium)', backgroundColor: 'var(--colors-surface-secondary)', borderRadius: 'var(--borders-radius-medium)', boxShadow: 'var(--effects-shadows-small)' }}>
        <h3>Profile Settings</h3>
        <p>This is where you would edit your profile details, notification preferences, and account settings.</p>
      </div>
    );

    // Register default user profile tabs
    people.registerUserProfileTab([
      // { name: 'products', label: 'Products', component: ProductsTabContent },
      // { name: 'activity', label: 'Activity', component: ActivityTabContent },
      // { name: 'settings', label: 'Settings', component: SettingsTabContent },
    ]);

    symphonyPlatform.registerRoute([
      {
        path: '/profile/:userId',
        component: () => {
          const { userId } = useParams<{ userId: string }>();
          return <UserProfilePage userId={userId} tabs={people.listUserProfileTabs()} />;
        }
      },
      {
        path: '/profile',
        component: () => {
          return <UserProfilePage tabs={people.listUserProfileTabs()} />;
        }
      },
      {
        path: '/profile/edit',
        component: () => {
          return <EditUserProfilePage />;
        }
      },
      {
        path: '/members',
        component: () => {
          const MembersPageComponent = () => {
            const { userProfiles, loading, error } = useListUserProfiles();
            if (loading) return <div>Loading members...</div>;
            if (error) return <div>Error loading members: {(error as Error).message}</div>;
            if (!userProfiles || userProfiles.length === 0) return <div>No members found.</div>;
            return (
              <div style={{ padding: 'var(--spacing-large)' }}>
                <h2>All Members</h2>
                <MembersList members={userProfiles} />
              </div>
            );
          };
          return <MembersPageComponent />;
        }
      }
    ]);

    productHuntPlatform.registerUserBarMenuItem([
      {
        name: 'my-profile',
        label: 'My Profile',
        href: '/profile',
        icon: UserIcon,
        allowedRoles: ['user']
      }
    ]);

    productHuntPlatform.registerNavigationItem([
      {
        name: 'people-nav',
        label: 'People',
        href: '/members',
        weight: 20 // Example weight to position it in navigation
      }
    ]);

    const FeaturedMembersSectionComponent = () => {
      const { userProfiles, loading, error } = useListUserProfiles({ variables: { limit: 8 } });
      if (loading) return <div>Loading featured members...</div>;
      if (error) return <div>Error loading featured members: {(error as Error).message}</div>;
      if (!userProfiles || userProfiles.length === 0) return null; // Don't render if no members

      return (
        <div style={{ padding: 'var(--spacing-large)' }}>
          <h2>Featured Members</h2>
          <MembersList members={userProfiles} />
        </div>
      );
    };

    productHuntPlatform.registerHomepageSection([
      {
        name: 'featured-members',
        component: FeaturedMembersSectionComponent,
        weight: 10
      }
    ]);

    // productHuntPlatform.registerHeaderLink([
    //   {
    //     name: 'members-header-link',
    //     label: 'Members',
    //     href: '/members',
    //     authenticated: false // Visible to all users
    //   }
    // ]);

    return people;
  }
}

export default PeopleBrowser;