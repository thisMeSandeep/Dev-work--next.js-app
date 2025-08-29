/*
  Warnings:

  - You are about to drop the column `emailOTP` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `otpExpiresAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Job" ADD COLUMN     "attachment" TEXT;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "emailOTP",
DROP COLUMN "emailVerified",
DROP COLUMN "otpExpiresAt";
