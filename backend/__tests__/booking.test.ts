import request from 'supertest';
import app from '../src/app';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      booking: {
        findMany: jest.fn().mockResolvedValue([
          {
            id: 1,
            guestName: 'Sebas Quesada',
            guestPhoneNumber: '88888888',
            checkInDate: '2025-07-05',
            checkOutDate: '2025-07-07',
            hotelId: 1,
            eventId: 1,
          },
        ]),
      },
    })),
  };
});

describe('GET /api/bookings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and an array', async () => {
    const res = await request(app)
      .get('/api/bookings');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
