-- AlterTable
ALTER TABLE "landing_feature" ALTER COLUMN "title" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "detail" SET DATA TYPE VARCHAR(400);

-- AlterTable
ALTER TABLE "landing_footer_contact" ALTER COLUMN "title" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "detail" SET DATA TYPE VARCHAR(400);

-- AlterTable
ALTER TABLE "landing_footer_link" ALTER COLUMN "title" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "link" SET DATA TYPE VARCHAR(400);

-- AlterTable
ALTER TABLE "landing_footer_social" ALTER COLUMN "link" SET DATA TYPE VARCHAR(400);

-- AlterTable
ALTER TABLE "landing_hero_banner" ALTER COLUMN "title" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "subtitle" SET DATA TYPE VARCHAR(400),
ALTER COLUMN "linkImage" SET DATA TYPE VARCHAR(400);

-- AlterTable
ALTER TABLE "landing_page" ALTER COLUMN "title" SET DATA TYPE VARCHAR(150);

-- CreateTable
CREATE TABLE "landing_project" (
    "id" TEXT NOT NULL,
    "linkImage1" VARCHAR(400) NOT NULL,
    "linkImage2" VARCHAR(400) NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "subtitle" VARCHAR(400) NOT NULL,
    "textButton" VARCHAR(50) NOT NULL,
    "linkRedirect1" VARCHAR(400),
    "linkRedirect2" VARCHAR(400),
    "pageId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing_content" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "subtitle" VARCHAR(400) NOT NULL,
    "pageId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing_content_year" (
    "id" TEXT NOT NULL,
    "year" VARCHAR(10) NOT NULL,
    "yearMessage" VARCHAR(200) NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "subtitle" VARCHAR(400) NOT NULL,
    "linkImage" VARCHAR(400) NOT NULL,
    "pageId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_content_year_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing_content_slider" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "subtitle" VARCHAR(400) NOT NULL,
    "linkImage1" VARCHAR(400),
    "linkImage2" VARCHAR(400),
    "linkImage3" VARCHAR(400),
    "linkImage4" VARCHAR(400),
    "pageId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_content_slider_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "landing_project" ADD CONSTRAINT "landing_project_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "landing_page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing_content" ADD CONSTRAINT "landing_content_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "landing_page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing_content_year" ADD CONSTRAINT "landing_content_year_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "landing_page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing_content_slider" ADD CONSTRAINT "landing_content_slider_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "landing_page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
