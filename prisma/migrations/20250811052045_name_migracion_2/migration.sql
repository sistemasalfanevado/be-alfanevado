-- CreateTable
CREATE TABLE "zentra_document_file" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "fileName" VARCHAR(255) NOT NULL,
    "fileUrl" VARCHAR(700) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_document_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_document_file" ADD CONSTRAINT "zentra_document_file_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "zentra_document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
