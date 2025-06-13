import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import { ProductHuntPlatformAspect } from './product-hunt-platform.aspect.js';
import type { ProductHuntPlatformBrowser } from './product-hunt-platform.browser.runtime.js';
import type { ProductHuntPlatformNode } from './product-hunt-platform.node.runtime.js';

describe('ProductHuntPlatformAspect', () => {
  it('should load ProductHuntPlatformBrowser aspect', async () => {
    const productHuntPlatform = await loadAspect<ProductHuntPlatformBrowser>(ProductHuntPlatformAspect, {
      runtime: 'browser',
    });
    expect(productHuntPlatform).toBeTruthy();
  });

  it('should load ProductHuntPlatformNode aspect', async () => {
    const productHuntPlatform = await loadAspect<ProductHuntPlatformNode>(ProductHuntPlatformAspect, {
      runtime: 'node',
    });
    expect(productHuntPlatform).toBeTruthy();
  });
});