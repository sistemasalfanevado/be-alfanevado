/*
  Warnings:

  - Added the required column `documentStatusId` to the `zentra_document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movementStatusId` to the `zentra_movement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "zentra_document" ADD COLUMN     "documentStatusId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "zentra_movement" ADD COLUMN     "movementStatusId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "zentra_document_status" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_document_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_movement_status" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_movement_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_documentStatusId_fkey" FOREIGN KEY ("documentStatusId") REFERENCES "zentra_document_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_movement" ADD CONSTRAINT "zentra_movement_movementStatusId_fkey" FOREIGN KEY ("movementStatusId") REFERENCES "zentra_movement_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
