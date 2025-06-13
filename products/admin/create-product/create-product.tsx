import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { TextInput } from '@infinity/design.inputs.text-input';
import { SelectList, SelectListOption } from '@infinity/design.inputs.select-list';
import { Button } from '@infinity/design.actions.button';
import { useCreateProduct, CreateProductOptions } from '@infinity/products.hooks.use-products';
import { useListProductCategories } from '@infinity/products.hooks.use-product-category';
import { ProductCategory } from '@infinity/products.entities.product-category';
import { useAuth } from '@infinity/product-hunt-platform.hooks.use-auth';
import { ProtectedRoute } from '@infinity/product-hunt-platform.ui.protected-route';

import styles from './create-product.module.scss';

export type CreateProductPageProps = {
  /**
   * Optional CSS class name to apply to the component's root element.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the component's root element.
   */
  style?: React.CSSProperties;
};

/**
 * CreateProductPage is an admin-facing page for creating new products.
 * It includes a form for product details and uses hooks to interact with the product service.
 */
export function CreateProductPage({ className, style }: CreateProductPageProps) {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [createProductMutation, { loading: createLoading, error: createMutationError, data: createData }] = useCreateProduct();
  const { productCategories, loading: categoriesLoading, error: categoriesFetchError } = useListProductCategories();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);

  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (createData?.createProduct) {
      setFormSuccess(`Product "${createData.createProduct.name}" created successfully! Redirecting...`);
      setFormError(null);
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      setSelectedCategoryId(undefined);
      
      setTimeout(() => {
        navigate(`/products/${createData.createProduct.id}`);
      }, 1500); // Delay for user to read success message
    }
  }, [createData, navigate]);

  useEffect(() => {
    if (createMutationError) {
      setFormError(createMutationError.message || 'Failed to create product. Please try again.');
      setFormSuccess(null);
    }
  }, [createMutationError]);

  useEffect(() => {
    if (categoriesFetchError) {
      // Do not overwrite formError if it's already set by a create error
      if(!formError) {
        setFormError(categoriesFetchError.message || 'Failed to load product categories.');
      }
      setFormSuccess(null);
    }
  }, [categoriesFetchError, formError]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!user) {
      setFormError('You must be logged in to create a product.');
      return;
    }

    if (!name.trim() || !description.trim() || !price.trim() || !selectedCategoryId) {
      setFormError('Please fill in all required fields: Name, Description, Price, and Category.');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setFormError('Price must be a valid non-negative number.');
      return;
    }
    
    if (imageUrl.trim()) {
      try {
        // tslint:disable-next-line:no-unused-expression
        // eslint-disable-next-line no-new
        new URL(imageUrl.trim());
      } catch (_) {
        setFormError('Please enter a valid Image URL if provided.');
        return;
      }
    }

    const productOptions: CreateProductOptions = {
      name: name.trim(),
      description: description.trim(),
      price: parsedPrice,
      categoryId: selectedCategoryId,
      imageUrls: imageUrl.trim() ? [imageUrl.trim()] : [],
      videoUrls: [],
      // variants: [], // Assuming variants is optional or handled elsewhere if not in form
    };

    try {
      await createProductMutation(productOptions);
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('An unexpected error occurred during product creation.');
      }
    }
  };

  const categoryOptions: SelectListOption[] = productCategories
    ? productCategories.map((category: ProductCategory) => ({
        value: category.id,
        label: category.name,
      }))
    : [];

  const isSubmitting = createLoading || authLoading; // categoriesLoading only disables the SelectList

  return (
    <ProtectedRoute redirectTo="/" className={className} style={style}>
      <PageLayout title="Create New Product" className={styles.createProductPage}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>Launch Your Product</h1>

          {formError && <div className={styles.errorMessage}>{formError}</div>}
          {formSuccess && <div className={styles.successMessage}>{formSuccess}</div>}

          <div className={styles.formField}>
            <label htmlFor="productName" className={styles.label}>Product Name*</label>
            <TextInput
              id="productName"
              value={name}
              onChange={setName}
              placeholder="e.g., My Awesome App"
              name="productName"
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="productDescription" className={styles.label}>Description*</label>
            <TextInput
              id="productDescription"
              value={description}
              onChange={setDescription}
              placeholder="Tell us about your amazing product"
              name="productDescription"
              // For a multi-line feel, you might add custom styles for height if TextInput allows via className
              // e.g., style={{minHeight: '100px'}} if needed, but prefer class-based styling
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="productPrice" className={styles.label}>Price ($)*</label>
            <TextInput
              id="productPrice"
              type="number"
              value={price}
              onChange={setPrice}
              placeholder="0.00"
              name="productPrice"
            />
          </div>
          
          <div className={styles.formField}>
            <label htmlFor="productImageUrl" className={styles.label}>Image URL (Optional)</label>
            <TextInput
              id="productImageUrl"
              value={imageUrl}
              onChange={setImageUrl}
              placeholder="https://example.com/your-product-image.png"
              name="productImageUrl"
              type="url"
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="productCategory" className={styles.label}>Category*</label>
            <SelectList
              id="productCategory"
              options={categoryOptions}
              value={selectedCategoryId}
              onChange={(val) => setSelectedCategoryId(val as string)}
              placeholder="Choose the best fit for your product"
              name="productCategory"
              disabled={isSubmitting || categoriesLoading}
              emptyMessage={categoriesLoading ? "Loading categories..." : (categoriesFetchError ? "Error loading categories" : "No categories found")}
            />
          </div>
          
          <Button
            type="submit"
            appearance="primary"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {createLoading ? 'Submitting Product...' : 'Submit Product'}
          </Button>
        </form>
      </PageLayout>
    </ProtectedRoute>
  );
}