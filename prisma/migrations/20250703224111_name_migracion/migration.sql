-- CreateTable
CREATE TABLE "ZentraUser" (
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

    CONSTRAINT "ZentraUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZentraRole" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ZentraRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZentraPageGroup" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ZentraPageGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZentraPage" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "route" VARCHAR(300) NOT NULL,
    "pageGroupId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ZentraPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZentraRolePermission" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "canCreate" BOOLEAN NOT NULL DEFAULT false,
    "canEdit" BOOLEAN NOT NULL DEFAULT false,
    "canDelete" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ZentraRolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ZentraUser_email_key" ON "ZentraUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ZentraRole_name_key" ON "ZentraRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ZentraPageGroup_name_key" ON "ZentraPageGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ZentraRolePermission_roleId_pageId_key" ON "ZentraRolePermission"("roleId", "pageId");

-- AddForeignKey
ALTER TABLE "ZentraUser" ADD CONSTRAINT "ZentraUser_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "ZentraRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZentraPage" ADD CONSTRAINT "ZentraPage_pageGroupId_fkey" FOREIGN KEY ("pageGroupId") REFERENCES "ZentraPageGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZentraRolePermission" ADD CONSTRAINT "ZentraRolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "ZentraRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZentraRolePermission" ADD CONSTRAINT "ZentraRolePermission_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "ZentraPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
