/*
  Warnings:

  - You are about to drop the column `description` on the `zentra_party_bank_account` table. All the data in the column will be lost.
  - Made the column `bankId` on table `zentra_party_bank_account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currencyId` on table `zentra_party_bank_account` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "zentra_party_bank_account" DROP CONSTRAINT "zentra_party_bank_account_bankId_fkey";

-- DropForeignKey
ALTER TABLE "zentra_party_bank_account" DROP CONSTRAINT "zentra_party_bank_account_currencyId_fkey";

-- AlterTable
ALTER TABLE "zentra_party_bank_account" DROP COLUMN "description",
ALTER COLUMN "bankId" SET NOT NULL,
ALTER COLUMN "currencyId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "zentra_party_bank_account" ADD CONSTRAINT "zentra_party_bank_account_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "zentra_bank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_party_bank_account" ADD CONSTRAINT "zentra_party_bank_account_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "zentra_currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
