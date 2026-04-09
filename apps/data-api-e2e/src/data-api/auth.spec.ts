const BASE = 'http://localhost:3000/api';

async function post(path: string, body: unknown, token?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  return { status: res.status, data };
}

async function get(path: string, token?: string) {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, { headers });
  const data = await res.json().catch(() => null);
  return { status: res.status, data };
}

describe('Auth endpoints', () => {
  const testUser = {
    username: 'testuser_' + Date.now(),
    email: `testuser_${Date.now()}@test.com`,
    password: 'Test1234!',
  };

  describe('POST /auth/register', () => {
    it('should register a new user and return a token (happy flow)', async () => {
      const { status, data } = await post('/auth/register', testUser);
      expect(status).toBe(201);
      expect(data).toHaveProperty('token');
      expect(data.email).toBe(testUser.email);
    });

    it('should return 409 when registering with an existing email (failure)', async () => {
      const { status } = await post('/auth/register', testUser);
      expect(status).toBe(409);
    });

    it('should return 400 when required fields are missing (failure)', async () => {
      const { status } = await post('/auth/register', { email: 'no-password@test.com' });
      expect(status).toBe(400);
    });
  });

  describe('POST /auth/login', () => {
    it('should login and return a token (happy flow)', async () => {
      const { status, data } = await post('/auth/login', {
        email: testUser.email,
        password: testUser.password,
      });
      expect(status).toBe(201);
      expect(data).toHaveProperty('token');
    });

    it('should return 401 with wrong password (failure)', async () => {
      const { status } = await post('/auth/login', {
        email: testUser.email,
        password: 'wrongpassword',
      });
      expect(status).toBe(401);
    });

    it('should return 401 with non-existing email (failure)', async () => {
      const { status } = await post('/auth/login', {
        email: 'doesnotexist@test.com',
        password: 'Test1234!',
      });
      expect(status).toBe(401);
    });
  });

  describe('Protected routes', () => {
    it('should return 401 when accessing a protected route without token (failure)', async () => {
      const { status } = await get('/clubs');
      expect(status).toBe(401);
    });
  });
});
