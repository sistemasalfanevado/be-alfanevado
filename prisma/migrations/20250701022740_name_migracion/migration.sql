/*
  Warnings:

  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ModuleSubModule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubModule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserModule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ModuleSubModule" DROP CONSTRAINT "ModuleSubModule_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "ModuleSubModule" DROP CONSTRAINT "ModuleSubModule_subModuleId_fkey";

-- DropForeignKey
ALTER TABLE "UserModule" DROP CONSTRAINT "UserModule_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "UserModule" DROP CONSTRAINT "UserModule_userId_fkey";

-- DropTable
DROP TABLE "Module";

-- DropTable
DROP TABLE "ModuleSubModule";

-- DropTable
DROP TABLE "SubModule";

-- DropTable
DROP TABLE "UserModule";
