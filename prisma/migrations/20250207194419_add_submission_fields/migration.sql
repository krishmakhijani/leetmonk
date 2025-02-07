/*
  Warnings:

  - Added the required column `totalAccepted` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSubmissions` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalAccepted" INTEGER NOT NULL,
ADD COLUMN     "totalSubmissions" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
