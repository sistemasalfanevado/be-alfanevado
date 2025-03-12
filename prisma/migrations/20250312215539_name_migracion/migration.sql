/*
  Warnings:

  - You are about to alter the column `area` on the `landing_lot` table. The data in that column could be lost. The data in that column will be cast from `Decimal(7,3)` to `Decimal(6,2)`.
  - You are about to alter the column `perimeter` on the `landing_lot` table. The data in that column could be lost. The data in that column will be cast from `Decimal(7,3)` to `Decimal(6,2)`.

*/
-- AlterTable
ALTER TABLE "landing_lot" ALTER COLUMN "area" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "perimeter" SET DATA TYPE DECIMAL(6,2);
