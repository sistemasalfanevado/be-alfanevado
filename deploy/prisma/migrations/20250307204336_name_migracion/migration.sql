-- CreateTable
CREATE TABLE "landing_lot" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "number" VARCHAR(50) NOT NULL,
    "block" VARCHAR(50) NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "statusId" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_lot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "landing_lot" ADD CONSTRAINT "landing_lot_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "landing_lot_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing_lot" ADD CONSTRAINT "landing_lot_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "landing_page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
