-- CreateTable
CREATE TABLE "zentra_landing_project_relation" (
    "id" TEXT NOT NULL,
    "zentraProjectId" TEXT NOT NULL,
    "landingProjectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_landing_project_relation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_landing_project_relation" ADD CONSTRAINT "zentra_landing_project_relation_zentraProjectId_fkey" FOREIGN KEY ("zentraProjectId") REFERENCES "zentra_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_landing_project_relation" ADD CONSTRAINT "zentra_landing_project_relation_landingProjectId_fkey" FOREIGN KEY ("landingProjectId") REFERENCES "landing_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
