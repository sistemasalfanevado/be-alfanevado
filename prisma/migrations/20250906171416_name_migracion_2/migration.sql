/*
  Warnings:

  - Added the required column `currencyId` to the `zentra_installment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "zentra_installment" ADD COLUMN     "currencyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "zentra_installment" ADD CONSTRAINT "zentra_installment_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "zentra_currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
