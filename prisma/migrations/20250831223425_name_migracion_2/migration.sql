/*
  Warnings:

  - You are about to drop the column `exchangeRate` on the `zentra_movement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "zentra_movement" DROP COLUMN "exchangeRate",
ADD COLUMN     "exchangeRateId" TEXT;

-- AddForeignKey
ALTER TABLE "zentra_movement" ADD CONSTRAINT "zentra_movement_exchangeRateId_fkey" FOREIGN KEY ("exchangeRateId") REFERENCES "zentra_exchange_rate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
