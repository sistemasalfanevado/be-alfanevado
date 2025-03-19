-- CreateTable
CREATE TABLE "LandingSetting" (
    "id" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "maintenanceMode" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LandingSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LandingSetting_site_key" ON "LandingSetting"("site");
