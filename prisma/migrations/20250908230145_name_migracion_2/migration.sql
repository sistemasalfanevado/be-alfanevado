-- AlterTable
ALTER TABLE "zentra_budget_item_definition" ADD COLUMN     "natureId" TEXT;

-- CreateTable
CREATE TABLE "zentra_budget_nature" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "idFirebase" VARCHAR(30) DEFAULT '',

    CONSTRAINT "zentra_budget_nature_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_budget_item_definition" ADD CONSTRAINT "zentra_budget_item_definition_natureId_fkey" FOREIGN KEY ("natureId") REFERENCES "zentra_budget_nature"("id") ON DELETE SET NULL ON UPDATE CASCADE;
