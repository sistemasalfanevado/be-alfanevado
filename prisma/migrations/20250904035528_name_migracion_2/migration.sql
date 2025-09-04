/*
  Warnings:

  - You are about to drop the column `number` on the `zentra_installment` table. All the data in the column will be lost.
  - Added the required column `letra` to the `zentra_installment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "zentra_installment" DROP COLUMN "number",
ADD COLUMN     "letra" INTEGER NOT NULL;
