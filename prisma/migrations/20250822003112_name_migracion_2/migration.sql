-- AlterTable
ALTER TABLE "zentra_document" ADD COLUMN     "exchangeRateId" TEXT;

-- CreateTable
CREATE TABLE "zentra_exchange_rate" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "buyRate" DECIMAL(10,4) NOT NULL,
    "sellRate" DECIMAL(10,4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_exchange_rate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "zentra_exchange_rate_date_key" ON "zentra_exchange_rate"("date");

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_exchangeRateId_fkey" FOREIGN KEY ("exchangeRateId") REFERENCES "zentra_exchange_rate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
