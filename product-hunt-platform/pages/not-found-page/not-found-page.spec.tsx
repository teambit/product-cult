import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { NotFoundPage } from './not-found-page.js';
import styles from './not-found-page.module.scss';

describe('NotFoundPage Component', () => {
  it('renders with default props', () => {
    const { container } = render(
      <MockProvider>
        <NotFoundPage />
      </MockProvider>
    );

    expect(container.querySelector(`.${styles.notFoundPage}`)).toBeInTheDocument();
    expect(container.querySelector(`.${styles.errorTitle}`)).toHaveTextContent('404 - Page Not Found');
    expect(container.querySelector(`.${styles.errorMessage}`)).toBeInTheDocument();
    expect(container.querySelector(`.${styles.homeLink}`)).toHaveTextContent('Return to Mission Control (Homepage)');
  });

  it('renders with custom props', () => {
    const customTitle = 'Custom Title';
    const customMessage = 'Custom Message';
    const customLinkText = 'Custom Link';
    const customHomePageRoute = '/custom';

    const { container } = render(
      <MockProvider>
        <NotFoundPage
          titleText={customTitle}
          messageText={customMessage}
          linkText={customLinkText}
          homePageRoute={customHomePageRoute}
        />
      </MockProvider>
    );

    expect(container.querySelector(`.${styles.errorTitle}`)).toHaveTextContent(customTitle);
    expect(container.querySelector(`.${styles.errorMessage}`)).toHaveTextContent(customMessage);
    expect(container.querySelector(`.${styles.homeLink}`)).toHaveTextContent(customLinkText);
  });

  it('navigates to the custom home page route when the link is clicked', () => {
      const customHomePageRoute = '/custom';
      const { container } = render(
          <MockProvider>
              <NotFoundPage homePageRoute={customHomePageRoute} />
          </MockProvider>
      );

      const linkElement = container.querySelector(`.${styles.homeLink}`) as HTMLAnchorElement;
      expect(linkElement.href).toContain(customHomePageRoute);
  });
});