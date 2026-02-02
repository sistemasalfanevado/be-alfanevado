-- CreateTable
CREATE TABLE "zentra_project_sub_stage_progress_file" (
    "id" TEXT NOT NULL,
    "projectSubStageProgressId" TEXT NOT NULL,
    "fileName" VARCHAR(255) NOT NULL,
    "fileUrl" VARCHAR(700) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_project_sub_stage_progress_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_project_sub_stage_progress_file" ADD CONSTRAINT "zentra_project_sub_stage_progress_file_projectSubStageProg_fkey" FOREIGN KEY ("projectSubStageProgressId") REFERENCES "zentra_project_sub_stage_progress"("id") ON DELETE CASCADE ON UPDATE CASCADE;
