-- CreateTable
CREATE TABLE "landing_term_condition" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_term_condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing_complete_project" (
    "id" TEXT NOT NULL,
    "linkImage" VARCHAR(400) NOT NULL,
    "nameImage" VARCHAR(100) NOT NULL,
    "subtitle" VARCHAR(400) NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "pageId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_complete_project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "landing_complete_project" ADD CONSTRAINT "landing_complete_project_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "landing_page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
