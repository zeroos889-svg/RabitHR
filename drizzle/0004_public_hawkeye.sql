CREATE TABLE `emailLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`toEmail` varchar(320) NOT NULL,
	`subject` varchar(500) NOT NULL,
	`template` varchar(100),
	`status` enum('pending','sent','failed') NOT NULL DEFAULT 'pending',
	`errorMessage` text,
	`sentAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `emailLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notificationPreferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`inAppEnabled` boolean NOT NULL DEFAULT true,
	`emailEnabled` boolean NOT NULL DEFAULT true,
	`pushEnabled` boolean NOT NULL DEFAULT false,
	`smsEnabled` boolean NOT NULL DEFAULT false,
	`notifyOnBooking` boolean NOT NULL DEFAULT true,
	`notifyOnResponse` boolean NOT NULL DEFAULT true,
	`notifyOnReminder` boolean NOT NULL DEFAULT true,
	`notifyOnPromotion` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `notificationPreferences_id` PRIMARY KEY(`id`),
	CONSTRAINT `notificationPreferences_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('success','info','warning','error') NOT NULL DEFAULT 'info',
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`link` varchar(500),
	`icon` varchar(50),
	`isRead` boolean NOT NULL DEFAULT false,
	`readAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `smsLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`toPhone` varchar(20) NOT NULL,
	`message` text NOT NULL,
	`status` enum('pending','sent','failed') NOT NULL DEFAULT 'pending',
	`errorMessage` text,
	`sentAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `smsLogs_id` PRIMARY KEY(`id`)
);
