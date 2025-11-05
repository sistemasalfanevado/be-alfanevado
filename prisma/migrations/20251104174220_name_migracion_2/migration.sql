-- AlterTable
ALTER TABLE "landing_lot" ADD COLUMN     "pricePerSquareMeter" DECIMAL(10,2) DEFAULT 0,
ADD COLUMN     "totalPrice" DECIMAL(12,2) DEFAULT 0;
