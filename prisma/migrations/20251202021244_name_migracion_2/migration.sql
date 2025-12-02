-- AlterTable
ALTER TABLE "zentra_document_type" ADD COLUMN     "visibilityId" TEXT;

-- CreateTable
CREATE TABLE "zentra_visibility" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_visibility_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_document_type" ADD CONSTRAINT "zentra_document_type_visibilityId_fkey" FOREIGN KEY ("visibilityId") REFERENCES "zentra_visibility"("id") ON DELETE SET NULL ON UPDATE CASCADE;
