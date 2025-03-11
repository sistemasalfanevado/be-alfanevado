-- CreateTable
CREATE TABLE "landing_feature" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "detail" VARCHAR(200) NOT NULL,
    "icon" VARCHAR(100) NOT NULL,
    "pageId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_feature_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "landing_feature" ADD CONSTRAINT "landing_feature_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "landing_page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
