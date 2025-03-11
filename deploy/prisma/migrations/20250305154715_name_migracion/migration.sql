-- CreateTable
CREATE TABLE "landing_page_footer_contact" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "detail" VARCHAR(200) NOT NULL,
    "icon" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_page_footer_contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing_page_footer_link" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "link" VARCHAR(200) NOT NULL,
    "icon" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_page_footer_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing_page_footer_social" (
    "id" TEXT NOT NULL,
    "link" VARCHAR(200) NOT NULL,
    "icon" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_page_footer_social_pkey" PRIMARY KEY ("id")
);
