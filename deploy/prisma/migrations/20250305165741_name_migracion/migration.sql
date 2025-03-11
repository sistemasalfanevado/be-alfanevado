-- AlterTable
ALTER TABLE "landing_footer_contact" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "landing_footer_link" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "landing_footer_social" ADD COLUMN     "deletedAt" TIMESTAMP(3);
