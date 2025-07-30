/*
  Warnings:

  - Added the required column `code` to the `zentra_document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `zentra_movement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "zentra_document" ADD COLUMN     "code" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "zentra_movement" ADD COLUMN     "code" VARCHAR(50) NOT NULL;
