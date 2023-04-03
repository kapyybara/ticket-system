-- CreateTable
CREATE TABLE "MasterDataDef" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "displayField" TEXT[],

    CONSTRAINT "MasterDataDef_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fieldDef" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" JSONB NOT NULL,
    "onwerId" INTEGER NOT NULL,

    CONSTRAINT "fieldDef_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fieldDef" ADD CONSTRAINT "fieldDef_onwerId_fkey" FOREIGN KEY ("onwerId") REFERENCES "MasterDataDef"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
