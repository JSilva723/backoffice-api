-- DropForeignKey
ALTER TABLE "tiers" DROP CONSTRAINT "tiers_project_id_fkey";

-- AddForeignKey
ALTER TABLE "tiers" ADD CONSTRAINT "tiers_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
