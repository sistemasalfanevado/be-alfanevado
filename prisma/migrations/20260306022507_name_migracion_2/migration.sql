-- AlterTable
ALTER TABLE "zentra_notification_recipient" ADD COLUMN     "notificationCategoryId" TEXT;

-- CreateTable
CREATE TABLE "zentra_notification_category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_notification_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_notification_recipient" ADD CONSTRAINT "zentra_notification_recipient_notificationCategoryId_fkey" FOREIGN KEY ("notificationCategoryId") REFERENCES "zentra_notification_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
