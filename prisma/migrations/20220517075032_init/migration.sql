-- CreateTable
CREATE TABLE `Discord` (
    `id` INTEGER NOT NULL,
    `accessToken` VARCHAR(191) NULL,
    `refreshToken` VARCHAR(191) NULL,
    `usernameDiscord` VARCHAR(191) NULL,
    `idDiscord` VARCHAR(191) NULL,
    `createdAtAccessToken` DATETIME(3) NULL,
    `userId` VARCHAR(191) NULL,

    UNIQUE INDEX `Discord_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Discord` ADD CONSTRAINT `Discord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
