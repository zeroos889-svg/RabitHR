CREATE TABLE `discountCodeUsage` (
	`id` int AUTO_INCREMENT NOT NULL,
	`codeId` int NOT NULL,
	`userId` int NOT NULL,
	`orderId` varchar(100),
	`originalAmount` int NOT NULL,
	`discountAmount` int NOT NULL,
	`finalAmount` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `discountCodeUsage_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `discountCodes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(50) NOT NULL,
	`description` text,
	`discountType` enum('percentage','fixed') NOT NULL,
	`discountValue` int NOT NULL,
	`maxUses` int,
	`usedCount` int NOT NULL DEFAULT 0,
	`validFrom` timestamp,
	`validUntil` timestamp,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `discountCodes_id` PRIMARY KEY(`id`),
	CONSTRAINT `discountCodes_code_unique` UNIQUE(`code`)
);
