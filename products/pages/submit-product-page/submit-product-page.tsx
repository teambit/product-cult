import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { TextInput } from '@infinity/design.inputs.text-input';
import { Button } from '@infinity/design.actions.button';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './submit-product-page.module.scss';

// GraphQL Mutation
const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($options: CreateProductOptionsInput!) {
    createProduct(options: $options) {
      id
      name
      description
      price
      imageUrls
      categoryId
    }
  }
`;

/**
 * Props for the SubmitProductPage component.
 */
export type SubmitProductPageProps = {
  /**
   * Optional CSS class name to apply to the root element of the component.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element of the component.
   */
  style?: React.CSSProperties;
};

/**
 * SubmitProductPage allows users to submit new products to the platform.
 * It includes a form for product details and uses a GraphQL mutation to create the product.
 */
export function SubmitProductPage({
  className,
  style,
}: SubmitProductPageProps): React.JSX.Element {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');

  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT_MUTATION, {
    onCompleted: (data) => {
      setFormSuccess(`Product '${data.createProduct.name}' submitted successfully!`);
      setFormError(null);
      setProductName('');
      setDescription('');
      setImageUrl('');
      setCategoryId('');
      setPrice('');
      // Navigate to the newly created product's page or a general products page
      if (data.createProduct.id) {
        navigate(`/products/${data.createProduct.id}`);
      } else {
        navigate('/products');
      }
    },
    onError: (error) => {
      setFormError(`Submission failed: ${error.message}`);
      setFormSuccess(null);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!productName || !description || !categoryId || !price) {
      setFormError('Please fill in all required fields: Product Name, Description, Category ID, and Price.');
      return;
    }

    const numericPrice = parseFloat(price);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
        setFormError('Please enter a valid positive price.');
        return;
    }

    createProduct({
      variables: {
        options: {
          name: productName,
          description,
          price: numericPrice,
          imageUrls: imageUrl ? [imageUrl] : [],
          categoryId,
          videoUrls: [], // Not collected in this form
          variants: [], // Not collected in this form
        },
      },
    });
  };

  return (
    <PageLayout
      title="Submit New Product - Infinity"
      metaDescription="Share your latest product with the Infinity community by submitting its details through this form."
      className={classNames(styles.submitProductPageLayout, className)}
    >
      <div className={styles.submitProductPage} style={style}>
        <h1 className={styles.pageTitle}>Submit Your Product</h1>
        <p className={styles.pageSubtitle}>
          Got something new and exciting? Share it with the world! Fill out the
          details below to get your product listed.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="productName" className={styles.label}>Product Name</label>
            <TextInput
              id="productName"
              placeholder="e.g., My Awesome App"
              value={productName}
              onChange={setProductName}
              name="productName"
              className={styles.textInput}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description" className={styles.label}>Product Description</label>
            <TextInput
              id="description"
              placeholder="A brief and compelling description of your product."
              value={description}
              onChange={setDescription}
              name="description"
              className={styles.textInput} 
            />
             <small className={styles.inputHint}>Tell us what makes your product special. Keep it concise and engaging.</small>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="imageUrl" className={styles.label}>Image URL (Optional)</label>
            <TextInput
              id="imageUrl"
              placeholder="https://example.com/your-product-image.png"
              value={imageUrl}
              onChange={setImageUrl}
              name="imageUrl"
              type="url"
              className={styles.textInput}
            />
            <small className={styles.inputHint}>A direct link to a high-quality image of your product.</small>
          </div>

          <div className={styles.inputGroup}>
             <label htmlFor="categoryId" className={styles.label}>Category ID</label>
            <TextInput
              id="categoryId"
              placeholder="e.g., SaaS, MobileApp, DeveloperTool"
              value={categoryId}
              onChange={setCategoryId}
              name="categoryId"
              className={styles.textInput}
            />
            <small className={styles.inputHint}>Enter the relevant category ID for your product.</small>
          </div>

           <div className={styles.inputGroup}>
            <label htmlFor="price" className={styles.label}>Price (USD)</label>
            <TextInput
              id="price"
              placeholder="e.g., 29.99 or 0 for free"
              value={price}
              onChange={setPrice}
              name="price"
              type="number"
              className={styles.textInput}
            />
            <small className={styles.inputHint}>Enter the price in USD. Use 0 for free products.</small>
          </div>

          {formError ? <p className={styles.errorMessage}>{formError}</p> : null}
          {formSuccess ? <p className={styles.successMessage}>{formSuccess}</p> : null}

          <div className={styles.submitButtonContainer}>
            <Button type="submit" appearance="primary" disabled={loading} className={styles.submitButton}>
              {loading ? 'Submitting...' : 'Submit Product'}
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}