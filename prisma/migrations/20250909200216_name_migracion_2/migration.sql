/*
  Warnings:

  - Added the required column `partyId` to the `zentra_budget_increase_request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "zentra_budget_increase_request" ADD COLUMN     "partyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "zentra_budget_increase_request" ADD CONSTRAINT "zentra_budget_increase_request_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "zentra_party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
