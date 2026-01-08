-- AlterTable
ALTER TABLE "zentra_budget_item" ADD COLUMN     "visibilityId" TEXT;

-- AddForeignKey
ALTER TABLE "zentra_budget_item" ADD CONSTRAINT "zentra_budget_item_visibilityId_fkey" FOREIGN KEY ("visibilityId") REFERENCES "zentra_visibility"("id") ON DELETE SET NULL ON UPDATE CASCADE;
