import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useListProductCategories } from '@infinity/products.hooks.use-product-category';
import type { ProductCategory } from '@infinity/products.entities.product-category';
import { SelectList, type SelectListOption } from '@infinity/design.inputs.select-list';
import styles from './product-category-filter.module.scss';

const ALL_CATEGORIES_OPTION_VALUE = "___ALL_CATEGORIES___";

/**
 * Props for the ProductCategoryFilter component.
 */
export type ProductCategoryFilterProps = {
  /**
   * The ID of the currently selected product category.
   * If undefined, it implies "All Categories" or no filter selected.
   */
  selectedCategoryId?: string;

  /**
   * Callback function invoked when the selected category changes.
   * Receives the ID of the newly selected category, or undefined if "All Categories" is chosen.
   */
  onCategoryChange: (categoryId: string | undefined) => void;

  /**
   * Optional mock data for product categories.
   * If provided, the hook will use this data instead of fetching from the server.
   * Useful for testing or development scenarios.
   */
  mockCategoriesData?: ProductCategory[];

  /**
   * Optional CSS class name to apply to the root element of the component.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the root element of the component.
   */
  style?: React.CSSProperties;

  /**
   * Text for the "All Categories" option.
   * If the component is loading, "Loading Categories..." will be displayed for this option.
   * @default "All Categories"
   */
  placeholder?: string;

  /**
   * Label for the SelectList, displayed above the dropdown.
   * @default "Category"
   */
  label?: string;
};

/**
 * ProductCategoryFilter is a component that allows users to filter products by category.
 * It fetches product categories using the `useListProductCategories` hook and displays them
 * in a `SelectList` component. It provides a modern and responsive UI for category selection.
 */
export function ProductCategoryFilter({
  selectedCategoryId,
  onCategoryChange,
  mockCategoriesData,
  className,
  style,
  placeholder = "All Categories",
  label = "Category",
}: ProductCategoryFilterProps) {
  const {
    productCategories,
    loading,
    error,
  } = useListProductCategories({
    mockData: mockCategoriesData,
    // Consider adding limit/offset if the number of categories can be very large,
    // though typically for filters, all categories are fetched.
    // limit: 100,
  });

  const effectivePlaceholderLabel = loading ? "Loading Categories..." : placeholder;

  const finalSelectOptions: SelectListOption[] = useMemo(() => {
    const options: SelectListOption[] = [{
      value: ALL_CATEGORIES_OPTION_VALUE,
      label: effectivePlaceholderLabel,
    }];

    if (!loading && !error && productCategories) {
      productCategories.forEach((category) => {
        options.push({
          value: category.id,
          label: category.name,
        });
      });
    }
    return options;
  }, [loading, error, productCategories, effectivePlaceholderLabel]);


  const handleSelectionChange = (value: string | string[]) => {
    // Assuming SelectList is used for single selection here as `multiple` is not true.
    const newSelectedId = value as string;
    if (newSelectedId === ALL_CATEGORIES_OPTION_VALUE) {
      onCategoryChange(undefined);
    } else {
      onCategoryChange(newSelectedId);
    }
  };

  // Determine the value for the SelectList.
  // If loading, it should show "Loading Categories..." as the selected item.
  const currentValueForSelectList = loading ? ALL_CATEGORIES_OPTION_VALUE : (selectedCategoryId || ALL_CATEGORIES_OPTION_VALUE);

  if (error) {
    // Render a dedicated error state for the filter
    // This provides a clear indication to the user that something went wrong.
    return (
      <div className={classNames(styles.productCategoryFilter, styles.errorContainer, className)} style={style}>
        {label && <span className={styles.filterLabel}>{label}</span>}
        <div className={styles.errorMessageContent}>
          Error loading categories. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(styles.productCategoryFilter, className)} style={style}>
      <SelectList
        id="product-category-filter-select"
        label={label}
        options={finalSelectOptions}
        value={currentValueForSelectList}
        onChange={handleSelectionChange}
        disabled={loading} // Disable interaction while data is loading
        className={styles.selectListCustom} // Allows for specific styling overrides if needed
        dropdownMaxHeight="300px" // Controls the maximum height of the dropdown list
        // Message displayed when the dropdown is open but no options (other than current selection) are available
        emptyMessage={
          !loading && finalSelectOptions.length <= 1 && productCategories && productCategories.length === 0
            ? "No categories found" // Specific message when no categories are fetched
            : "No options available" // Generic fallback
        }
      />
    </div>
  );
}