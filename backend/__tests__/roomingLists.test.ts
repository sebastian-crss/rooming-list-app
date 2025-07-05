import request from 'supertest';
import app from '../src/app';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      roomingList: {
        findMany: jest.fn().mockResolvedValue([
          { id: 1, rfpName: 'Test RFP' }
        ])
      }
    }))
  };
});

describe('GET /api/rooming-lists', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and an array', async () => {
    const res = await request(app)
      .get('/api/rooming-lists');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
