-- CreateTable
CREATE TABLE "zentra_sub_stage_progress" (
    "id" TEXT NOT NULL,
    "responsible" VARCHAR(100) NOT NULL,
    "status" VARCHAR(200) NOT NULL,
    "finishDate" TIMESTAMP(3),
    "progressPercentage" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "investmentAmount" DECIMAL(14,2) NOT NULL DEFAULT 0.00,
    "subStageId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_sub_stage_progress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_sub_stage_progress" ADD CONSTRAINT "zentra_sub_stage_progress_subStageId_fkey" FOREIGN KEY ("subStageId") REFERENCES "zentra_sub_stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_sub_stage_progress" ADD CONSTRAINT "zentra_sub_stage_progress_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "zentra_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
