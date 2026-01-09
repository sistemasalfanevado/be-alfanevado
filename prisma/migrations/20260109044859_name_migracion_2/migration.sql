-- AlterTable
ALTER TABLE "zentra_telecredito_operation" ADD COLUMN     "imageUrl" VARCHAR(300),
ADD COLUMN     "projectId" TEXT;

-- AddForeignKey
ALTER TABLE "zentra_telecredito_operation" ADD CONSTRAINT "zentra_telecredito_operation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "zentra_project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
