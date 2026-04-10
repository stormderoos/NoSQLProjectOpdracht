import mongoose from 'mongoose';
import { ClubSchema } from './club.schema';

// Create a local model without a DB connection.
// validateSync() is purely in-memory and does not need a connection.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ClubModel = mongoose.model<any>('ClubSpec', ClubSchema as any);

describe('Club Schema', () => {
  describe('required fields', () => {
    it('should fail validation when name is missing', () => {
      const club = new ClubModel({ location: 'Breda' } as any);
      const err = club.validateSync();
      expect(err).toBeDefined();
      expect(err!.errors['name']).toBeDefined();
    });

    it('should fail validation when location is missing', () => {
      const club = new ClubModel({ name: 'FC Test' } as any);
      const err = club.validateSync();
      expect(err).toBeDefined();
      expect(err!.errors['location']).toBeDefined();
    });

    it('should pass validation with name and location', () => {
      const club = new ClubModel({ name: 'FC Test', location: 'Breda' } as any);
      const err = club.validateSync();
      expect(err).toBeUndefined();
    });
  });

  describe('default values', () => {
    it('should have an empty players array by default', () => {
      const club = new ClubModel({ name: 'FC Test', location: 'Breda' } as any);
      expect((club as any).players).toEqual([]);
    });

    it('should have a default logoUrl', () => {
      const club = new ClubModel({ name: 'FC Test', location: 'Breda' } as any);
      expect((club as any).logoUrl).toBeDefined();
      expect(typeof (club as any).logoUrl).toBe('string');
    });
  });

  describe('optional fields', () => {
    it('should accept a custom logoUrl', () => {
      const club = new ClubModel({
        name: 'FC Test',
        location: 'Breda',
        logoUrl: 'https://example.com/logo.png',
      } as any);
      expect((club as any).logoUrl).toBe('https://example.com/logo.png');
    });

    it('should accept a createdBy field', () => {
      const club = new ClubModel({
        name: 'FC Test',
        location: 'Breda',
        createdBy: 'user123',
      } as any);
      expect((club as any).createdBy).toBe('user123');
    });
  });
});
