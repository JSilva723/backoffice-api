/*
  Warnings:

  - The primary key for the `tiers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "tiers" DROP CONSTRAINT "tiers_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tiers_pkey" PRIMARY KEY ("id");
