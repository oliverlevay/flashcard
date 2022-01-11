/*
  Warnings:

  - You are about to drop the column `likedBy` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the column `deckId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_deckId_fkey";

-- AlterTable
ALTER TABLE "Deck" DROP COLUMN "likedBy",
ADD COLUMN     "likedByUserIds" INTEGER[];

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "deckId";

-- CreateTable
CREATE TABLE "_DeckToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DeckToTag_AB_unique" ON "_DeckToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_DeckToTag_B_index" ON "_DeckToTag"("B");

-- AddForeignKey
ALTER TABLE "_DeckToTag" ADD FOREIGN KEY ("A") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeckToTag" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
