CREATE TABLE `auditLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`action` varchar(255),
	`entityType` varchar(100),
	`entityId` int,
	`changes` text,
	`ipAddress` varchar(45),
	`userAgent` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `auditLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `calculationHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`calculationType` enum('end-of-service','vacation','overtime','deduction'),
	`inputData` text,
	`result` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `calculationHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `candidateActivities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`applicationId` int NOT NULL,
	`userId` int NOT NULL,
	`activityType` enum('status_change','note_added','email_sent','interview_scheduled','evaluation_added'),
	`description` text,
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `candidateActivities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `candidateEvaluations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`applicationId` int NOT NULL,
	`evaluatorId` int NOT NULL,
	`technicalScore` int,
	`softSkillsScore` int,
	`cultureFitScore` int,
	`overallScore` int,
	`notes` text,
	`recommendation` enum('strongly_recommend','recommend','neutral','not_recommend'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `candidateEvaluations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `candidates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(255),
	`email` varchar(320),
	`phone` varchar(20),
	`nationality` varchar(100),
	`currentLocation` varchar(255),
	`cvUrl` text,
	`linkedinUrl` varchar(255),
	`portfolioUrl` varchar(255),
	`skills` text,
	`experience` text,
	`education` text,
	`languages` text,
	`aiParsedData` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `candidates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `caseComments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`caseId` int NOT NULL,
	`userId` int NOT NULL,
	`comment` text,
	`isInternal` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `caseComments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chatHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`message` text,
	`response` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chatHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `companies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`nameAr` varchar(255),
	`nameEn` varchar(255),
	`commercialRegister` varchar(50),
	`industry` varchar(100),
	`employeeCount` enum('1-50','51-200','201-500','500+'),
	`city` varchar(100),
	`address` text,
	`website` varchar(255),
	`logoUrl` text,
	`subscriptionPlan` enum('starter','professional','enterprise','custom'),
	`subscriptionStatus` enum('active','inactive','trial'),
	`subscriptionStartDate` date,
	`subscriptionEndDate` date,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `companies_id` PRIMARY KEY(`id`),
	CONSTRAINT `companies_commercialRegister_unique` UNIQUE(`commercialRegister`)
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`companyId` int,
	`documentType` varchar(100),
	`title` varchar(255),
	`fileUrl` text,
	`fileSize` int,
	`mimeType` varchar(100),
	`uploadedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fullName` varchar(255),
	`phoneNumber` varchar(20),
	`companyName` varchar(255),
	`jobTitle` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `generatedLetters` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`letterType` varchar(100),
	`content` text,
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `generatedLetters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hrCases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`createdBy` int NOT NULL,
	`assignedTo` int,
	`title` varchar(255),
	`description` text,
	`caseType` enum('complaint','request','inquiry','disciplinary','grievance','other'),
	`priority` enum('low','medium','high','urgent'),
	`status` enum('open','in-progress','pending','resolved','closed'),
	`relatedEmployeeId` int,
	`attachments` text,
	`resolution` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`resolvedAt` timestamp,
	CONSTRAINT `hrCases_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `individualHRs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fullName` varchar(255),
	`phoneNumber` varchar(20),
	`specialization` varchar(100),
	`experienceYears` int,
	`certifications` text,
	`subscriptionStatus` enum('active','inactive','trial'),
	`subscriptionStartDate` date,
	`subscriptionEndDate` date,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `individualHRs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `interviewSchedules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`applicationId` int NOT NULL,
	`interviewType` enum('phone','video','in-person','technical','hr'),
	`scheduledAt` timestamp,
	`duration` int,
	`location` varchar(255),
	`meetingLink` varchar(500),
	`interviewers` text,
	`status` enum('scheduled','completed','cancelled','rescheduled'),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `interviewSchedules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `jobApplications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`jobId` int NOT NULL,
	`candidateId` int NOT NULL,
	`status` enum('pending','reviewing','shortlisted','interview','offer','rejected','hired'),
	`cvUrl` text,
	`coverLetter` text,
	`appliedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `jobApplications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`title` varchar(255),
	`titleEn` varchar(255),
	`description` text,
	`requirements` text,
	`responsibilities` text,
	`employmentType` enum('full-time','part-time','contract','temporary'),
	`experienceLevel` enum('entry','mid','senior','executive'),
	`educationLevel` varchar(100),
	`salaryMin` int,
	`salaryMax` int,
	`currency` varchar(3) DEFAULT 'SAR',
	`location` varchar(255),
	`remoteOption` boolean DEFAULT false,
	`benefits` text,
	`status` enum('draft','published','closed','on-hold'),
	`publishedAt` timestamp,
	`closedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `jobs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`permissionLevel` enum('view_only','basic_tools','advanced_tools','ats_access','full_access','admin'),
	`canUseCalculators` boolean DEFAULT false,
	`canGenerateLetters` boolean DEFAULT false,
	`canAccessATS` boolean DEFAULT false,
	`canManageCases` boolean DEFAULT false,
	`canViewReports` boolean DEFAULT false,
	`canManageTeam` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pipelineStages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`name` varchar(100),
	`nameEn` varchar(100),
	`orderIndex` int,
	`color` varchar(7),
	`isDefault` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pipelineStages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`planType` enum('free','individual','starter','professional','enterprise','custom'),
	`status` enum('active','inactive','trial','cancelled'),
	`startDate` date,
	`endDate` date,
	`price` int,
	`paymentMethod` varchar(50),
	`autoRenew` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`caseId` int,
	`createdBy` int NOT NULL,
	`assignedTo` int,
	`title` varchar(255),
	`description` text,
	`dueDate` date,
	`priority` enum('low','medium','high'),
	`status` enum('todo','in-progress','completed','cancelled'),
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `userType` enum('employee','individual','company');