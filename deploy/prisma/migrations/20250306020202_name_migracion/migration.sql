/*
  Warnings:

  - Added the required column `pageId` to the `landing_hero_banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "landing_hero_banner" ADD COLUMN     "pageId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "landing_hero_banner" ADD CONSTRAINT "landing_hero_banner_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "landing_page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
