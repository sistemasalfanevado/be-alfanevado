-- CreateTable
CREATE TABLE "landing_page" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "route" VARCHAR(100) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_page_pkey" PRIMARY KEY ("id")
);
