-- AlterTable
ALTER TABLE "zentra_user" ADD COLUMN     "areaId" TEXT;

-- CreateTable
CREATE TABLE "zentra_area" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_area_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_user" ADD CONSTRAINT "zentra_user_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "zentra_area"("id") ON DELETE SET NULL ON UPDATE CASCADE;
