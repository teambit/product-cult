import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { ProtectedRoute } from '@infinity/product-hunt-platform.ui.protected-route';
import { TextInput } from '@infinity/design.inputs.text-input';
import { Button } from '@infinity/design.actions.button';
import { SelectList, type SelectListOption } from '@infinity/design.inputs.select-list';
import { Product } from '@infinity/products.entities.product';
import { ProductCategory } from '@infinity/products.entities.product-category';
import { useGetProduct, useUpdateProduct, type UpdateProductOptions } from '@infinity/products.hooks.use-products';
import { useListProductCategories } from '@infinity/products.hooks.use-product-category';
import classNames from 'classnames';
import styles from './edit-product.module.scss';

/**
 * Interface for the product form data state.
 */
interface ProductFormData {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  imageUrls: string; // Comma-separated
  videoUrls: string; // Comma-separated
}

const defaultFormData: ProductFormData = {
  name: ``,
  description: ``,
  price: ``,
  categoryId: ``,
  imageUrls: ``,
  videoUrls: ``,
};

/**
 * Props for the EditProduct component.
 */
export type EditProductProps = {
  /**
   * Optional CSS class name to apply to the root element of the component.
   * This allows for custom styling or overrides.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the component's root element.
   * Use sparingly; prefer `className` and SCSS modules for styling.
   */
  style?: React.CSSProperties;
};

/**
 * EditProduct is an admin page component for editing an existing product.
 * It fetches product data, populates a form, and allows updating the product.
 */
export function EditProduct({ className, style }: EditProductProps): React.JSX.Element {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProductFormData>(defaultFormData);
  const [formError, setFormError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);

  const { product, loading: productLoading, error: productErrorRef } = useGetProduct({
    id: productId || '', 
  });

  const { productCategories, loading: categoriesLoading, error: categoriesErrorRef } = useListProductCategories();
  const [updateProduct, { loading: updateLoading, error: updateErrorRef }] = useUpdateProduct();

  useEffect(() => {
    if (product) {
      const typedProduct = product as Product; // Cast if product is generic from hook
      setFormData({
        name: typedProduct.name,
        description: typedProduct.description,
        price: typedProduct.price.toString(),
        categoryId: typedProduct.categoryId,
        imageUrls: (typedProduct.imageUrls || []).join(','),
        videoUrls: (typedProduct.videoUrls || []).join(','),
      });
      setFormError(null);
      setUpdateSuccess(null);
    }
  }, [product]);

  const handleTextInputChange = useCallback((fieldName: keyof ProductFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  }, []);

  const handleCategoryChange = useCallback((value: string | string[]) => {
    setFormData((prev) => ({ ...prev, categoryId: Array.isArray(value) ? value[0] || '' : value }));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setUpdateSuccess(null);

    if (!productId) {
      setFormError("Product ID is missing.");
      return;
    }

    const priceAsNumber = parseFloat(formData.price);
    if (Number.isNaN(priceAsNumber) || priceAsNumber < 0) {
      setFormError("Price must be a valid non-negative number.");
      return;
    }
    if (!formData.name.trim()) {
      setFormError("Product name is required.");
      return;
    }
    if (!formData.description.trim()) {
      setFormError("Product description is required.");
      return;
    }
    if (!formData.categoryId) {
      setFormError("Product category is required.");
      return;
    }


    const productUpdateOptions: UpdateProductOptions = {
      id: productId,
      name: formData.name,
      description: formData.description,
      price: priceAsNumber,
      categoryId: formData.categoryId,
      imageUrls: formData.imageUrls.split(',').map(url => url.trim()).filter(url => url),
      videoUrls: formData.videoUrls.split(',').map(url => url.trim()).filter(url => url),
    };

    try {
      const result = await updateProduct({ ...productUpdateOptions }); // Ensure variables are passed correctly
      if (result.data?.updateProduct) {
        setUpdateSuccess('Product updated successfully!');
        // Optional: navigate to product page after a delay or reset form for further edits.
        // navigate(`/products/${productId}`); 
      } else if (result.errors) {
        setFormError(result.errors.map(e => e.message).join(', '));
      }
    } catch (e: any) {
      setFormError(e.message || 'An unexpected error occurred during update.');
    }
  };

  const categoryOptions: SelectListOption[] = productCategories
    ? productCategories.map((category: ProductCategory) => ({ 
        value: category.id,
        label: category.name,
      }))
    : [];

  if (productLoading || categoriesLoading) {
    return (
      <PageLayout title="Edit Product">
        <div className={styles.loadingContainer}>Loading product details...</div>
      </PageLayout>
    );
  }

  const pageError = productErrorRef || categoriesErrorRef;
  if (pageError) {
    return (
      <PageLayout title="Error Editing Product">
        <div className={styles.errorContainer}>
          Error loading data: {pageError.message}
        </div>
      </PageLayout>
    );
  }

  if (!product && !productLoading) {
     return (
      <PageLayout title="Product Not Found">
        <div className={styles.errorContainer}>Product not found. It may have been removed or the ID is incorrect.</div>
      </PageLayout>
    );
  }


  return (
    <ProtectedRoute>
      <PageLayout title={`Edit Product - ${formData.name || 'Details'}`} className={classNames(styles.editProductPage, className)}>
        <form onSubmit={handleSubmit} className={styles.editProductForm}>
          <h1 className={styles.pageTitle}>Edit Product</h1>

          {formError && <div className={styles.errorMessage}>{formError}</div>}
          {updateSuccess && <div className={styles.successMessage}>{updateSuccess}</div>}
          {updateErrorRef && <div className={styles.errorMessage}>Update failed: {updateErrorRef.message}</div>}

          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Product Name</label>
            <TextInput
              id="name"
              name="name"
              value={formData.name}
              onChange={handleTextInputChange('name')}
              placeholder="Enter product name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>Description</label>
            <TextInput
              id="description"
              name="description"
              // Assuming TextInput can handle multi-line or you might need a TextArea component
              // For now, using TextInput as specified in allowed components
              value={formData.description} 
              onChange={handleTextInputChange('description')}
              placeholder="Enter product description"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price" className={styles.label}>Price</label>
            <TextInput
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleTextInputChange('price')}
              placeholder="Enter product price (e.g., 19.99)"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="categoryId" className={styles.label}>Category</label>
            <SelectList
              id="categoryId"
              name="categoryId"
              options={categoryOptions}
              value={formData.categoryId}
              onChange={handleCategoryChange}
              placeholder="Select a category"
              disabled={categoriesLoading || !!categoriesErrorRef}
            />
             {categoriesLoading && <p className={styles.inlineMessage}>Loading categories...</p>}
             {categoriesErrorRef && <p className={styles.errorMessage}>Error loading categories: {categoriesErrorRef.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="imageUrls" className={styles.label}>Image URLs (comma-separated)</label>
            <TextInput
              id="imageUrls"
              name="imageUrls"
              value={formData.imageUrls}
              onChange={handleTextInputChange('imageUrls')}
              placeholder="e.g., https://image1.com/img.png, https://image2.com/pic.jpg"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="videoUrls" className={styles.label}>Video URLs (comma-separated)</label>
            <TextInput
              id="videoUrls"
              name="videoUrls"
              value={formData.videoUrls}
              onChange={handleTextInputChange('videoUrls')}
              placeholder="e.g., https://youtube.com/watch?v=..., https://vimeo.com/..."
            />
          </div>

          <Button type="submit" appearance="primary" disabled={updateLoading} className={styles.submitButton}>
            {updateLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </PageLayout>
    </ProtectedRoute>
  );
}