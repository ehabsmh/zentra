import { hashPassword, verifyPassword } from './password';

describe('Password Hashing', () => {
  const rawPassword = 'password123';

  it('Hashes a password and verifies the same password', async () => {
    const hashedPassword = await hashPassword(rawPassword);
    expect(hashedPassword).not.toBe(rawPassword);

    const isValid = await verifyPassword(rawPassword, hashedPassword);
    expect(isValid).toBe(true);
  });

  it('Rejects a wrong password', async () => {
    const hashedPassword = await hashPassword(rawPassword);
    const isValid = await verifyPassword(rawPassword + '123', hashedPassword);
    expect(isValid).toBe(false);
  });
});
