/*
  Warnings:

  - You are about to drop the column `name` on the `zentra_role_action` table. All the data in the column will be lost.
  - Added the required column `actionId` to the `zentra_role_action` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "zentra_role_action" DROP COLUMN "name",
ADD COLUMN     "actionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "zentra_action" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_action_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "zentra_action_name_key" ON "zentra_action"("name");

-- AddForeignKey
ALTER TABLE "zentra_role_action" ADD CONSTRAINT "zentra_role_action_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "zentra_action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
