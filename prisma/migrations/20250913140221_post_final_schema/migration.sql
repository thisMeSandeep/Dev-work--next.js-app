-- AlterTable
ALTER TABLE "public"."ClientProfile" ADD COLUMN     "totalSpent" DOUBLE PRECISION DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."FreelancerProfile" ADD COLUMN     "jobsApplied" INTEGER DEFAULT 0,
ADD COLUMN     "totalIncome" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "totalJobsHired" INTEGER DEFAULT 0;
