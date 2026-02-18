-- AlterTable
ALTER TABLE "zentra_accountability" ALTER COLUMN "accountedAmount" SET DATA TYPE DECIMAL(16,4),
ALTER COLUMN "approvedAmount" SET DATA TYPE DECIMAL(16,4),
ALTER COLUMN "requestedAmount" SET DATA TYPE DECIMAL(16,4);

-- AlterTable
ALTER TABLE "zentra_movement" ALTER COLUMN "executedAmount" SET DATA TYPE DECIMAL(16,4),
ALTER COLUMN "executedDolares" SET DATA TYPE DECIMAL(16,4),
ALTER COLUMN "executedSoles" SET DATA TYPE DECIMAL(16,4);

-- AlterTable
ALTER TABLE "zentra_petty_cash" ALTER COLUMN "requestedAmount" SET DATA TYPE DECIMAL(16,4),
ALTER COLUMN "approvedAmount" SET DATA TYPE DECIMAL(16,4),
ALTER COLUMN "accountedAmount" SET DATA TYPE DECIMAL(16,4);
