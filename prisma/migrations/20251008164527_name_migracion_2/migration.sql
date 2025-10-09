-- AlterTable
ALTER TABLE "zentra_party_bank_account" ADD COLUMN     "hierarchyId" VARCHAR(36),
ADD COLUMN     "typeId" VARCHAR(36);

-- CreateTable
CREATE TABLE "zentra_party_bank_account_type" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_party_bank_account_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_party_bank_account_hierarchy" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_party_bank_account_hierarchy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_party_bank_account" ADD CONSTRAINT "zentra_party_bank_account_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "zentra_party_bank_account_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_party_bank_account" ADD CONSTRAINT "zentra_party_bank_account_hierarchyId_fkey" FOREIGN KEY ("hierarchyId") REFERENCES "zentra_party_bank_account_hierarchy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
