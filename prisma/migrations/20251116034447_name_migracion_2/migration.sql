-- AlterTable
ALTER TABLE "zentra_document" ADD COLUMN     "documentTransactionMethodId" TEXT;

-- CreateTable
CREATE TABLE "zentra_document_transaction_method" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_document_transaction_method_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_documentTransactionMethodId_fkey" FOREIGN KEY ("documentTransactionMethodId") REFERENCES "zentra_document_transaction_method"("id") ON DELETE SET NULL ON UPDATE CASCADE;
