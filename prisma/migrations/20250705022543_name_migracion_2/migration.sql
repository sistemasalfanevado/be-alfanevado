-- CreateTable
CREATE TABLE "zentra_user" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "gender" VARCHAR(20) NOT NULL,
    "profileUrl" VARCHAR(300),
    "roleId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_role" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_page_group" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_page_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_page" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "route" VARCHAR(300) NOT NULL,
    "pageGroupId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zentra_role_permission" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "canCreate" BOOLEAN NOT NULL DEFAULT false,
    "canEdit" BOOLEAN NOT NULL DEFAULT false,
    "canDelete" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zentra_role_permission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "zentra_user_email_key" ON "zentra_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "zentra_role_name_key" ON "zentra_role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "zentra_page_group_name_key" ON "zentra_page_group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "zentra_role_permission_roleId_pageId_key" ON "zentra_role_permission"("roleId", "pageId");

-- AddForeignKey
ALTER TABLE "zentra_user" ADD CONSTRAINT "zentra_user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "zentra_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_page" ADD CONSTRAINT "zentra_page_pageGroupId_fkey" FOREIGN KEY ("pageGroupId") REFERENCES "zentra_page_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_role_permission" ADD CONSTRAINT "zentra_role_permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "zentra_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zentra_role_permission" ADD CONSTRAINT "zentra_role_permission_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "zentra_page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
