-- CreateTable
CREATE TABLE "lot_quotation" (
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

    CONSTRAINT "lot_quotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotation_milestone" (
    "id" TEXT NOT NULL,
    "quotationId" TEXT NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(16,4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quotation_milestone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lot_quotation" ADD CONSTRAINT "lot_quotation_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "landing_lot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lot_quotation" ADD CONSTRAINT "lot_quotation_paymentPlanId_fkey" FOREIGN KEY ("paymentPlanId") REFERENCES "zentra_payment_plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotation_milestone" ADD CONSTRAINT "quotation_milestone_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "lot_quotation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
