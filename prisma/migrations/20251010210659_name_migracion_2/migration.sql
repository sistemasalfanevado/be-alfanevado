/*
  Warnings:

  - Added the required column `bankAccountId` to the `zentra_telecredito_config` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "zentra_telecredito_config" ADD COLUMN     "bankAccountId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "zentra_telecredito_config" ADD CONSTRAINT "zentra_telecredito_config_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "zentra_bank_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
