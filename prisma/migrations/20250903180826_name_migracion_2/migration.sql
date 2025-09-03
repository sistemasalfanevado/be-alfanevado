-- CreateTable
CREATE TABLE "zentra_sale_type" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_sale_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_broker" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_broker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_scheduled_income_document" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "brokerId" TEXT,
    "saleTypeId" TEXT,
    "lotId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_scheduled_income_document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_scheduled_income_document" ADD CONSTRAINT "zentra_scheduled_income_document_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "zentra_document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_scheduled_income_document" ADD CONSTRAINT "zentra_scheduled_income_document_brokerId_fkey" FOREIGN KEY ("brokerId") REFERENCES "zentra_broker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_scheduled_income_document" ADD CONSTRAINT "zentra_scheduled_income_document_saleTypeId_fkey" FOREIGN KEY ("saleTypeId") REFERENCES "zentra_sale_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_scheduled_income_document" ADD CONSTRAINT "zentra_scheduled_income_document_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "landing_lot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
