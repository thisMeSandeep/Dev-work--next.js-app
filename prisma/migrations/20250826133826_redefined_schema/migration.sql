-- CreateEnum
CREATE TYPE "public"."ExperienceLevel" AS ENUM ('EXPERT', 'INTERMEDIATE', 'ENTRY');

-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('SOFTWARE_DEV', 'DATA_SCIENCE', 'ENGINEERING', 'IT_NETWORKING', 'DESIGN_CREATIVE');

-- CreateEnum
CREATE TYPE "public"."Speciality" AS ENUM ('DESKTOP_SOFTWARE', 'SCRIPTING_AUTOMATION', 'AI_CHATBOT', 'AI_INTEGRATION', 'MOBILE_APP', 'MOBILE_GAME', 'WEB_DESIGN', 'UX_UI', 'DATABASE_DEV', 'BACKEND_DEV', 'FRONTEND_DEV', 'FULLSTACK_DEV', 'CMS_DEV', 'GAME_DEV', 'EMERGING_TECH', 'AR_VR', 'CODING_TUTORING');

-- CreateEnum
CREATE TYPE "public"."JobStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."ScopeSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "public"."ScopeDuration" AS ENUM ('ONE_TO_THREE_MONTHS', 'THREE_TO_SIX_MONTHS', 'MORE_THAN_SIX_MONTHS');

-- CreateEnum
CREATE TYPE "public"."ProposalStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "public"."EstimatedDuration" AS ENUM ('LESS_THAN_ONE_MONTH', 'ONE_TO_THREE_MONTHS', 'THREE_TO_SIX_MONTHS', 'MORE_THAN_SIX_MONTHS');

-- CreateEnum
CREATE TYPE "public"."ClientRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "public"."FreelancerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "mobile" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "skills" TEXT[],
    "category" "public"."Category" NOT NULL,
    "speciality" "public"."Speciality" NOT NULL,
    "experienceLevel" "public"."ExperienceLevel" NOT NULL,
    "perHourRate" DOUBLE PRECISION NOT NULL,
    "languages" TEXT NOT NULL,
    "connects" INTEGER NOT NULL DEFAULT 200,
    "portfolioLink" TEXT,
    "otherLink" TEXT,
    "file" TEXT,

    CONSTRAINT "FreelancerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ClientProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "websiteLink" TEXT,

    CONSTRAINT "ClientProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."Category" NOT NULL,
    "speciality" "public"."Speciality" NOT NULL,
    "skills" TEXT[],
    "budget" DOUBLE PRECISION NOT NULL,
    "status" "public"."JobStatus" NOT NULL DEFAULT 'OPEN',
    "numberOfProposals" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "scopeSize" "public"."ScopeSize" NOT NULL,
    "duration" "public"."ScopeDuration" NOT NULL,
    "experience" "public"."ExperienceLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "connectsRequired" INTEGER NOT NULL DEFAULT 1,
    "clientId" TEXT NOT NULL,
    "hiredFreelancerId" TEXT,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Proposal" (
    "id" TEXT NOT NULL,
    "coverLetter" TEXT NOT NULL,
    "message" TEXT,
    "rate" DOUBLE PRECISION NOT NULL,
    "duration" "public"."EstimatedDuration" NOT NULL,
    "attachedFile" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."ProposalStatus" NOT NULL DEFAULT 'PENDING',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "freelancerProfileId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ClientRequest" (
    "id" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."ClientRequestStatus" NOT NULL DEFAULT 'PENDING',
    "jobId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "developerId" TEXT NOT NULL,

    CONSTRAINT "ClientRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_SavedJobs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SavedJobs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "FreelancerProfile_userId_key" ON "public"."FreelancerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientProfile_userId_key" ON "public"."ClientProfile"("userId");

-- CreateIndex
CREATE INDEX "_SavedJobs_B_index" ON "public"."_SavedJobs"("B");

-- AddForeignKey
ALTER TABLE "public"."FreelancerProfile" ADD CONSTRAINT "FreelancerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClientProfile" ADD CONSTRAINT "ClientProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."ClientProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_hiredFreelancerId_fkey" FOREIGN KEY ("hiredFreelancerId") REFERENCES "public"."FreelancerProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Proposal" ADD CONSTRAINT "Proposal_freelancerProfileId_fkey" FOREIGN KEY ("freelancerProfileId") REFERENCES "public"."FreelancerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Proposal" ADD CONSTRAINT "Proposal_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClientRequest" ADD CONSTRAINT "ClientRequest_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClientRequest" ADD CONSTRAINT "ClientRequest_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."ClientProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClientRequest" ADD CONSTRAINT "ClientRequest_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "public"."FreelancerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SavedJobs" ADD CONSTRAINT "_SavedJobs_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."FreelancerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SavedJobs" ADD CONSTRAINT "_SavedJobs_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
