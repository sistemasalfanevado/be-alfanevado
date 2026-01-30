-- CreateTable
CREATE TABLE "zentra_percentage" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_percentage_pkey" PRIMARY KEY ("id")
);
