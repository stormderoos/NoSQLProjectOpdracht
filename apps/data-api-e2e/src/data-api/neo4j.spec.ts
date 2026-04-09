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

async function del(path: string, token?: string) {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, { method: 'DELETE', headers });
  const data = await res.json().catch(() => null);
  return { status: res.status, data };
}

describe('Neo4j users endpoints', () => {
  let tokenA: string;
  let userAId: string;
  let userBId: string;

  beforeAll(async () => {
    const resA = await post('/auth/register', {
      username: 'neo4j_userA_' + Date.now(),
      email: `neo4j_userA_${Date.now()}@test.com`,
      password: 'Test1234!',
    });
    tokenA = resA.data.token;
    userAId = resA.data.id;

    const resB = await post('/auth/register', {
      username: 'neo4j_userB_' + Date.now(),
      email: `neo4j_userB_${Date.now()}@test.com`,
      password: 'Test1234!',
    });
    userBId = resB.data.id;
  });

  describe('POST /neo4j/users/:id/follow', () => {
    it('should follow another user (happy flow)', async () => {
      const { status, data } = await post(`/neo4j/users/${userBId}/follow`, {}, tokenA);
      expect(status).toBe(201);
      expect(data.results.message).toBe('Followed');
    });

    it('should return 400 when following yourself (failure)', async () => {
      const { status } = await post(`/neo4j/users/${userAId}/follow`, {}, tokenA);
      expect(status).toBe(400);
    });

    it('should return 401 without token (failure)', async () => {
      const { status } = await post(`/neo4j/users/${userBId}/follow`, {});
      expect(status).toBe(401);
    });
  });

  describe('GET /neo4j/users/following', () => {
    it('should return users that I follow (happy flow)', async () => {
      const { status, data } = await get('/neo4j/users/following', tokenA);
      expect(status).toBe(200);
      expect(Array.isArray(data.results)).toBe(true);
      expect(data.results).toContain(userBId);
    });

    it('should return 401 without token (failure)', async () => {
      const { status } = await get('/neo4j/users/following');
      expect(status).toBe(401);
    });
  });

  describe('DELETE /neo4j/users/:id/follow', () => {
    it('should unfollow a user (happy flow)', async () => {
      const { status, data } = await del(`/neo4j/users/${userBId}/follow`, tokenA);
      expect(status).toBe(200);
      expect(data.results.message).toBe('Unfollowed');
    });

    it('should no longer show unfollowed user in following list', async () => {
      const { data } = await get('/neo4j/users/following', tokenA);
      expect(data.results).not.toContain(userBId);
    });
  });
});
