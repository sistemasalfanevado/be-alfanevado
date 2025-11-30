-- CreateTable
CREATE TABLE "zentra_user_party" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_user_party_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_user_party" ADD CONSTRAINT "zentra_user_party_userId_fkey" FOREIGN KEY ("userId") REFERENCES "zentra_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_user_party" ADD CONSTRAINT "zentra_user_party_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "zentra_party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
