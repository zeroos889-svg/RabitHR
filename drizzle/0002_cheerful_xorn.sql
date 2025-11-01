CREATE TABLE `consultingPackages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`nameEn` varchar(255),
	`description` text,
	`descriptionEn` text,
	`duration` int,
	`slaHours` int,
	`priceSAR` int NOT NULL,
	`features` text,
	`isActive` boolean DEFAULT true,
	`orderIndex` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `consultingPackages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `consultingResponses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ticketId` int NOT NULL,
	`userId` int NOT NULL,
	`message` text NOT NULL,
	`attachments` text,
	`isInternal` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `consultingResponses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `consultingTickets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`packageId` int NOT NULL,
	`consultantId` int,
	`ticketNumber` varchar(50) NOT NULL,
	`status` enum('pending','assigned','in-progress','completed','cancelled') DEFAULT 'pending',
	`priority` enum('low','medium','high','urgent') DEFAULT 'medium',
	`subject` varchar(255),
	`description` text,
	`submittedFormJson` text,
	`attachments` text,
	`scheduledAt` timestamp,
	`completedAt` timestamp,
	`slaDeadline` timestamp,
	`rating` int,
	`feedback` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `consultingTickets_id` PRIMARY KEY(`id`),
	CONSTRAINT `consultingTickets_ticketNumber_unique` UNIQUE(`ticketNumber`)
);
--> statement-breakpoint
CREATE TABLE `generatedDocuments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`templateCode` varchar(100) NOT NULL,
	`outputHtml` text,
	`outputText` text,
	`lang` enum('ar','en','both') DEFAULT 'ar',
	`inputData` text,
	`companyLogo` text,
	`companyName` varchar(255),
	`isSaved` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `generatedDocuments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `templates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(100) NOT NULL,
	`titleAr` varchar(255) NOT NULL,
	`titleEn` varchar(255),
	`category` varchar(100),
	`placeholdersSchema` text,
	`aiPrompt` text,
	`defaultContent` text,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `templates_id` PRIMARY KEY(`id`),
	CONSTRAINT `templates_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `usageEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`eventType` varchar(100) NOT NULL,
	`payloadJson` text,
	`ipAddress` varchar(45),
	`userAgent` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `usageEvents_id` PRIMARY KEY(`id`)
);
