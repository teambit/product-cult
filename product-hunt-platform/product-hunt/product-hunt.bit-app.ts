import { HarmonyPlatform } from '@bitdev/harmony.harmony-platform';
import { KubernetesAspect } from '@bitdev/symphony.deployers.kubernetes';
import { NodeJSRuntime } from '@bitdev/harmony.runtimes.nodejs-runtime';
import { BrowserRuntime } from '@bitdev/harmony.runtimes.browser-runtime';
import { SymphonyPlatformAspect } from '@bitdev/symphony.symphony-platform';

import { ProductHuntPlatformAspect } from '@infinity/product-hunt-platform.product-hunt-platform';
import { PeopleAspect } from '@infinity/people.people';
import { SearchAspect } from '@infinity/search.search';
import { ProductsAspect } from '@infinity/products.products';
import { NewsAspect } from '@infinity/news.news';
import { ForumsAspect } from '@infinity/forums.forums';
import { NotificationsAspect } from '@infinity/notifications.notifications';
import { ReviewsAspect } from '@infinity/reviews.reviews';
import { LaunchesAspect } from '@infinity/launches.launches';

/**
  * Compose the product-hunt platform.
  */
export const ProductHunt = HarmonyPlatform.from({
  name: 'product-hunt',
  platform: [SymphonyPlatformAspect, {
    name: 'Product Hunt',
    slogan: 'Discover your next favorite thing',
    domain: 'product-hunt.teambit.games',
    logo: 'https://static.bit.dev/extensions-icons/product-hunt.svg',
  }],

  runtimes: [
    new BrowserRuntime(),
    new NodeJSRuntime()
  ],

  aspects: [
    // Feature aspects composed into the platform
    ProductHuntPlatformAspect,
    PeopleAspect,
    SearchAspect,
    ProductsAspect,
    // NewsAspect,
    ForumsAspect,
    // NotificationsAspect,
    ReviewsAspect,
    LaunchesAspect,
  ],
});

export default ProductHunt;
