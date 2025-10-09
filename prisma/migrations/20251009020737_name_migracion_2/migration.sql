-- CreateTable
CREATE TABLE "zentra_party_document_type" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_party_document_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_party_document_hierarchy" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_party_document_hierarchy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_party_document" (
    "id" TEXT NOT NULL,
    "document" VARCHAR(50) NOT NULL,
    "observation" VARCHAR(50) NOT NULL,
    "partyId" TEXT NOT NULL,
    "documentTypeId" TEXT NOT NULL,
    "documentHierarchyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "zentra_party_document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_party_document" ADD CONSTRAINT "zentra_party_document_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "zentra_party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_party_document" ADD CONSTRAINT "zentra_party_document_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "zentra_party_document_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_party_document" ADD CONSTRAINT "zentra_party_document_documentHierarchyId_fkey" FOREIGN KEY ("documentHierarchyId") REFERENCES "zentra_party_document_hierarchy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
