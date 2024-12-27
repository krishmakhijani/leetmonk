-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "queId" INTEGER NOT NULL,
    "queTitle" TEXT NOT NULL,
    "queAccept" DOUBLE PRECISION NOT NULL,
    "queDiff" TEXT NOT NULL,
    "queLink" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "compName" TEXT NOT NULL,
    "compYear" TEXT[],

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Question_queId_key" ON "Question"("queId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_compName_key" ON "Company"("compName");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
