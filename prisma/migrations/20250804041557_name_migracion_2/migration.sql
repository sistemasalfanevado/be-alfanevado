-- CreateTable
CREATE TABLE "zentra_party_bank_account" (
    "id" TEXT NOT NULL,
    "account" VARCHAR(30) NOT NULL,
    "cci" VARCHAR(50) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "bankId" VARCHAR(36),
    "currencyId" VARCHAR(36),
    "partyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_party_bank_account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_party_bank_account" ADD CONSTRAINT "zentra_party_bank_account_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "zentra_bank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_party_bank_account" ADD CONSTRAINT "zentra_party_bank_account_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "zentra_currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_party_bank_account" ADD CONSTRAINT "zentra_party_bank_account_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "zentra_party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
