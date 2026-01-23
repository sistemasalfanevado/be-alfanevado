-- AlterTable
ALTER TABLE "zentra_party" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "zentra_party" ADD CONSTRAINT "zentra_party_userId_fkey" FOREIGN KEY ("userId") REFERENCES "zentra_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
