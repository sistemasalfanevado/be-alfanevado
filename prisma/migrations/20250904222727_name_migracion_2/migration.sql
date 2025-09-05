-- CreateTable
CREATE TABLE "zentra_bank_statement" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "bankAccountId" TEXT NOT NULL,
    "statementDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "documentUrl" VARCHAR(300),
    "balance" DECIMAL(12,2) NOT NULL,
    "description" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "idFirebase" VARCHAR(30) DEFAULT '',

    CONSTRAINT "zentra_bank_statement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_bank_statement" ADD CONSTRAINT "zentra_bank_statement_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "zentra_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_bank_statement" ADD CONSTRAINT "zentra_bank_statement_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "zentra_bank_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
