import { render, screen } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ProductCategoryList } from './product-category-list.js';
import { mockProductCategories, type ProductCategory } from '@infinity/products.entities.product-category';
import styles from './product-category-list.module.scss';
import { vi } from 'vitest';

describe('ProductCategoryList', () => {
  it('should render a list of product categories', () => {
    const categories: ProductCategory[] = mockProductCategories().slice(0, 3);
    const { container } = render(
      <MockProvider>
        <ProductCategoryList categories={categories} />
      </MockProvider>
    );

    const categoryLinks = container.querySelectorAll(`.${styles.categoryLink}`);
    expect(categoryLinks).toHaveLength(categories.length);
    expect(categoryLinks[0].textContent).toBe(categories[0].name);
  });

  it('should render "No categories found." message when categories is empty', () => {
    const { container } = render(
      <MockProvider>
        <ProductCategoryList categories={[]} />
      </MockProvider>
    );

    const noCategoriesMessage = container.querySelector(`.${styles.messageContainer}.${styles.noCategoriesMessage}`);
    expect(noCategoriesMessage?.textContent).toBe('No categories found.');
  });

  it('should call onCategoryClick when a category link is clicked', () => {
    const categories: ProductCategory[] = mockProductCategories().slice(0, 1);
    const onCategoryClick = vi.fn();
    render(
      <MockProvider>
        <ProductCategoryList categories={categories} onCategoryClick={onCategoryClick} />
      </MockProvider>
    );
    const categoryLink = screen.getByText(categories[0].name);
    categoryLink.click();
    expect(onCategoryClick).toHaveBeenCalledWith(categories[0]);
  });
});