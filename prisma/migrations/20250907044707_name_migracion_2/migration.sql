-- AlterTable
ALTER TABLE "zentra_document" ADD COLUMN     "totalInflow" DECIMAL(12,2) DEFAULT 0.00,
ADD COLUMN     "totalOutflow" DECIMAL(12,2) DEFAULT 0.00;
