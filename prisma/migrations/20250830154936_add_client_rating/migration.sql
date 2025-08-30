/*
  Warnings:

  - Added the required column `rating` to the `ClientProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ClientProfile" ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL;
