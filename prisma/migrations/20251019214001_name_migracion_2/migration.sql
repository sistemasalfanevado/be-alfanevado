-- AlterTable
ALTER TABLE "zentra_scheduled_income_document" ADD COLUMN     "acceptorDni1" TEXT,
ADD COLUMN     "acceptorDni2" TEXT,
ADD COLUMN     "acceptorName1" TEXT,
ADD COLUMN     "acceptorName2" TEXT,
ADD COLUMN     "acceptorPhone1" TEXT,
ADD COLUMN     "acceptorPhone2" TEXT,
ADD COLUMN     "permanentGuarantorAddress" TEXT,
ADD COLUMN     "permanentGuarantorDni" TEXT,
ADD COLUMN     "permanentGuarantorName" TEXT,
ADD COLUMN     "permanentGuarantorPhone" TEXT,
ADD COLUMN     "placeOfIssue" TEXT,
ADD COLUMN     "referenceCode" TEXT,
ADD COLUMN     "serialNumber" TEXT;
