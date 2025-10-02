-- CreateTable
CREATE TABLE "zentra_password_reset_token" (
    "id" TEXT NOT NULL,
    "token" VARCHAR(300) NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "zentra_password_reset_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "zentra_password_reset_token_token_key" ON "zentra_password_reset_token"("token");

-- AddForeignKey
ALTER TABLE "zentra_password_reset_token" ADD CONSTRAINT "zentra_password_reset_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "zentra_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
