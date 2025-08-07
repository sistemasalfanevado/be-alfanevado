-- AlterTable
ALTER TABLE "zentra_bank_account" ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "amount" SET DEFAULT 0.00;
