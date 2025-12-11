-- CreateTable
CREATE TABLE "zentra_stage" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "percentage" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_stage_pkey" PRIMARY KEY ("id")
);
