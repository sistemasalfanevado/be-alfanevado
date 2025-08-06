/*
  Warnings:

  - You are about to drop the column `categoryId` on the `zentra_budget_item` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `zentra_budget_item` table. All the data in the column will be lost.
  - Added the required column `definitionId` to the `zentra_budget_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "zentra_budget_item" DROP CONSTRAINT "zentra_budget_item_categoryId_fkey";

-- AlterTable
ALTER TABLE "zentra_budget_item" DROP COLUMN "categoryId",
DROP COLUMN "name",
ADD COLUMN     "definitionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "zentra_budget_item_definition" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "categoryId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "idFirebase" VARCHAR(30) DEFAULT '',

    CONSTRAINT "zentra_budget_item_definition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_budget_item_definition" ADD CONSTRAINT "zentra_budget_item_definition_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "zentra_budget_item_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_budget_item_definition" ADD CONSTRAINT "zentra_budget_item_definition_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "zentra_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_budget_item" ADD CONSTRAINT "zentra_budget_item_definitionId_fkey" FOREIGN KEY ("definitionId") REFERENCES "zentra_budget_item_definition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
