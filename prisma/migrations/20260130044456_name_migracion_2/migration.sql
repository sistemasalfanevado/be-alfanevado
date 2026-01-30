/*
  Warnings:

  - You are about to drop the `zentra_sub_stage_progress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "zentra_sub_stage_progress" DROP CONSTRAINT "zentra_sub_stage_progress_projectId_fkey";

-- DropForeignKey
ALTER TABLE "zentra_sub_stage_progress" DROP CONSTRAINT "zentra_sub_stage_progress_subStageId_fkey";

-- DropTable
DROP TABLE "zentra_sub_stage_progress";

-- CreateTable
CREATE TABLE "zentra_project_sub_stage_progress" (
    "id" TEXT NOT NULL,
    "projectSubStageId" TEXT NOT NULL,
    "percentageId" TEXT NOT NULL,
    "responsible" VARCHAR(100) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "finishDate" TIMESTAMP(3),
    "investmentAmount" DECIMAL(14,2) NOT NULL DEFAULT 0.00,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_project_sub_stage_progress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_project_sub_stage_progress" ADD CONSTRAINT "zentra_project_sub_stage_progress_projectSubStageId_fkey" FOREIGN KEY ("projectSubStageId") REFERENCES "zentra_project_sub_stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_project_sub_stage_progress" ADD CONSTRAINT "zentra_project_sub_stage_progress_percentageId_fkey" FOREIGN KEY ("percentageId") REFERENCES "zentra_percentage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
