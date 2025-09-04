-- CreateTable
CREATE TABLE "zentra_installment_status" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_installment_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_installment" (
    "id" TEXT NOT NULL,
    "scheduledIncomeDocumentId" TEXT NOT NULL,
    "installmentStatusId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "capital" DECIMAL(12,2) NOT NULL,
    "interest" DECIMAL(12,2) NOT NULL,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_installment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_installment" ADD CONSTRAINT "zentra_installment_scheduledIncomeDocumentId_fkey" FOREIGN KEY ("scheduledIncomeDocumentId") REFERENCES "zentra_scheduled_income_document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_installment" ADD CONSTRAINT "zentra_installment_installmentStatusId_fkey" FOREIGN KEY ("installmentStatusId") REFERENCES "zentra_installment_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
