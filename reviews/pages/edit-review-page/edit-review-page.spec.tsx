/// <reference types="vitest/globals" />
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { EditReviewPage } from './edit-review-page.js';
import { useGetReview, useUpdateReview } from '@infinity/reviews.hooks.use-reviews';

// Mock the hooks module. This is allowed per specific instruction override.
vi.mock('@infinity/reviews.hooks.use-reviews', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    useGetReview: vi.fn(),
    useUpdateReview: vi.fn(),
  };
});

// Placeholder for Review type as it's not clearly exported or defined in the provided API for @infinity/reviews.hooks.use-reviews
type Review = {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt?: string;
  updatedAt?: string;
};

// Typed mock functions
const mockUseGetReview = useGetReview as ReturnType<typeof vi.fn>;
const mockUseUpdateReview = useUpdateReview as ReturnType<typeof vi.fn>;

const REVIEW_ID = "review-to-edit-123";
const PRODUCT_ID = "ai-super-widget-789";

const sampleReviewData: Review = {
  id: REVIEW_ID,
  productId: PRODUCT_ID,
  userId: 'user-jane-doe-456',
  rating: 4,
  comment: "The AI Super Widget has been a game-changer for my productivity. The predictive features are incredibly accurate. My only suggestion would be to enhance the customization options for the dashboard.",
  createdAt: new Date('2023-10-15T10:00:00Z').toISOString(),
  updatedAt: new Date('2023-10-16T14:30:00Z').toISOString(),
};

const setup = (overrideGetReview?: any, overrideUpdateReview?: any) => {
  mockUseGetReview.mockReset();
  mockUseUpdateReview.mockReset();

  mockUseGetReview.mockReturnValue(overrideGetReview || {
    review: sampleReviewData, // Assuming the hook returns { review: ReviewData, ... }
    loading: false,
    error: null,
    refetch: vi.fn(),
  });

  const mockUpdateMutationFn = vi.fn().mockResolvedValue({
    // Assuming the mutation data directly contains the updated review
    // if the error "Property 'updateReview' does not exist on type 'Review'"
    // implies the 'data' field of the mutation result IS the review.
    // Otherwise, it would be { updateReview: { ... } }
    ...sampleReviewData,
    comment: "Updated: The dashboard customization is now much better after the latest patch!",
    rating: 5,
    updatedAt: new Date().toISOString(),
  });
  mockUseUpdateReview.mockReturnValue(overrideUpdateReview || [
    mockUpdateMutationFn,
    { data: null, loading: false, error: null },
  ]);

  const renderResult = render(
    <MockProvider noRouter>
      <MemoryRouter initialEntries={[`/reviews/edit/${REVIEW_ID}`]}>
        <Routes>
          <Route path="/reviews/edit/:reviewId" element={<EditReviewPage />} />
        </Routes>
      </MemoryRouter>
    </MockProvider>
  );

  return { ...renderResult, mockUpdateMutationFn };
};

it('renders the edit review page with initial data', () => {
  const { container } = setup();

  expect(screen.getByRole('heading', { name: /Edit Your Review/i, level: 1 })).toBeInTheDocument();
  const ratingInput = container.querySelector<HTMLInputElement>('input#rating');
  expect(ratingInput?.value).toBe(String(sampleReviewData.rating));
  
  // Assuming TextInput renders an input/textarea that can be found by its label
  const commentInput = screen.getByLabelText<HTMLTextAreaElement | HTMLInputElement>('Your Comment:');
  expect(commentInput?.value).toBe(sampleReviewData.comment);
});

it('updates the review on form submission', async () => {
  const { mockUpdateMutationFn } = setup();

  const ratingInput = screen.getByLabelText<HTMLInputElement>(/Your Rating/i); // More robust selector
  fireEvent.change(ratingInput!, { target: { value: '4.5' } });
  
  const commentInput = screen.getByLabelText<HTMLTextAreaElement | HTMLInputElement>('Your Comment:');
  fireEvent.change(commentInput!, { target: { value: 'New comment' } });


  const saveButton = screen.getByRole('button', { name: /Save Changes/i });
  fireEvent.click(saveButton!);

  expect(mockUpdateMutationFn).toHaveBeenCalledWith({
    id: REVIEW_ID,
    rating: 4.5,
    comment: 'New comment',
  });
});

it('displays an error message when rating is invalid', async () => {
  setup();

  const ratingInput = screen.getByLabelText<HTMLInputElement>(/Your Rating/i);
  fireEvent.change(ratingInput!, { target: { value: 'invalid' } });

  const saveButton = screen.getByRole('button', { name: /Save Changes/i });
  fireEvent.click(saveButton!);

  const errorMessage = await screen.findByText('Rating must be a valid number between 1 and 5 (e.g., 3 or 4.5).');
  expect(errorMessage).toBeInTheDocument();
});