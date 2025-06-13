import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ProductCategoryList } from './product-category-list.js';
import { type ProductCategory, mockProductCategories } from '@infinity/products.entities.product-category';
import { Flex } from '@infinity/design.layouts.flex';

// Composition 1: Default behavior with provided categories
export const DefaultWithProvidedCategories = () => {
  const categories = mockProductCategories().slice(0, 5); // Use a subset for a cleaner example
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large)' }}>
        <h2 style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', marginBottom: 'var(--spacing-medium)' }}>
          Product Categories
        </h2>
        <ProductCategoryList categories={categories} />
      </div>
    </MockProvider>
  );
};

// Composition 2: Customization and Interactivity
export const CustomizedAndInteractiveList = () => {
  const categories = mockProductCategories().slice(0, 4);
  const handleCategoryClick = (category: ProductCategory) => {
    // eslint-disable-next-line no-alert
    alert(`Navigating to category: ${category.name} (ID: ${category.id})\nBase Path Applied. Check URL if this were a real navigation.\nDescription: ${category.description}`);
  };

  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large)' }}>
        <h2 style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', marginBottom: 'var(--spacing-medium)' }}>
          Customized Category List
        </h2>
        <ProductCategoryList
          categories={categories}
          basePath="/discover/tags?tag="
          onCategoryClick={handleCategoryClick}
          className="custom-list-styling" // Example class for potential custom CSS
          style={{ 
            border: '2px solid var(--colors-primary-default)', 
            padding: 'var(--spacing-medium)', 
            borderRadius: 'var(--borders-radius-large)',
            backgroundColor: 'var(--colors-surface-primary)' 
          }}
        />
        <p style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-secondary)', marginTop: 'var(--spacing-medium)', fontSize: 'var(--typography-sizes-body-small)'}}>
          This list uses a custom base path for links (e.g., "/discover/tags?tag="), an onClick handler for each category,
          a custom CSS class, and inline styles for the container.
        </p>
      </div>
    </MockProvider>
  );
};

// Composition 3: Handling Empty State and Custom Messages
export const HandlingEmptyState = () => {
  return (
    <MockProvider>
      <Flex direction="column" gap="var(--spacing-x-large)" style={{ padding: 'var(--spacing-large)' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', marginBottom: 'var(--spacing-small)' }}>
            Default Empty Message:
          </h3>
          <ProductCategoryList categories={[]} />
        </div>
        <div>
          <h3 style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', marginBottom: 'var(--spacing-small)' }}>
            Custom Empty Message:
          </h3>
          <ProductCategoryList
            categories={[]}
            noCategoriesMessage={
              <div style={{ padding: 'var(--spacing-medium)', textAlign: 'center', color: 'var(--colors-text-secondary)'}}>
                <strong style={{display: 'block', fontSize: 'var(--typography-sizes-heading-h5)', color: 'var(--colors-text-primary)'}}>
                  No Categories Yet!
                </strong>
                We're working on adding new categories. Please check back soon for updates.
              </div>
            }
          />
        </div>
      </Flex>
    </MockProvider>
  );
};

// Composition 4: Simulating Internal Fetch States (Best Effort)
// This composition demonstrates setting custom messages for loading and error states.
// The actual display of these messages depends on the behavior of the internal
// `useListProductCategories` hook when the `categories` prop is NOT provided
// and how `MockProvider` handles Apollo Client requests in such scenarios.
export const DisplayingFetchStateMessages = () => {
  // To truly test loading/error, `MockProvider` would need to be configured with Apollo mocks
  // that introduce delay or errors for the `listProductCategories` query.
  // Since `MockProvider`'s API for this isn't specified, we'll show the component
  // as if it's attempting to fetch, primarily to demonstrate the message props.
  // The most likely outcome without specific Apollo mocks is it shows loading briefly, then an error or no categories.
  return (
    <MockProvider>
       <Flex direction="column" gap="var(--spacing-medium)" style={{ padding: 'var(--spacing-large)' }}>
        <div>
            <h3 style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', marginBottom: 'var(--spacing-small)' }}>
                Component Attempting Internal Fetch:
            </h3>
            <p style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)', marginBottom: 'var(--spacing-medium)'}}>
                The component below has no `categories` prop provided. It will attempt to use its internal data fetching.
                Custom `loadingMessage`, `errorMessage`, and `noCategoriesMessage` (if fetch results in empty) are set.
                Actual behavior depends on Apollo setup within MockProvider.
            </p>
            <ProductCategoryList
                limit={3} // Example: pass hook options
                // No 'categories' prop provided, to trigger internal fetching logic
                loadingMessage={
                    <div style={{ color: 'var(--colors-text-accent)', padding: 'var(--spacing-xlarge)', textAlign: 'center', fontSize: 'var(--typography-sizes-body-large)', fontWeight: 'var(--typography-font-weight-medium)' }}>
                        ⏳ Loading awesome product categories... Please hold on!
                    </div>
                }
                errorMessage={
                    <div style={{ 
                        color: 'var(--colors-status-negative-default)', 
                        backgroundColor: 'var(--colors-status-negative-subtle)',
                        border: `1px solid ${'var(--colors-status-negative-default)'}`,
                        borderRadius: 'var(--borders-radius-medium)',
                        padding: 'var(--spacing-large)', 
                        textAlign: 'center',
                        fontSize: 'var(--typography-sizes-body-large)'
                    }}>
                        <strong style={{display: 'block', marginBottom: 'var(--spacing-x-small)'}}>Network Error!</strong> 
                        We encountered an issue fetching categories. Please check your connection or try again later.
                    </div>
                }
                noCategoriesMessage="It seems there are no categories to display after fetching. Strange..."
            />
        </div>
      </Flex>
    </MockProvider>
  );
};