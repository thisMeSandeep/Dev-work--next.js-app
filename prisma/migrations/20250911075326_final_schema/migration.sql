/*
  Warnings:

  - A unique constraint covering the columns `[freelancerProfileId,jobId]` on the table `Proposal` will be added. If there are existing duplicate values, this will fail.
  - Made the column `rate` on table `Proposal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `Proposal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."JobStatus" ADD VALUE 'ONGOING';
ALTER TYPE "public"."JobStatus" ADD VALUE 'COMPLETED';

-- AlterTable
ALTER TABLE "public"."ClientProfile" ADD COLUMN     "jobsHired" INTEGER DEFAULT 0,
ADD COLUMN     "jobsPosted" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Proposal" ALTER COLUMN "rate" SET NOT NULL,
ALTER COLUMN "duration" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Job_category_idx" ON "public"."Job"("category");

-- CreateIndex
CREATE INDEX "Job_speciality_idx" ON "public"."Job"("speciality");

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "public"."Job"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Proposal_freelancerProfileId_jobId_key" ON "public"."Proposal"("freelancerProfileId", "jobId");
