/*
  Warnings:

  - Made the column `createdAt` on table `Occasion` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Occasion` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Occasion` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Occasion" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;
