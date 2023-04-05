/*
  Warnings:

  - The primary key for the `FieldDef` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FieldDef` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FieldDef" DROP CONSTRAINT "FieldDef_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "FieldDef_pkey" PRIMARY KEY ("onwerId", "code");
