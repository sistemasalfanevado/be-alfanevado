-- CreateTable
CREATE TABLE "zentra_project_sub_stage" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "subStageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_project_sub_stage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_project_sub_stage" ADD CONSTRAINT "zentra_project_sub_stage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "zentra_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_project_sub_stage" ADD CONSTRAINT "zentra_project_sub_stage_subStageId_fkey" FOREIGN KEY ("subStageId") REFERENCES "zentra_sub_stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
