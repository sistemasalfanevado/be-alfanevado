/*
  Warnings:

  - You are about to drop the column `number` on the `zentra_bank_account` table. All the data in the column will be lost.
  - Added the required column `amount` to the `zentra_bank_account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "zentra_bank_account" DROP COLUMN "number",
ADD COLUMN     "amount" DECIMAL(12,2) NOT NULL;
