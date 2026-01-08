-- AlterTable
ALTER TABLE "zentra_budget_item_category" ADD COLUMN     "visibilityId" TEXT;

-- AddForeignKey
ALTER TABLE "zentra_budget_item_category" ADD CONSTRAINT "zentra_budget_item_category_visibilityId_fkey" FOREIGN KEY ("visibilityId") REFERENCES "zentra_visibility"("id") ON DELETE SET NULL ON UPDATE CASCADE;
