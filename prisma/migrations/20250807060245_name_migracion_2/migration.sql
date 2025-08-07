/*
  Warnings:

  - You are about to drop the column `documentTypeId` on the `zentra_movement` table. All the data in the column will be lost.
  - You are about to drop the column `movementDate` on the `zentra_movement` table. All the data in the column will be lost.
  - You are about to drop the column `partyId` on the `zentra_movement` table. All the data in the column will be lost.
  - You are about to drop the column `registeredAt` on the `zentra_movement` table. All the data in the column will be lost.
  - Added the required column `autorizeDate` to the `zentra_movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exchanceRate` to the `zentra_movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generateDate` to the `zentra_movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentDate` to the `zentra_movement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "zentra_movement" DROP CONSTRAINT "zentra_movement_documentTypeId_fkey";

-- DropForeignKey
ALTER TABLE "zentra_movement" DROP CONSTRAINT "zentra_movement_partyId_fkey";

-- AlterTable
ALTER TABLE "zentra_movement" DROP COLUMN "documentTypeId",
DROP COLUMN "movementDate",
DROP COLUMN "partyId",
DROP COLUMN "registeredAt",
ADD COLUMN     "autorizeDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "exchanceRate" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "generateDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "paymentDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "code" SET DATA TYPE VARCHAR(150);
