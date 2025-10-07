-- CreateTable
CREATE TABLE "zentra_sub_project" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_sub_project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_sub_project" ADD CONSTRAINT "zentra_sub_project_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "zentra_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
