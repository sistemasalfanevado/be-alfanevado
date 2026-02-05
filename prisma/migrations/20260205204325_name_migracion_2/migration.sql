-- AlterTable
ALTER TABLE "zentra_movement" ADD COLUMN     "paymentCategoryId" TEXT;

-- CreateTable
CREATE TABLE "zentra_payment_category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_payment_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_movement" ADD CONSTRAINT "zentra_movement_paymentCategoryId_fkey" FOREIGN KEY ("paymentCategoryId") REFERENCES "zentra_payment_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
