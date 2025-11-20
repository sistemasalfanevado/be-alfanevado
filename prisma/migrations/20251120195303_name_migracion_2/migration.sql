-- CreateTable
CREATE TABLE "zentra_installment_file" (
    "id" TEXT NOT NULL,
    "installmentId" TEXT NOT NULL,
    "fileName" VARCHAR(255) NOT NULL,
    "fileUrl" VARCHAR(700) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_installment_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_installment_file" ADD CONSTRAINT "zentra_installment_file_installmentId_fkey" FOREIGN KEY ("installmentId") REFERENCES "zentra_installment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
