const BASE = 'http://localhost:3000/api';

async function post(path: string, body: unknown, token?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST', headers, body: JSON.stringify(body),
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

async function put(path: string, body: unknown, token?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, {
    method: 'PUT', headers, body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  return { status: res.status, data };
}

async function del(path: string, token?: string) {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, { method: 'DELETE', headers });
  return { status: res.status };
}

describe('Clubs endpoints', () => {
  let token: string;
  let clubId: string;

  beforeAll(async () => {
    const email = `clubtest_${Date.now()}@test.com`;
    await post('/auth/register', {
      username: 'clubtestuser_' + Date.now(),
      email,
      password: 'Test1234!',
    });
    const { data } = await post('/auth/login', { email, password: 'Test1234!' });
    token = data.token;
  });

  describe('GET /clubs', () => {
    it('should return a list of clubs (happy flow)', async () => {
      const { status, data } = await get('/clubs', token);
      expect(status).toBe(200);
      expect(Array.isArray(data.results)).toBe(true);
    });

    it('should return 401 without token (failure)', async () => {
      const { status } = await get('/clubs');
      expect(status).toBe(401);
    });
  });

  describe('POST /clubs', () => {
    it('should create a new club (happy flow)', async () => {
      const { status, data } = await post('/clubs', {
        name: `TestClub_${Date.now()}`,
        location: 'Breda',
      }, token);
      expect(status).toBe(201);
      expect(data.results).toHaveProperty('_id');
      clubId = data.results._id;
    });

    it('should return 400 when name is missing (failure)', async () => {
      const { status } = await post('/clubs', { location: 'Breda' }, token);
      expect(status).toBe(400);
    });

    it('should return 401 without token (failure)', async () => {
      const { status } = await post('/clubs', { name: 'Unauthorized', location: 'X' });
      expect(status).toBe(401);
    });
  });

  describe('GET /clubs/:id', () => {
    it('should return a club by ID (happy flow)', async () => {
      const { status, data } = await get(`/clubs/${clubId}`, token);
      expect(status).toBe(200);
      expect(data.results._id).toBe(clubId);
    });

    it('should return 404 for a non-existing club (failure)', async () => {
      const { status } = await get('/clubs/000000000000000000000000', token);
      expect(status).toBe(404);
    });
  });

  describe('PUT /clubs/:id', () => {
    it('should update a club (happy flow)', async () => {
      const { status } = await put(`/clubs/${clubId}`, {
        name: 'UpdatedClub',
        location: 'Rotterdam',
      }, token);
      expect(status).toBe(200);
    });
  });

  describe('DELETE /clubs/:id', () => {
    it('should delete a club (happy flow)', async () => {
      const { status } = await del(`/clubs/${clubId}`, token);
      expect(status).toBe(204);
    });

    it('should return 404 after deleting the club (failure)', async () => {
      const { status } = await get(`/clubs/${clubId}`, token);
      expect(status).toBe(404);
    });
  });
});
