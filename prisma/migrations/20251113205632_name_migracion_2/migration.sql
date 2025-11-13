-- CreateTable
CREATE TABLE "zentra_user_project" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_user_project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_user_project" ADD CONSTRAINT "zentra_user_project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "zentra_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_user_project" ADD CONSTRAINT "zentra_user_project_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "zentra_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
