/*
  Warnings:

  - Added the required column `documentCategoryId` to the `zentra_document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "zentra_document" ADD COLUMN     "documentCategoryId" TEXT NOT NULL,
ADD COLUMN     "hasMovements" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "zentra_document_category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_document_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_documentCategoryId_fkey" FOREIGN KEY ("documentCategoryId") REFERENCES "zentra_document_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
