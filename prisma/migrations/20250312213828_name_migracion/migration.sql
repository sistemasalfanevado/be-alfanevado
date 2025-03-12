/*
  Warnings:

  - You are about to drop the column `length` on the `landing_lot` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `landing_lot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "landing_lot" DROP COLUMN "length",
DROP COLUMN "width",
ADD COLUMN     "area" DECIMAL(7,3),
ADD COLUMN     "detail" VARCHAR(500);
