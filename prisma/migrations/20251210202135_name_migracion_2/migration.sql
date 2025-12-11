-- CreateTable
CREATE TABLE "zentra_sub_stage" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "stageId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_sub_stage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_sub_stage" ADD CONSTRAINT "zentra_sub_stage_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "zentra_stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
