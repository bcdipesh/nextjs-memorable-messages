-- CreateTable
CREATE TABLE "Occasion" (
    "id" TEXT NOT NULL,
    "occasionType" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "receiverEmail" TEXT NOT NULL,
    "deliveryMethod" TEXT NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Occasion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Occasion_userId_idx" ON "Occasion"("userId");

-- AddForeignKey
ALTER TABLE "Occasion" ADD CONSTRAINT "Occasion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkUserId") ON DELETE CASCADE ON UPDATE CASCADE;
