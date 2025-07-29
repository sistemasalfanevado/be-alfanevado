/*
  Warnings:

  - You are about to drop the column `canCreate` on the `zentra_role_permission` table. All the data in the column will be lost.
  - You are about to drop the column `canDelete` on the `zentra_role_permission` table. All the data in the column will be lost.
  - You are about to drop the column `canEdit` on the `zentra_role_permission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "zentra_role_permission" DROP COLUMN "canCreate",
DROP COLUMN "canDelete",
DROP COLUMN "canEdit";
