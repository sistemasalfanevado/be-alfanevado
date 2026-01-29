/*
  Warnings:

  - You are about to drop the column `percentage` on the `zentra_stage` table. All the data in the column will be lost.
  - You are about to drop the column `percentage` on the `zentra_sub_stage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "zentra_stage" DROP COLUMN "percentage",
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "zentra_sub_stage" DROP COLUMN "percentage",
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);
