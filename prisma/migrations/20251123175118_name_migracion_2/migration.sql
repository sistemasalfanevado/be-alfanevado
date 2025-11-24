-- AlterTable
ALTER TABLE "zentra_document" ADD COLUMN     "documentOriginId" TEXT;

-- CreateTable
CREATE TABLE "zentra_document_origin" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_document_origin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_documentOriginId_fkey" FOREIGN KEY ("documentOriginId") REFERENCES "zentra_document_origin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
