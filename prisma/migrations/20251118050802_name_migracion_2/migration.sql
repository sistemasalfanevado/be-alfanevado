/*
  Warnings:

  - You are about to drop the column `zentraAccountabilityId` on the `zentra_document` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "zentra_document" DROP CONSTRAINT "zentra_document_zentraAccountabilityId_fkey";

-- AlterTable
ALTER TABLE "zentra_document" DROP COLUMN "zentraAccountabilityId",
ADD COLUMN     "accountabilityId" TEXT;

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_accountabilityId_fkey" FOREIGN KEY ("accountabilityId") REFERENCES "zentra_accountability"("id") ON DELETE SET NULL ON UPDATE CASCADE;
