/*
  Warnings:

  - You are about to drop the `audit_logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "audit_logs" DROP CONSTRAINT "audit_logs_userId_fkey";

-- DropTable
DROP TABLE "audit_logs";

-- CreateTable
CREATE TABLE "zentra_audit_logs" (
    "id" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "action" TEXT NOT NULL DEFAULT 'DELETE',
    "serverCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "localCreatedAt" TIMESTAMP(3) NOT NULL,
    "recordId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "zentra_audit_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_audit_logs" ADD CONSTRAINT "zentra_audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "zentra_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
