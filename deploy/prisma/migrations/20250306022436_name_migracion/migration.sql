/*
  Warnings:

  - A unique constraint covering the columns `[route]` on the table `landing_page` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "landing_page_route_key" ON "landing_page"("route");
