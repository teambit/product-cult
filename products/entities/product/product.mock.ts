import { Product } from './product.js';
import { ProductVariant } from './product-variant.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generates an array of mock ProductVariant instances.
 * @param count The number of mock product variants to generate. Defaults to 2.
 * @returns {ProductVariant[]} An array of mock ProductVariant instances.
 */
export function mockProductVariants(count: number = 2): ProductVariant[] {
  const variants: ProductVariant[] = [];
  for (let i = 0; i < count; i++) {
    variants.push(
      ProductVariant.from({
        name: `Variant ${i + 1} (Size M)`,
        sku: `SKU-${uuidv4().slice(0, 8)}`,
        price: parseFloat((Math.random() * 50 + 10).toFixed(2)), // Price between 10 and 60
        imageUrls: [`https://picsum.photos/seed/${uuidv4()}/200/300`],
      })
    );
  }
  return variants;
}

/**
 * Generates an array of mock Product instances.
 * @returns {Product[]} An array of mock Product instances.
 */
export function mockProducts(): Product[] {
  return [
    Product.from({
      id: uuidv4(),
      name: 'Super Amazing Gadget',
      description: 'This gadget will change your life. It slices, it dices, and so much more!',
      price: 99.99,
      imageUrls: [
        `https://picsum.photos/seed/${uuidv4()}/600/400`,
        `https://picsum.photos/seed/${uuidv4()}/600/400`,
      ],
      videoUrls: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
      categoryId: uuidv4(),
      variants: mockProductVariants(2),
      submitterUserId: uuidv4(),
    }),
    Product.from({
      id: uuidv4(),
      name: 'Eco-Friendly Water Bottle',
      description: 'Stay hydrated and save the planet with this stylish reusable water bottle.',
      price: 24.50,
      imageUrls: [`https://picsum.photos/seed/${uuidv4()}/600/400`],
      videoUrls: [],
      categoryId: uuidv4(),
      variants: mockProductVariants(1),
      submitterUserId: uuidv4(),
    }),
    Product.from({
      id: uuidv4(),
      name: 'Wireless Noise-Cancelling Headphones',
      description: 'Immerse yourself in sound with these top-of-the-line headphones.',
      price: 199.00,
      imageUrls: [
        `https://picsum.photos/seed/${uuidv4()}/600/400`,
        `https://picsum.photos/seed/${uuidv4()}/600/400`,
        `https://picsum.photos/seed/${uuidv4()}/600/400`,
      ],
      videoUrls: [],
      categoryId: uuidv4(),
      variants: [], // No variants for this one
      submitterUserId: uuidv4(),
    }),
  ];
}