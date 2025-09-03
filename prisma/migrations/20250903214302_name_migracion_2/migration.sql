/*
  Warnings:

  - You are about to drop the `zentra_landing_project_relation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "zentra_landing_project_relation" DROP CONSTRAINT "zentra_landing_project_relation_landingProjectId_fkey";

-- DropForeignKey
ALTER TABLE "zentra_landing_project_relation" DROP CONSTRAINT "zentra_landing_project_relation_zentraProjectId_fkey";

-- DropTable
DROP TABLE "zentra_landing_project_relation";

-- CreateTable
CREATE TABLE "zentra_landing_page_relation" (
    "id" TEXT NOT NULL,
    "zentraProjectId" TEXT NOT NULL,
    "landingPageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_landing_page_relation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_landing_page_relation" ADD CONSTRAINT "zentra_landing_page_relation_zentraProjectId_fkey" FOREIGN KEY ("zentraProjectId") REFERENCES "zentra_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_landing_page_relation" ADD CONSTRAINT "zentra_landing_page_relation_landingPageId_fkey" FOREIGN KEY ("landingPageId") REFERENCES "landing_page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
