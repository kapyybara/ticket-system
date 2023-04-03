/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `FieldDef` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `MasterDataDef` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FieldDef_code_key" ON "FieldDef"("code");

-- CreateIndex
CREATE UNIQUE INDEX "MasterDataDef_code_key" ON "MasterDataDef"("code");
