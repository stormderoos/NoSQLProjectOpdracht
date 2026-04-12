jest.mock('bcrypt', () => ({
  genSalt: jest.fn().mockResolvedValue('salt'),
  hash: jest.fn().mockResolvedValue('hashed'),
  compare: jest.fn().mockResolvedValue(true),
}));

import mongoose from 'mongoose';
import { UserSchema } from './user.schema';

// Create a local model without a DB connection.
// validateSync() is purely in-memory and does not require a connection.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserModel = mongoose.model<any>('UserSpec', UserSchema as any);

describe('User Schema', () => {
  describe('required fields', () => {
    it('should fail validation when username is missing', () => {
      const user = new UserModel({ email: 'test@test.com', password: 'secret' } as any);
      const err = user.validateSync();
      expect(err).toBeDefined();
      expect(err!.errors['username']).toBeDefined();
    });

    it('should fail validation when email is missing', () => {
      const user = new UserModel({ username: 'testuser', password: 'secret' } as any);
      const err = user.validateSync();
      expect(err).toBeDefined();
      expect(err!.errors['email']).toBeDefined();
    });

    it('should fail validation when password is missing', () => {
      const user = new UserModel({ username: 'testuser', email: 'test@test.com' } as any);
      const err = user.validateSync();
      expect(err).toBeDefined();
      expect(err!.errors['password']).toBeDefined();
    });

    it('should pass validation with username, email and password', () => {
      const user = new UserModel({
        username: 'testuser',
        email: 'test@test.com',
        password: 'secret',
      } as any);
      const err = user.validateSync();
      expect(err).toBeUndefined();
    });
  });

  describe('default values', () => {
    it('should have role "user" by default', () => {
      const user = new UserModel({
        username: 'testuser',
        email: 'test@test.com',
        password: 'secret',
      } as any);
      expect((user as any).role).toBe('user');
    });

    it('should have a default profileImgUrl', () => {
      const user = new UserModel({
        username: 'testuser',
        email: 'test@test.com',
        password: 'secret',
      } as any);
      expect((user as any).profileImgUrl).toBeDefined();
      expect(typeof (user as any).profileImgUrl).toBe('string');
    });

    it('should have an empty string as default gender', () => {
      const user = new UserModel({
        username: 'testuser',
        email: 'test@test.com',
        password: 'secret',
      } as any);
      expect((user as any).gender).toBe('');
    });
  });

  describe('role validation', () => {
    it('should fail with an invalid role', () => {
      const user = new UserModel({
        username: 'testuser',
        email: 'test@test.com',
        password: 'secret',
        role: 'InvalidRole',
      } as any);
      const err = user.validateSync();
      expect(err).toBeDefined();
      expect(err!.errors['role']).toBeDefined();
    });

    it('should accept "admin" as role', () => {
      const user = new UserModel({
        username: 'testuser',
        email: 'test@test.com',
        password: 'secret',
        role: 'admin',
      } as any);
      const err = user.validateSync();
      expect(err).toBeUndefined();
    });
  });
});
