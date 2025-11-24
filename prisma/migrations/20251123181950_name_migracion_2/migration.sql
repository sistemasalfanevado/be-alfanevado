-- AlterTable
ALTER TABLE "zentra_movement" ADD COLUMN     "documentOriginId" TEXT;

-- AddForeignKey
ALTER TABLE "zentra_movement" ADD CONSTRAINT "zentra_movement_documentOriginId_fkey" FOREIGN KEY ("documentOriginId") REFERENCES "zentra_document_origin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
