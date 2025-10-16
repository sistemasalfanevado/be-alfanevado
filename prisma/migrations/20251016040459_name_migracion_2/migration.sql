-- AlterTable
ALTER TABLE "zentra_scheduled_income_document" ADD COLUMN     "statusId" TEXT;

-- CreateTable
CREATE TABLE "zentra_scheduled_income_document_status" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_scheduled_income_document_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_scheduled_income_document" ADD CONSTRAINT "zentra_scheduled_income_document_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "zentra_scheduled_income_document_status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
