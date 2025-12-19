-- AlterTable
ALTER TABLE "zentra_installment" ADD COLUMN     "documentDate" TIMESTAMP(3),
ADD COLUMN     "documentTypeId" TEXT;

-- AddForeignKey
ALTER TABLE "zentra_installment" ADD CONSTRAINT "zentra_installment_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "zentra_document_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
