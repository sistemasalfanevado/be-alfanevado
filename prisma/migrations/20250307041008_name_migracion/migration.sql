/*
  Warnings:

  - Added the required column `nameImage` to the `landing_content_year` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameImage` to the `landing_hero_banner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameImage1` to the `landing_project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameImage2` to the `landing_project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "landing_content_slider" ADD COLUMN     "nameImage1" VARCHAR(100),
ADD COLUMN     "nameImage2" VARCHAR(100),
ADD COLUMN     "nameImage3" VARCHAR(100),
ADD COLUMN     "nameImage4" VARCHAR(100);

-- AlterTable
ALTER TABLE "landing_content_year" ADD COLUMN     "nameImage" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "landing_hero_banner" ADD COLUMN     "nameImage" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "landing_project" ADD COLUMN     "nameImage1" VARCHAR(100) NOT NULL,
ADD COLUMN     "nameImage2" VARCHAR(100) NOT NULL;
