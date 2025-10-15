/*
  Warnings:

  - You are about to alter the column `checkItf` on the `zentra_telecredito_config` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1)`.
  - You are about to alter the column `checkParty` on the `zentra_telecredito_config` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1)`.

*/
-- AlterTable
ALTER TABLE "zentra_telecredito_config" ALTER COLUMN "checkItf" SET DATA TYPE VARCHAR(1),
ALTER COLUMN "checkParty" SET DATA TYPE VARCHAR(1);
