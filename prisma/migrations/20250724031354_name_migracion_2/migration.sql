-- CreateTable
CREATE TABLE "zentra_party_role" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_party_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_party" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "document" VARCHAR(30) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "address" VARCHAR(200) NOT NULL,
    "partyRoleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_party_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_party" ADD CONSTRAINT "zentra_party_partyRoleId_fkey" FOREIGN KEY ("partyRoleId") REFERENCES "zentra_party_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
