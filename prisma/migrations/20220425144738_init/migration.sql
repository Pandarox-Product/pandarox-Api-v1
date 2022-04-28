/*
  Warnings:

  - A unique constraint covering the columns `[author]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `image` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_author_key` ON `User`(`author`);
