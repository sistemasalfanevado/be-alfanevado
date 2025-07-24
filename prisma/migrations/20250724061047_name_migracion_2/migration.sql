-- CreateTable
CREATE TABLE "zentra_budget_item" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currencyId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_budget_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_bank_account" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "number" VARCHAR(30) NOT NULL,
    "bankId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_bank_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_document" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "transactionTypeId" TEXT NOT NULL,
    "movementCategoryId" TEXT NOT NULL,
    "documentTypeId" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "budgetItemId" TEXT NOT NULL,
    "bankAccountId" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_movement" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "documentId" TEXT NOT NULL,
    "transactionTypeId" TEXT NOT NULL,
    "movementCategoryId" TEXT NOT NULL,
    "documentTypeId" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "budgetItemId" TEXT NOT NULL,
    "bankAccountId" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_movement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_budget_item" ADD CONSTRAINT "zentra_budget_item_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "zentra_currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_budget_item" ADD CONSTRAINT "zentra_budget_item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "zentra_budget_item_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_budget_item" ADD CONSTRAINT "zentra_budget_item_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "zentra_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_bank_account" ADD CONSTRAINT "zentra_bank_account_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "zentra_bank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_bank_account" ADD CONSTRAINT "zentra_bank_account_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "zentra_company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_bank_account" ADD CONSTRAINT "zentra_bank_account_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "zentra_currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_transactionTypeId_fkey" FOREIGN KEY ("transactionTypeId") REFERENCES "zentra_transaction_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_movementCategoryId_fkey" FOREIGN KEY ("movementCategoryId") REFERENCES "zentra_movement_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "zentra_document_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "zentra_party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_budgetItemId_fkey" FOREIGN KEY ("budgetItemId") REFERENCES "zentra_budget_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "zentra_bank_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_document" ADD CONSTRAINT "zentra_document_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "zentra_currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_movement" ADD CONSTRAINT "zentra_movement_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "zentra_document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_movement" ADD CONSTRAINT "zentra_movement_transactionTypeId_fkey" FOREIGN KEY ("transactionTypeId") REFERENCES "zentra_transaction_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_movement" ADD CONSTRAINT "zentra_movement_movementCategoryId_fkey" FOREIGN KEY ("movementCategoryId") REFERENCES "zentra_movement_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_movement" ADD CONSTRAINT "zentra_movement_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "zentra_document_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_movement" ADD CONSTRAINT "zentra_movement_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "zentra_party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_movement" ADD CONSTRAINT "zentra_movement_budgetItemId_fkey" FOREIGN KEY ("budgetItemId") REFERENCES "zentra_budget_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_movement" ADD CONSTRAINT "zentra_movement_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "zentra_bank_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_movement" ADD CONSTRAINT "zentra_movement_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "zentra_currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
