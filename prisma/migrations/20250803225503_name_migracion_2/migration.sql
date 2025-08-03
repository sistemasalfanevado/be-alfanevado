/*
  Warnings:

  - You are about to alter the column `idFirebase` on the `zentra_bank` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_bank_account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_budget_item` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_budget_item_category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_company` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_currency` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_document` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_document_type` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_movement` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_movement_category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_page` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_page_group` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_party` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_party_role` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_project` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_role` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_role_permission` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_transaction_type` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `idFirebase` on the `zentra_user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE "zentra_bank" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_bank_account" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_budget_item" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_budget_item_category" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_company" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_currency" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_document" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_document_type" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_movement" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_movement_category" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_page" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_page_group" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_party" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_party_role" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_project" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_role" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_role_permission" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_transaction_type" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "zentra_user" ALTER COLUMN "idFirebase" SET DATA TYPE VARCHAR(30);
