-- CreateTable
CREATE TABLE "zentra_role_action" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_role_action_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_role_action" ADD CONSTRAINT "zentra_role_action_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "zentra_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
