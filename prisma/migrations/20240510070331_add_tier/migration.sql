-- CreateTable
CREATE TABLE "tiers" (
    "name" VARCHAR(10) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "tiers_pkey" PRIMARY KEY ("name","project_id")
);

-- AddForeignKey
ALTER TABLE "tiers" ADD CONSTRAINT "tiers_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
