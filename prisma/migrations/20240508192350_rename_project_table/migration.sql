/*
  Warnings:

  - You are about to drop the `proyects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "proyects";

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_name_key" ON "projects"("name");
