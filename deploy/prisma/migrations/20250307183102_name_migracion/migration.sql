-- CreateTable
CREATE TABLE "landing_lot_status" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(25) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_lot_status_pkey" PRIMARY KEY ("id")
);
