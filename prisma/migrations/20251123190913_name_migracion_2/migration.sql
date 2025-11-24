/*
  Warnings:

  - You are about to drop the column `documentOriginId` on the `zentra_movement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "zentra_movement" DROP CONSTRAINT "zentra_movement_documentOriginId_fkey";

-- AlterTable
ALTER TABLE "zentra_movement" DROP COLUMN "documentOriginId",
ADD COLUMN     "financialImpactId" TEXT;

-- CreateTable
CREATE TABLE "zentra_financial_impact" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_financial_impact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_movement" ADD CONSTRAINT "zentra_movement_financialImpactId_fkey" FOREIGN KEY ("financialImpactId") REFERENCES "zentra_financial_impact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
