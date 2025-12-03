-- AlterTable
ALTER TABLE "zentra_bank_account" ADD COLUMN     "partyId" TEXT;

-- AddForeignKey
ALTER TABLE "zentra_bank_account" ADD CONSTRAINT "zentra_bank_account_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "zentra_party"("id") ON DELETE SET NULL ON UPDATE CASCADE;
