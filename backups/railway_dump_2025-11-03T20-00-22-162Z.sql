-- Dump of database from 2025-11-03T20:00:22.526Z
-- Host: gondola.proxy.rlwy.net  Port: 54474


-- ----------------------------
-- Table structure for __drizzle_migrations
-- ----------------------------
DROP TABLE IF EXISTS `__drizzle_migrations`;
CREATE TABLE `__drizzle_migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `executed_at` timestamp NOT NULL DEFAULT (now()),
  `hash` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `__drizzle_migrations_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table __drizzle_migrations
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for auditLogs
-- ----------------------------
DROP TABLE IF EXISTS `auditLogs`;
CREATE TABLE `auditLogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `action` varchar(255) DEFAULT NULL,
  `entityType` varchar(100) DEFAULT NULL,
  `entityId` int DEFAULT NULL,
  `changes` text,
  `ipAddress` varchar(45) DEFAULT NULL,
  `userAgent` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table auditLogs
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for calculationHistory
-- ----------------------------
DROP TABLE IF EXISTS `calculationHistory`;
CREATE TABLE `calculationHistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `calculationType` enum('end-of-service','vacation','overtime','deduction') DEFAULT NULL,
  `inputData` text,
  `result` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table calculationHistory
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for candidateActivities
-- ----------------------------
DROP TABLE IF EXISTS `candidateActivities`;
CREATE TABLE `candidateActivities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `applicationId` int NOT NULL,
  `userId` int NOT NULL,
  `activityType` enum('status_change','note_added','email_sent','interview_scheduled','evaluation_added') DEFAULT NULL,
  `description` text,
  `metadata` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table candidateActivities
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for candidateEvaluations
-- ----------------------------
DROP TABLE IF EXISTS `candidateEvaluations`;
CREATE TABLE `candidateEvaluations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `applicationId` int NOT NULL,
  `evaluatorId` int NOT NULL,
  `technicalScore` int DEFAULT NULL,
  `softSkillsScore` int DEFAULT NULL,
  `cultureFitScore` int DEFAULT NULL,
  `overallScore` int DEFAULT NULL,
  `notes` text,
  `recommendation` enum('strongly_recommend','recommend','neutral','not_recommend') DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table candidateEvaluations
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for candidates
-- ----------------------------
DROP TABLE IF EXISTS `candidates`;
CREATE TABLE `candidates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `nationality` varchar(100) DEFAULT NULL,
  `currentLocation` varchar(255) DEFAULT NULL,
  `cvUrl` text,
  `linkedinUrl` varchar(255) DEFAULT NULL,
  `portfolioUrl` varchar(255) DEFAULT NULL,
  `skills` text,
  `experience` text,
  `education` text,
  `languages` text,
  `aiParsedData` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table candidates
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for caseComments
-- ----------------------------
DROP TABLE IF EXISTS `caseComments`;
CREATE TABLE `caseComments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `caseId` int NOT NULL,
  `userId` int NOT NULL,
  `comment` text,
  `isInternal` tinyint(1) DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table caseComments
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for chatHistory
-- ----------------------------
DROP TABLE IF EXISTS `chatHistory`;
CREATE TABLE `chatHistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `message` text,
  `response` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table chatHistory
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for companies
-- ----------------------------
DROP TABLE IF EXISTS `companies`;
CREATE TABLE `companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `nameAr` varchar(255) DEFAULT NULL,
  `nameEn` varchar(255) DEFAULT NULL,
  `commercialRegister` varchar(50) DEFAULT NULL,
  `industry` varchar(100) DEFAULT NULL,
  `employeeCount` enum('1-50','51-200','201-500','500+') DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `address` text,
  `website` varchar(255) DEFAULT NULL,
  `logo` text,
  `description` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table companies
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for consultantAvailability
-- ----------------------------
DROP TABLE IF EXISTS `consultantAvailability`;
CREATE TABLE `consultantAvailability` (
  `id` int NOT NULL AUTO_INCREMENT,
  `consultantId` int NOT NULL,
  `dayOfWeek` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') DEFAULT NULL,
  `startTime` time DEFAULT NULL,
  `endTime` time DEFAULT NULL,
  `isAvailable` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table consultantAvailability
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for consultantBlockedDates
-- ----------------------------
DROP TABLE IF EXISTS `consultantBlockedDates`;
CREATE TABLE `consultantBlockedDates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `consultantId` int NOT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `reason` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table consultantBlockedDates
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for consultantDocuments
-- ----------------------------
DROP TABLE IF EXISTS `consultantDocuments`;
CREATE TABLE `consultantDocuments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `consultantId` int NOT NULL,
  `documentType` enum('certificate','license','qualification','other') DEFAULT NULL,
  `documentUrl` text,
  `verificationStatus` enum('pending','verified','rejected') DEFAULT 'pending',
  `expiryDate` date DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table consultantDocuments
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for consultantEarnings
-- ----------------------------
DROP TABLE IF EXISTS `consultantEarnings`;
CREATE TABLE `consultantEarnings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `consultantId` int NOT NULL,
  `bookingId` int DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `commissionRate` decimal(5,2) DEFAULT NULL,
  `platformFee` decimal(10,2) DEFAULT NULL,
  `netEarnings` decimal(10,2) DEFAULT NULL,
  `paymentStatus` enum('pending','paid','refunded') DEFAULT 'pending',
  `paidDate` date DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table consultantEarnings
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for consultantReviews
-- ----------------------------
DROP TABLE IF EXISTS `consultantReviews`;
CREATE TABLE `consultantReviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `consultantId` int NOT NULL,
  `userId` int NOT NULL,
  `bookingId` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `review` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table consultantReviews
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for consultants
-- ----------------------------
DROP TABLE IF EXISTS `consultants`;
CREATE TABLE `consultants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `fullNameAr` varchar(255) DEFAULT NULL,
  `fullNameEn` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  `profilePicture` text,
  `bio` text,
  `yearsOfExperience` int DEFAULT NULL,
  `hourlyRate` decimal(10,2) DEFAULT NULL,
  `specializations` text,
  `qualifications` text,
  `languages` text,
  `averageRating` decimal(3,2) DEFAULT NULL,
  `totalReviews` int DEFAULT '0',
  `totalBookings` int DEFAULT '0',
  `responseTime` int DEFAULT NULL,
  `cancellationRate` decimal(5,2) DEFAULT NULL,
  `maxDailyBookings` int DEFAULT '5',
  `consultantAvailability` text,
  `consultantBlockedDates` text,
  `verificationStatus` enum('pending','verified','rejected') DEFAULT 'pending',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table consultants
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for consultationBookings
-- ----------------------------
DROP TABLE IF EXISTS `consultationBookings`;
CREATE TABLE `consultationBookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `consultantId` int NOT NULL,
  `clientId` int NOT NULL,
  `bookingNumber` varchar(50) DEFAULT NULL,
  `consultationTypeId` int DEFAULT NULL,
  `scheduledDate` date DEFAULT NULL,
  `scheduledTime` time DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `status` enum('pending','confirmed','in-progress','completed','cancelled','no-show') DEFAULT 'pending',
  `meetingLink` varchar(255) DEFAULT NULL,
  `notes` text,
  `clientNotes` text,
  `totalAmount` decimal(10,2) DEFAULT NULL,
  `finalAmount` decimal(10,2) DEFAULT NULL,
  `paymentStatus` enum('pending','paid','refunded') DEFAULT 'pending',
  `paymentMethod` varchar(50) DEFAULT NULL,
  `startedAt` timestamp NULL DEFAULT NULL,
  `endedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table consultationBookings
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for consultationMessages
-- ----------------------------
DROP TABLE IF EXISTS `consultationMessages`;
CREATE TABLE `consultationMessages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookingId` int NOT NULL,
  `senderId` int NOT NULL,
  `message` text,
  `attachments` text,
  `isRead` tinyint(1) DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table consultationMessages
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for consultationTypes
-- ----------------------------
DROP TABLE IF EXISTS `consultationTypes`;
CREATE TABLE `consultationTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nameAr` varchar(255) DEFAULT NULL,
  `nameEn` varchar(255) DEFAULT NULL,
  `descriptionAr` text,
  `descriptionEn` text,
  `duration` int DEFAULT NULL,
  `basePrice` decimal(10,2) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table consultationTypes
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for discountCodeUsage
-- ----------------------------
DROP TABLE IF EXISTS `discountCodeUsage`;
CREATE TABLE `discountCodeUsage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codeId` int NOT NULL,
  `userId` int NOT NULL,
  `usedAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table discountCodeUsage
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for discountCodes
-- ----------------------------
DROP TABLE IF EXISTS `discountCodes`;
CREATE TABLE `discountCodes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `discountType` enum('percentage','fixed') DEFAULT NULL,
  `discountValue` decimal(10,2) DEFAULT NULL,
  `maxUsage` int DEFAULT NULL,
  `currentUsage` int DEFAULT '0',
  `validFrom` date DEFAULT NULL,
  `validUntil` date DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table discountCodes
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for documents
-- ----------------------------
DROP TABLE IF EXISTS `documents`;
CREATE TABLE `documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `documentType` varchar(100) DEFAULT NULL,
  `documentUrl` text,
  `uploadedAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table documents
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for emailLogs
-- ----------------------------
DROP TABLE IF EXISTS `emailLogs`;
CREATE TABLE `emailLogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `recipientEmail` varchar(320) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `body` text,
  `status` enum('sent','failed','bounced') DEFAULT 'sent',
  `sentAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table emailLogs
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for employees
-- ----------------------------
DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyId` int NOT NULL,
  `userId` int NOT NULL,
  `fullNameAr` varchar(255) DEFAULT NULL,
  `fullNameEn` varchar(255) DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `joinDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `status` enum('active','inactive','on_leave','terminated') DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table employees
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for generatedDocuments
-- ----------------------------
DROP TABLE IF EXISTS `generatedDocuments`;
CREATE TABLE `generatedDocuments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `documentType` varchar(100) DEFAULT NULL,
  `documentUrl` text,
  `generatedAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table generatedDocuments
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for generatedLetters
-- ----------------------------
DROP TABLE IF EXISTS `generatedLetters`;
CREATE TABLE `generatedLetters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `letterType` varchar(100) DEFAULT NULL,
  `content` text,
  `generatedAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table generatedLetters
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for hrCases
-- ----------------------------
DROP TABLE IF EXISTS `hrCases`;
CREATE TABLE `hrCases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyId` int NOT NULL,
  `caseNumber` varchar(50) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `description` text,
  `status` enum('open','in_progress','resolved','closed') DEFAULT 'open',
  `priority` enum('low','medium','high','urgent') DEFAULT 'medium',
  `assignedTo` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table hrCases
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for individualHRs
-- ----------------------------
DROP TABLE IF EXISTS `individualHRs`;
CREATE TABLE `individualHRs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `fullNameAr` varchar(255) DEFAULT NULL,
  `fullNameEn` varchar(255) DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `specialization` varchar(100) DEFAULT NULL,
  `yearsOfExperience` int DEFAULT NULL,
  `certifications` text,
  `bio` text,
  `profilePicture` text,
  `averageRating` decimal(3,2) DEFAULT NULL,
  `totalReviews` int DEFAULT '0',
  `verificationStatus` enum('pending','verified','rejected') DEFAULT 'pending',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table individualHRs
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for interviewSchedules
-- ----------------------------
DROP TABLE IF EXISTS `interviewSchedules`;
CREATE TABLE `interviewSchedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `applicationId` int NOT NULL,
  `scheduledDate` date DEFAULT NULL,
  `scheduledTime` time DEFAULT NULL,
  `interviewType` enum('phone','video','in_person') DEFAULT NULL,
  `interviewer` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `status` enum('scheduled','completed','cancelled','rescheduled') DEFAULT 'scheduled',
  `feedback` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table interviewSchedules
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for jobApplications
-- ----------------------------
DROP TABLE IF EXISTS `jobApplications`;
CREATE TABLE `jobApplications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jobId` int NOT NULL,
  `candidateId` int NOT NULL,
  `status` enum('applied','screening','interview','offer','rejected','withdrawn') DEFAULT 'applied',
  `appliedAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table jobApplications
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for jobs
-- ----------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyId` int NOT NULL,
  `titleAr` varchar(255) DEFAULT NULL,
  `titleEn` varchar(255) DEFAULT NULL,
  `descriptionAr` text,
  `descriptionEn` text,
  `requirements` text,
  `location` varchar(255) DEFAULT NULL,
  `salaryMin` decimal(10,2) DEFAULT NULL,
  `salaryMax` decimal(10,2) DEFAULT NULL,
  `jobType` enum('full_time','part_time','contract','temporary') DEFAULT NULL,
  `status` enum('open','closed','on_hold') DEFAULT 'open',
  `postedAt` timestamp NOT NULL DEFAULT (now()),
  `closedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table jobs
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for notificationPreferences
-- ----------------------------
DROP TABLE IF EXISTS `notificationPreferences`;
CREATE TABLE `notificationPreferences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `emailNotifications` tinyint(1) DEFAULT '1',
  `smsNotifications` tinyint(1) DEFAULT '0',
  `pushNotifications` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table notificationPreferences
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for notifications
-- ----------------------------
DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` text,
  `type` varchar(50) DEFAULT NULL,
  `isRead` tinyint(1) DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table notifications
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for passwords
-- ----------------------------
DROP TABLE IF EXISTS `passwords`;
CREATE TABLE `passwords` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `hashedPassword` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table passwords
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for payments
-- ----------------------------
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `bookingId` int DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `paymentMethod` varchar(50) DEFAULT NULL,
  `transactionId` varchar(100) DEFAULT NULL,
  `status` enum('pending','completed','failed','refunded') DEFAULT 'pending',
  `paidAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table payments
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL,
  `permissionName` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table permissions
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for pipelineStages
-- ----------------------------
DROP TABLE IF EXISTS `pipelineStages`;
CREATE TABLE `pipelineStages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyId` int NOT NULL,
  `stageName` varchar(100) DEFAULT NULL,
  `stageOrder` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table pipelineStages
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for processingActivities
-- ----------------------------
DROP TABLE IF EXISTS `processingActivities`;
CREATE TABLE `processingActivities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `activityType` varchar(100) DEFAULT NULL,
  `description` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table processingActivities
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for retentionLogs
-- ----------------------------
DROP TABLE IF EXISTS `retentionLogs`;
CREATE TABLE `retentionLogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employeeId` int NOT NULL,
  `action` varchar(100) DEFAULT NULL,
  `reason` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table retentionLogs
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for retentionPolicies
-- ----------------------------
DROP TABLE IF EXISTS `retentionPolicies`;
CREATE TABLE `retentionPolicies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyId` int NOT NULL,
  `policyName` varchar(255) DEFAULT NULL,
  `description` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table retentionPolicies
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for securityIncidents
-- ----------------------------
DROP TABLE IF EXISTS `securityIncidents`;
CREATE TABLE `securityIncidents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `incidentType` varchar(100) DEFAULT NULL,
  `description` text,
  `severity` enum('low','medium','high','critical') DEFAULT 'medium',
  `resolvedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table securityIncidents
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for smsLogs
-- ----------------------------
DROP TABLE IF EXISTS `smsLogs`;
CREATE TABLE `smsLogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `recipientPhone` varchar(20) DEFAULT NULL,
  `message` text,
  `status` enum('sent','failed','bounced') DEFAULT 'sent',
  `sentAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table smsLogs
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for specializations
-- ----------------------------
DROP TABLE IF EXISTS `specializations`;
CREATE TABLE `specializations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nameAr` varchar(255) DEFAULT NULL,
  `nameEn` varchar(255) DEFAULT NULL,
  `descriptionAr` text,
  `descriptionEn` text,
  `icon` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table specializations
-- ----------------------------
-- (no rows)


-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `openId` varchar(64) NOT NULL,
  `name` text,
  `email` varchar(320) DEFAULT NULL,
  `loginMethod` varchar(64) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_openId_unique` (`openId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Data for table users
-- ----------------------------
-- (no rows)

