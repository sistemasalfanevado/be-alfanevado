/*
  Warnings:

  - You are about to alter the column `name` on the `zentra_scheduled_income_document_status` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE "zentra_scheduled_income_document_status" ALTER COLUMN "name" SET DATA TYPE VARCHAR(30);
