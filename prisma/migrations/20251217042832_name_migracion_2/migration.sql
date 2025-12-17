-- CreateTable
CREATE TABLE "zentra_notification_recipient" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_notification_recipient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_notification_recipient" ADD CONSTRAINT "zentra_notification_recipient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "zentra_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
