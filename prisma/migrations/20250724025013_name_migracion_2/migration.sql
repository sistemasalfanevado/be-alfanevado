/*
  Warnings:

  - You are about to alter the column `name` on the `zentra_project` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(100)`.
  - Added the required column `companyId` to the `zentra_project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "zentra_project" ADD COLUMN     "companyId" TEXT NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- CreateTable
CREATE TABLE "zentra_company" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_company_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_project" ADD CONSTRAINT "zentra_project_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "zentra_company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
