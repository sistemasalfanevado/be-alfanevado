/*
  Warnings:

  - Added the required column `documentDate` to the `zentra_document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registeredAt` to the `zentra_document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movementDate` to the `zentra_movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registeredAt` to the `zentra_movement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "zentra_document" ADD COLUMN     "documentDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "registeredAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "zentra_movement" ADD COLUMN     "movementDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "registeredAt" TIMESTAMP(3) NOT NULL;
