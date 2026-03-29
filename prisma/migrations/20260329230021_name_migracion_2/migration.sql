/*
  Warnings:

  - You are about to drop the `lot_quotation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quotation_milestone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "lot_quotation" DROP CONSTRAINT "lot_quotation_lotId_fkey";

-- DropForeignKey
ALTER TABLE "lot_quotation" DROP CONSTRAINT "lot_quotation_paymentPlanId_fkey";

-- DropForeignKey
ALTER TABLE "quotation_milestone" DROP CONSTRAINT "quotation_milestone_quotationId_fkey";

-- DropTable
DROP TABLE "lot_quotation";

-- DropTable
DROP TABLE "quotation_milestone";

-- CreateTable
CREATE TABLE "zentra_lot_quotation" (
    "id" TEXT NOT NULL,
    "clientName" VARCHAR(100) NOT NULL,
    "lotId" TEXT NOT NULL,
    "paymentPlanId" TEXT NOT NULL,
    "area" DECIMAL(10,2) NOT NULL,
    "pricePerSqMeter" DECIMAL(10,2) NOT NULL,
    "totalLotPrice" DECIMAL(16,4) NOT NULL,
    "downPaymentPercentage" DECIMAL(5,2) NOT NULL,
    "downPaymentAmount" DECIMAL(16,4) NOT NULL,
    "totalMonths" INTEGER,
    "annualInterest" DECIMAL(5,2),
    "monthlyInstallment" DECIMAL(16,4),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_lot_quotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_quotation_milestone" (
    "id" TEXT NOT NULL,
    "quotationId" TEXT NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(16,4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "zentra_quotation_milestone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_lot_quotation" ADD CONSTRAINT "zentra_lot_quotation_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "landing_lot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_lot_quotation" ADD CONSTRAINT "zentra_lot_quotation_paymentPlanId_fkey" FOREIGN KEY ("paymentPlanId") REFERENCES "zentra_payment_plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_quotation_milestone" ADD CONSTRAINT "zentra_quotation_milestone_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "zentra_lot_quotation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
