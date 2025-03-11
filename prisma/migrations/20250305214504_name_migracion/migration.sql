-- CreateTable
CREATE TABLE "landing_hero_banner" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "subtitle" VARCHAR(200) NOT NULL,
    "linkImage" VARCHAR(200) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_hero_banner_pkey" PRIMARY KEY ("id")
);
