CREATE TABLE `customerPdplSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerId` int NOT NULL,
	`processingRole` enum('controller','processor') NOT NULL DEFAULT 'controller',
	`dataStorageLocation` enum('SA','EU','Other') NOT NULL DEFAULT 'SA',
	`allowAiTraining` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `customerPdplSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `customerPdplSettings_customerId_unique` UNIQUE(`customerId`)
);
--> statement-breakpoint
CREATE TABLE `dataSubjectRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('access','correct','delete','withdraw','object') NOT NULL,
	`payloadJson` text,
	`status` enum('new','in_progress','done','rejected') NOT NULL DEFAULT 'new',
	`adminNotes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`closedAt` timestamp,
	CONSTRAINT `dataSubjectRequests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dataTransfers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerId` int,
	`legalBasis` enum('adequacy','scc','explicit_consent','vital_interest','central_processing') NOT NULL,
	`destinationCountry` varchar(2) NOT NULL,
	`dataCategories` text,
	`riskAssessmentRef` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `dataTransfers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `processingActivities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`controllerId` int,
	`purpose` varchar(255) NOT NULL,
	`dataCategories` text,
	`legalBasis` varchar(100) NOT NULL,
	`recipients` text,
	`retentionPeriod` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `processingActivities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `retentionLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`resource` varchar(100) NOT NULL,
	`recordsDeleted` int NOT NULL,
	`executedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `retentionLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `retentionPolicies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`resource` varchar(100) NOT NULL,
	`retentionDays` int NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `retentionPolicies_id` PRIMARY KEY(`id`),
	CONSTRAINT `retentionPolicies_resource_unique` UNIQUE(`resource`)
);
--> statement-breakpoint
CREATE TABLE `securityIncidents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`detectedAt` timestamp NOT NULL,
	`reportedToSdaiaAt` timestamp,
	`reportedToUsersAt` timestamp,
	`description` text NOT NULL,
	`cause` text,
	`affectedDataCategories` text,
	`affectedUsersCount` int,
	`riskLevel` enum('low','medium','high') NOT NULL,
	`status` enum('new','investigating','reported','resolved') NOT NULL DEFAULT 'new',
	`isLate` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `securityIncidents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userConsents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`policyVersion` varchar(50) NOT NULL,
	`consentedAt` timestamp NOT NULL DEFAULT (now()),
	`withdrawnAt` timestamp,
	`ipAddress` varchar(45),
	`userAgent` text,
	CONSTRAINT `userConsents_id` PRIMARY KEY(`id`)
);
