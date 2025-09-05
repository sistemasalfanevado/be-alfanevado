-- AlterTable
ALTER TABLE "zentra_movement" ADD COLUMN     "documentName" VARCHAR(150),
ADD COLUMN     "documentUrl" VARCHAR(300),
ADD COLUMN     "installmentId" TEXT;

-- CreateTable
CREATE TABLE "zentra_movement_file" (
    "id" TEXT NOT NULL,
    "movementId" TEXT NOT NULL,
    "fileName" VARCHAR(255) NOT NULL,
    "fileUrl" VARCHAR(700) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_movement_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_movement" ADD CONSTRAINT "zentra_movement_installmentId_fkey" FOREIGN KEY ("installmentId") REFERENCES "zentra_installment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_movement_file" ADD CONSTRAINT "zentra_movement_file_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "zentra_movement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
