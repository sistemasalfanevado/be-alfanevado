/*
  Warnings:

  - You are about to drop the column `totalAmount` on the `zentra_accountability` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "zentra_accountability" DROP COLUMN "totalAmount",
ADD COLUMN     "amountToPay" DECIMAL(12,2) NOT NULL DEFAULT 0.00;
