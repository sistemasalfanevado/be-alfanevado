-- DropForeignKey
ALTER TABLE "zentra_installment" DROP CONSTRAINT "zentra_installment_scheduledIncomeDocumentId_fkey";

-- AlterTable
ALTER TABLE "zentra_installment" ADD COLUMN     "scheduledDebtDocumentId" TEXT,
ALTER COLUMN "scheduledIncomeDocumentId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "zentra_scheduled_debt_document" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "statusId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_scheduled_debt_document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_scheduled_debt_document_status" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_scheduled_debt_document_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_scheduled_debt_document" ADD CONSTRAINT "zentra_scheduled_debt_document_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "zentra_document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_scheduled_debt_document" ADD CONSTRAINT "zentra_scheduled_debt_document_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "zentra_scheduled_debt_document_status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_installment" ADD CONSTRAINT "zentra_installment_scheduledIncomeDocumentId_fkey" FOREIGN KEY ("scheduledIncomeDocumentId") REFERENCES "zentra_scheduled_income_document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_installment" ADD CONSTRAINT "zentra_installment_scheduledDebtDocumentId_fkey" FOREIGN KEY ("scheduledDebtDocumentId") REFERENCES "zentra_scheduled_debt_document"("id") ON DELETE SET NULL ON UPDATE CASCADE;
