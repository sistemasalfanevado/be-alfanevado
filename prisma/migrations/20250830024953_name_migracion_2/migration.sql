-- AlterTable
ALTER TABLE "zentra_user" ADD COLUMN     "genreId" TEXT;

-- CreateTable
CREATE TABLE "zentra_genre" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_genre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "zentra_genre_name_key" ON "zentra_genre"("name");

-- AddForeignKey
ALTER TABLE "zentra_user" ADD CONSTRAINT "zentra_user_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "zentra_genre"("id") ON DELETE SET NULL ON UPDATE CASCADE;
