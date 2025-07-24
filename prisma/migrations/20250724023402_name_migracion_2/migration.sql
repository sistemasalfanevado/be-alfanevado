/*
  Warnings:

  - You are about to alter the column `name` on the `zentra_document_type` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "zentra_document_type" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- CreateTable
CREATE TABLE "zentra_budget_item_category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_budget_item_category_pkey" PRIMARY KEY ("id")
);
