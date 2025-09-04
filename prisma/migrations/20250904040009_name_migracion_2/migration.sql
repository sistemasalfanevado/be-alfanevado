/*
  Warnings:

  - Added the required column `extra` to the `zentra_installment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "zentra_installment" ADD COLUMN     "extra" DECIMAL(12,2) NOT NULL;
