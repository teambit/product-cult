import { Launch } from './launch.js';
import { mockLaunch } from './launch.mock.js';

describe('Launch', () => {
  it('should create a Launch instance from a plain object', () => {
    const plainLaunch = {
      id: '123',
      productId: '456',
      name: 'Test Launch',
      tagline: 'Test tagline',
      description: 'Test description',
      launchDate: '2024-01-01T00:00:00.000Z',
      status: 'upcoming',
      submittedBy: '789',
      createdAt: '2023-12-01T00:00:00.000Z',
      updatedAt: '2023-12-01T00:00:00.000Z',
    };
    const launch = Launch.from(plainLaunch);
    expect(launch).toBeInstanceOf(Launch);
    expect(launch.name).toBe('Test Launch');
  });

  it('should serialize a Launch instance into a plain object', () => {
    const launch = mockLaunch();
    const plainObject = launch.toObject();
    expect(plainObject.name).toBe(launch.name);
    expect(plainObject.productId).toBe(launch.productId);
  });

  it('should create a Launch with a generated ID if no ID is provided in constructor last arg', () => {
    const launch = new Launch(
      '456', // productId
      'Test Launch', // name
      'Test tagline', // tagline
      'Test description', // description
      '2024-01-01T00:00:00.000Z', // launchDate
      'upcoming', // status
      '789', // submittedBy
      '2023-12-01T00:00:00.000Z', // createdAt
      '2023-12-01T00:00:00.000Z' // updatedAt
      // id is omitted, so it should be auto-generated
    );
    expect(launch.id).toBeDefined();
    expect(typeof launch.id).toBe('string');
  });

  it('should use provided ID if given in constructor last arg', () => {
    const specificId = 'specific-id-123';
    const launch = new Launch(
      'prod-789',
      'Specific ID Launch',
      'Tagline for specific ID',
      'Description for specific ID',
      '2024-02-01T00:00:00.000Z',
      'live',
      'user-abc',
      '2024-01-15T00:00:00.000Z',
      '2024-01-16T00:00:00.000Z',
      specificId // id
    );
    expect(launch.id).toBe(specificId);
  });
});