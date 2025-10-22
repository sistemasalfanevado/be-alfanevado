-- CreateTable
CREATE TABLE "zentra_telecredito_operation_detail" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "telecreditoOperationId" TEXT NOT NULL,
    "totalAmount" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_telecredito_operation_detail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_telecredito_operation_detail" ADD CONSTRAINT "zentra_telecredito_operation_detail_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "zentra_document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_telecredito_operation_detail" ADD CONSTRAINT "zentra_telecredito_operation_detail_telecreditoOperationId_fkey" FOREIGN KEY ("telecreditoOperationId") REFERENCES "zentra_telecredito_operation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
