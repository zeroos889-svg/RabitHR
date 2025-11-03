CREATE TABLE `consultationMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`bookingId` int NOT NULL,
	`senderId` int NOT NULL,
	`senderType` enum('client','consultant') NOT NULL,
	`message` text NOT NULL,
	`attachments` text,
	`isRead` boolean NOT NULL DEFAULT false,
	`readAt` timestamp,
	`isAiAssisted` boolean NOT NULL DEFAULT false,
	`aiSuggestion` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `consultationMessages_id` PRIMARY KEY(`id`)
);
