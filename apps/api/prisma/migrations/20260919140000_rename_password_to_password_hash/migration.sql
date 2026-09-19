-- Rename the stored hash column to match the locked User field name.
ALTER TABLE "User" RENAME COLUMN "password" TO "passwordHash";
