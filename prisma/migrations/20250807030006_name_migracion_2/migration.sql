/*
  Warnings:

  - You are about to drop the column `bankAccountId` on the `zentra_document` table. All the data in the column will be lost.
  - You are about to drop the column `movementCategoryId` on the `zentra_document` table. All the data in the column will be lost.
  - Added the required column `expireDate` to the `zentra_document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observation` to the `zentra_document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `zentra_document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "zentra_document" DROP CONSTRAINT "zentra_document_bankAccountId_fkey";

-- DropForeignKey
ALTER TABLE "zentra_document" DROP CONSTRAINT "zentra_document_movementCategoryId_fkey";

-- AlterTable
ALTER TABLE "zentra_document" DROP COLUMN "bankAccountId",
DROP COLUMN "movementCategoryId",
ADD COLUMN     "amountToPay" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "detractionAmount" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "detractionRate" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "expireDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "guaranteeFundAmount" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "netAmount" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "observation" VARCHAR(500) NOT NULL,
ADD COLUMN     "paidAmount" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "taxAmount" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "totalAmount" SET DEFAULT 0.00;

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "zentra_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
