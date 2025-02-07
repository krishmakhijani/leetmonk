-- AlterTable
ALTER TABLE "users" ADD COLUMN     "completed" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
