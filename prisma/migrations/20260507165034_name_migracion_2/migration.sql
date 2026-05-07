-- CreateTable
CREATE TABLE "zentra_session_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "browser" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "deviceFingerprint" TEXT,
    "serverCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "localCreatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_session_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zentra_session_logs" ADD CONSTRAINT "zentra_session_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "zentra_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
