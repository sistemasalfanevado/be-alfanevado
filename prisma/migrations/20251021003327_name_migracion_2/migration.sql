-- CreateTable
CREATE TABLE "zentra_telecredito_operation_state" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_telecredito_operation_state_pkey" PRIMARY KEY ("id")
);
