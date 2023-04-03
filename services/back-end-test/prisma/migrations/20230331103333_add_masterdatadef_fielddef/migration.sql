/*
  Warnings:

  - You are about to drop the `fieldDef` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "fieldDef" DROP CONSTRAINT "fieldDef_onwerId_fkey";

-- DropTable
DROP TABLE "fieldDef";

-- CreateTable
CREATE TABLE "FieldDef" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" JSONB NOT NULL,
    "onwerId" INTEGER NOT NULL,

    CONSTRAINT "FieldDef_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FieldDef" ADD CONSTRAINT "FieldDef_onwerId_fkey" FOREIGN KEY ("onwerId") REFERENCES "MasterDataDef"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
