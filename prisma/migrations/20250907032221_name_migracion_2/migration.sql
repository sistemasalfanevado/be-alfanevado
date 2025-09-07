-- AlterTable
ALTER TABLE "zentra_document" ADD COLUMN     "financialNatureId" TEXT;

-- CreateTable
CREATE TABLE "zentra_financial_nature" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "movementCategoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "idFirebase" VARCHAR(30) DEFAULT '',

    CONSTRAINT "zentra_financial_nature_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_financialNatureId_fkey" FOREIGN KEY ("financialNatureId") REFERENCES "zentra_financial_nature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_financial_nature" ADD CONSTRAINT "zentra_financial_nature_movementCategoryId_fkey" FOREIGN KEY ("movementCategoryId") REFERENCES "zentra_movement_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
