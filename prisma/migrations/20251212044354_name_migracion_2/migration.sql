-- AlterTable
ALTER TABLE "zentra_scheduled_income_document" ADD COLUMN     "transactionNatureId" TEXT;

-- CreateTable
CREATE TABLE "zentra_transaction_nature" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_transaction_nature_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_scheduled_income_document" ADD CONSTRAINT "zentra_scheduled_income_document_transactionNatureId_fkey" FOREIGN KEY ("transactionNatureId") REFERENCES "zentra_transaction_nature"("id") ON DELETE SET NULL ON UPDATE CASCADE;
