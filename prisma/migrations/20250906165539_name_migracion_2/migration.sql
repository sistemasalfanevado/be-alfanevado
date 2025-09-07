/*
  Warnings:

  - Added the required column `description` to the `zentra_installment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "zentra_installment" ADD COLUMN     "description" VARCHAR(200) NOT NULL,
ADD COLUMN     "paidAmount" DECIMAL(12,2) NOT NULL DEFAULT 0.00;
