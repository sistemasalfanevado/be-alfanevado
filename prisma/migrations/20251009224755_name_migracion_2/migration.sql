-- CreateTable
CREATE TABLE "zentra_telecredito_config" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "clientCode" TEXT NOT NULL,
    "payrollType" TEXT NOT NULL,
    "recordType" TEXT NOT NULL DEFAULT 'C',
    "accountType" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "reference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_telecredito_config_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_telecredito_config" ADD CONSTRAINT "zentra_telecredito_config_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "zentra_company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
