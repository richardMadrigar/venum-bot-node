-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "sessionClient" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "limitSend" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "obs" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_sessionClient_key" ON "clients"("sessionClient");

-- CreateIndex
CREATE UNIQUE INDEX "clients_telephone_key" ON "clients"("telephone");
