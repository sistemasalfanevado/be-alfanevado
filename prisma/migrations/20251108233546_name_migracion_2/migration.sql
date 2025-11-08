/*
  Warnings:

  - You are about to drop the column `statusId` on the `zentra_scheduled_debt_document` table. All the data in the column will be lost.
  - You are about to drop the `zentra_scheduled_debt_document_status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "zentra_scheduled_debt_document" DROP CONSTRAINT "zentra_scheduled_debt_document_statusId_fkey";

-- AlterTable
ALTER TABLE "zentra_scheduled_debt_document" DROP COLUMN "statusId";

-- DropTable
DROP TABLE "zentra_scheduled_debt_document_status";
