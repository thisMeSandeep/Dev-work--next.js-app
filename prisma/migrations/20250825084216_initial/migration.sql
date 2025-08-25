-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('DEVELOPER', 'CLIENT');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "country" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "public"."Role" NOT NULL,
    "profileImage" TEXT,
    "authProviderId" TEXT,
    "emailOTP" TEXT,
    "otpExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
