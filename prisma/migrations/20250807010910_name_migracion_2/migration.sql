/*
  Warnings:

  - You are about to drop the column `companyId` on the `zentra_bank_account` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `zentra_bank_account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "zentra_bank_account" DROP CONSTRAINT "zentra_bank_account_companyId_fkey";

-- AlterTable
ALTER TABLE "zentra_bank_account" DROP COLUMN "companyId",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "zentra_bank_account" ADD CONSTRAINT "zentra_bank_account_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "zentra_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
