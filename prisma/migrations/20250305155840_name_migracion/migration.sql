/*
  Warnings:

  - You are about to drop the `landing_page_footer_contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `landing_page_footer_link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `landing_page_footer_social` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "landing_page_footer_contact";

-- DropTable
DROP TABLE "landing_page_footer_link";

-- DropTable
DROP TABLE "landing_page_footer_social";

-- CreateTable
CREATE TABLE "landing_footer_contact" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "detail" VARCHAR(200) NOT NULL,
    "icon" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_footer_contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing_footer_link" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "link" VARCHAR(200) NOT NULL,
    "icon" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_footer_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing_footer_social" (
    "id" TEXT NOT NULL,
    "link" VARCHAR(200) NOT NULL,
    "icon" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_footer_social_pkey" PRIMARY KEY ("id")
);
