-- DropIndex
DROP INDEX "zentra_exchange_rate_date_key";

-- AlterTable
ALTER TABLE "zentra_exchange_rate" ADD COLUMN     "deletedAt" TIMESTAMP(3);
