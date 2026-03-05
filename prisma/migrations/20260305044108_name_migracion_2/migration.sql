-- AlterTable
ALTER TABLE "zentra_document" ADD COLUMN     "documentBudgetStatusId" TEXT;

-- CreateTable
CREATE TABLE "zentra_document_budget_status" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_document_budget_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_documentBudgetStatusId_fkey" FOREIGN KEY ("documentBudgetStatusId") REFERENCES "zentra_document_budget_status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
