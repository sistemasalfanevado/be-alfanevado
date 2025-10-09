/*
  Warnings:

  - You are about to drop the `zentra_party_bank_account_hierarchy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `zentra_party_bank_account_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "zentra_party_bank_account" DROP CONSTRAINT "zentra_party_bank_account_hierarchyId_fkey";

-- DropForeignKey
ALTER TABLE "zentra_party_bank_account" DROP CONSTRAINT "zentra_party_bank_account_typeId_fkey";

-- DropTable
DROP TABLE "zentra_party_bank_account_hierarchy";

-- DropTable
DROP TABLE "zentra_party_bank_account_type";

-- CreateTable
CREATE TABLE "zentra_bank_account_type" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_bank_account_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_bank_account_hierarchy" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_bank_account_hierarchy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_party_bank_account" ADD CONSTRAINT "zentra_party_bank_account_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "zentra_bank_account_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_party_bank_account" ADD CONSTRAINT "zentra_party_bank_account_hierarchyId_fkey" FOREIGN KEY ("hierarchyId") REFERENCES "zentra_bank_account_hierarchy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
