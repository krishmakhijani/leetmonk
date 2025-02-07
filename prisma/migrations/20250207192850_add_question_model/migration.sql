-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "difficulty" TEXT NOT NULL,
    "questionTags" TEXT[],
    "companyTags" TEXT[],
    "questionUrl" TEXT NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "questions_questionId_key" ON "questions"("questionId");
