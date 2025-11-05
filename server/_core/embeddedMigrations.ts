/**
 * Embedded SQL migrations - all migrations combined into a single file
 * This avoids filesystem dependencies in serverless environments like Vercel
 */

export const EMBEDDED_MIGRATIONS = `
CREATE TABLE IF NOT EXISTS \`users\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`openId\` varchar(64) NOT NULL,
	\`name\` text,
	\`email\` varchar(320),
	\`loginMethod\` varchar(64),
	\`role\` enum('user','admin') NOT NULL DEFAULT 'user',
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	\`lastSignedIn\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`users_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`users_openId_unique\` UNIQUE(\`openId\`)
);

CREATE TABLE IF NOT EXISTS \`auditLogs\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`userId\` int NOT NULL,
	\`action\` varchar(255),
	\`entityType\` varchar(100),
	\`entityId\` int,
	\`changes\` text,
	\`ipAddress\` varchar(45),
	\`userAgent\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`auditLogs_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`calculationHistory\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`userId\` int NOT NULL,
	\`calculationType\` enum('end-of-service','vacation','overtime','deduction'),
	\`inputData\` text,
	\`result\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`calculationHistory_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`candidateActivities\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`applicationId\` int NOT NULL,
	\`userId\` int NOT NULL,
	\`activityType\` enum('status_change','note_added','email_sent','interview_scheduled','evaluation_added'),
	\`description\` text,
	\`metadata\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`candidateActivities_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`candidateEvaluations\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`applicationId\` int NOT NULL,
	\`evaluatorId\` int NOT NULL,
	\`technicalScore\` int,
	\`softSkillsScore\` int,
	\`cultureFitScore\` int,
	\`overallScore\` int,
	\`notes\` text,
	\`recommendation\` enum('strongly_recommend','recommend','neutral','not_recommend'),
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`candidateEvaluations_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`candidates\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`fullName\` varchar(255),
	\`email\` varchar(320),
	\`phone\` varchar(20),
	\`nationality\` varchar(100),
	\`currentLocation\` varchar(255),
	\`cvUrl\` text,
	\`linkedinUrl\` varchar(255),
	\`portfolioUrl\` varchar(255),
	\`skills\` text,
	\`experience\` text,
	\`education\` text,
	\`languages\` text,
	\`aiParsedData\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`candidates_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`caseComments\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`caseId\` int NOT NULL,
	\`userId\` int NOT NULL,
	\`comment\` text,
	\`isInternal\` boolean DEFAULT false,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`caseComments_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`chatHistory\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`userId\` int NOT NULL,
	\`message\` text,
	\`response\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`chatHistory_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`companies\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`userId\` int NOT NULL,
	\`nameAr\` varchar(255),
	\`nameEn\` varchar(255),
	\`commercialRegister\` varchar(50),
	\`industry\` varchar(100),
	\`employeeCount\` enum('1-50','51-200','201-500','500+'),
	\`city\` varchar(100),
	\`address\` text,
	\`website\` varchar(255),
	\`logo\` text,
	\`description\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`companies_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`consultantAvailability\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`consultantId\` int NOT NULL,
	\`dayOfWeek\` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday'),
	\`startTime\` time,
	\`endTime\` time,
	\`isAvailable\` boolean DEFAULT true,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`consultantAvailability_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`consultantBlockedDates\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`consultantId\` int NOT NULL,
	\`startDate\` date,
	\`endDate\` date,
	\`reason\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`consultantBlockedDates_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`consultantDocuments\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`consultantId\` int NOT NULL,
	\`documentType\` enum('certificate','license','qualification','other'),
	\`documentUrl\` text,
	\`verificationStatus\` enum('pending','verified','rejected') DEFAULT 'pending',
	\`expiryDate\` date,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`consultantDocuments_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`consultantEarnings\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`consultantId\` int NOT NULL,
	\`bookingId\` int,
	\`amount\` decimal(10,2),
	\`commissionRate\` decimal(5,2),
	\`platformFee\` decimal(10,2),
	\`netEarnings\` decimal(10,2),
	\`paymentStatus\` enum('pending','paid','refunded') DEFAULT 'pending',
	\`paidDate\` date,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`consultantEarnings_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`consultantReviews\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`consultantId\` int NOT NULL,
	\`userId\` int NOT NULL,
	\`bookingId\` int,
	\`rating\` int,
	\`review\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`consultantReviews_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`consultants\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`userId\` int NOT NULL,
	\`fullNameAr\` varchar(255),
	\`fullNameEn\` varchar(255),
	\`phone\` varchar(20),
	\`email\` varchar(320),
	\`profilePicture\` text,
	\`bio\` text,
	\`yearsOfExperience\` int,
	\`hourlyRate\` decimal(10,2),
	\`specializations\` text,
	\`qualifications\` text,
	\`languages\` text,
	\`averageRating\` decimal(3,2),
	\`totalReviews\` int DEFAULT 0,
	\`totalBookings\` int DEFAULT 0,
	\`responseTime\` int,
	\`cancellationRate\` decimal(5,2),
	\`maxDailyBookings\` int DEFAULT 5,
	\`consultantAvailability\` text,
	\`consultantBlockedDates\` text,
	\`verificationStatus\` enum('pending','verified','rejected') DEFAULT 'pending',
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`consultants_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`consultationBookings\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`consultantId\` int NOT NULL,
	\`clientId\` int NOT NULL,
	\`bookingNumber\` varchar(50),
	\`consultationTypeId\` int,
	\`scheduledDate\` date,
	\`scheduledTime\` time,
	\`duration\` int,
	\`status\` enum('pending','confirmed','in-progress','completed','cancelled','no-show') DEFAULT 'pending',
	\`meetingLink\` varchar(255),
	\`notes\` text,
	\`clientNotes\` text,
	\`totalAmount\` decimal(10,2),
	\`finalAmount\` decimal(10,2),
	\`paymentStatus\` enum('pending','paid','refunded') DEFAULT 'pending',
	\`paymentMethod\` varchar(50),
	\`startedAt\` timestamp,
	\`endedAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`consultationBookings_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`consultationMessages\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`bookingId\` int NOT NULL,
	\`senderId\` int NOT NULL,
	\`message\` text,
	\`attachments\` text,
	\`isRead\` boolean DEFAULT false,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`consultationMessages_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`consultationTypes\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`nameAr\` varchar(255),
	\`nameEn\` varchar(255),
	\`descriptionAr\` text,
	\`descriptionEn\` text,
	\`duration\` int,
	\`basePrice\` decimal(10,2),
	\`icon\` varchar(255),
	\`isActive\` boolean DEFAULT true,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`consultationTypes_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`discountCodeUsage\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`codeId\` int NOT NULL,
	\`userId\` int NOT NULL,
	\`usedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`discountCodeUsage_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`discountCodes\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`code\` varchar(50),
	\`discountType\` enum('percentage','fixed'),
	\`discountValue\` decimal(10,2),
	\`maxUsage\` int,
	\`currentUsage\` int DEFAULT 0,
	\`validFrom\` date,
	\`validUntil\` date,
	\`isActive\` boolean DEFAULT true,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`discountCodes_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`documents\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`userId\` int NOT NULL,
	\`documentType\` varchar(100),
	\`documentUrl\` text,
	\`uploadedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`documents_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`emailLogs\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`userId\` int,
	\`recipientEmail\` varchar(320),
	\`subject\` varchar(255),
	\`body\` text,
	\`status\` enum('sent','failed','bounced') DEFAULT 'sent',
	\`sentAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`emailLogs_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`employees\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`companyId\` int NOT NULL,
	\`userId\` int NOT NULL,
	\`fullNameAr\` varchar(255),
	\`fullNameEn\` varchar(255),
	\`email\` varchar(320),
	\`phone\` varchar(20),
	\`position\` varchar(100),
	\`department\` varchar(100),
	\`salary\` decimal(10,2),
	\`joinDate\` date,
	\`endDate\` date,
	\`status\` enum('active','inactive','on_leave','terminated') DEFAULT 'active',
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`employees_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`generatedDocuments\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`userId\` int NOT NULL,
	\`documentType\` varchar(100),
	\`documentUrl\` text,
	\`generatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`generatedDocuments_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`generatedLetters\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`userId\` int NOT NULL,
	\`letterType\` varchar(100),
	\`content\` text,
	\`generatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`generatedLetters_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`hrCases\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`companyId\` int NOT NULL,
	\`caseNumber\` varchar(50),
	\`subject\` varchar(255),
	\`description\` text,
	\`status\` enum('open','in_progress','resolved','closed') DEFAULT 'open',
	\`priority\` enum('low','medium','high','urgent') DEFAULT 'medium',
	\`assignedTo\` int,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`hrCases_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`individualHRs\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`userId\` int NOT NULL,
	\`fullNameAr\` varchar(255),
	\`fullNameEn\` varchar(255),
	\`email\` varchar(320),
	\`phone\` varchar(20),
	\`specialization\` varchar(100),
	\`yearsOfExperience\` int,
	\`certifications\` text,
	\`bio\` text,
	\`profilePicture\` text,
	\`averageRating\` decimal(3,2),
	\`totalReviews\` int DEFAULT 0,
	\`verificationStatus\` enum('pending','verified','rejected') DEFAULT 'pending',
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`individualHRs_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`interviewSchedules\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`applicationId\` int NOT NULL,
	\`scheduledDate\` date,
	\`scheduledTime\` time,
	\`interviewType\` enum('phone','video','in_person'),
	\`interviewer\` varchar(255),
	\`location\` varchar(255),
	\`status\` enum('scheduled','completed','cancelled','rescheduled') DEFAULT 'scheduled',
	\`feedback\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`interviewSchedules_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`jobApplications\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`jobId\` int NOT NULL,
	\`candidateId\` int NOT NULL,
	\`status\` enum('applied','screening','interview','offer','rejected','withdrawn') DEFAULT 'applied',
	\`appliedAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`jobApplications_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`jobs\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`companyId\` int NOT NULL,
	\`titleAr\` varchar(255),
	\`titleEn\` varchar(255),
	\`descriptionAr\` text,
	\`descriptionEn\` text,
	\`requirements\` text,
	\`location\` varchar(255),
	\`salaryMin\` decimal(10,2),
	\`salaryMax\` decimal(10,2),
	\`jobType\` enum('full_time','part_time','contract','temporary'),
	\`status\` enum('open','closed','on_hold') DEFAULT 'open',
	\`postedAt\` timestamp NOT NULL DEFAULT (now()),
	\`closedAt\` timestamp,
	CONSTRAINT \`jobs_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`notificationPreferences\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`userId\` int NOT NULL,
	\`emailNotifications\` boolean DEFAULT true,
	\`smsNotifications\` boolean DEFAULT false,
	\`pushNotifications\` boolean DEFAULT true,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`notificationPreferences_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`notifications\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`userId\` int NOT NULL,
	\`title\` varchar(255),
	\`message\` text,
	\`type\` varchar(50),
	\`isRead\` boolean DEFAULT false,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`notifications_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`passwords\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`userId\` int NOT NULL,
	\`hashedPassword\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`passwords_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`payments\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`userId\` int NOT NULL,
	\`bookingId\` int,
	\`amount\` decimal(10,2),
	\`paymentMethod\` varchar(50),
	\`transactionId\` varchar(100),
	\`status\` enum('pending','completed','failed','refunded') DEFAULT 'pending',
	\`paidAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`payments_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`permissions\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`roleId\` int NOT NULL,
	\`permissionName\` varchar(100),
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`permissions_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`pipelineStages\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`companyId\` int NOT NULL,
	\`stageName\` varchar(100),
	\`stageOrder\` int,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`pipelineStages_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`processingActivities\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`userId\` int NOT NULL,
	\`activityType\` varchar(100),
	\`description\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`processingActivities_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`retentionLogs\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`employeeId\` int NOT NULL,
	\`action\` varchar(100),
	\`reason\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`retentionLogs_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`retentionPolicies\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`companyId\` int NOT NULL,
	\`policyName\` varchar(255),
	\`description\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`retentionPolicies_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`securityIncidents\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`userId\` int NOT NULL,
	\`incidentType\` varchar(100),
	\`description\` text,
	\`severity\` enum('low','medium','high','critical') DEFAULT 'medium',
	\`resolvedAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`securityIncidents_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`smsLogs\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`userId\` int,
	\`recipientPhone\` varchar(20),
	\`message\` text,
	\`status\` enum('sent','failed','bounced') DEFAULT 'sent',
	\`sentAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`smsLogs_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`specializations\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`nameAr\` varchar(255),
	\`nameEn\` varchar(255),
	\`descriptionAr\` text,
	\`descriptionEn\` text,
	\`icon\` varchar(255),
	\`isActive\` boolean DEFAULT true,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`specializations_id\` PRIMARY KEY(\`id\`)
);

CREATE TABLE IF NOT EXISTS \`__drizzle_migrations\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`name\` varchar(255) NOT NULL,
	\`executed_at\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`__drizzle_migrations_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`__drizzle_migrations_name_unique\` UNIQUE(\`name\`)
);
`;

/**
 * Run embedded migrations
 */
export async function runEmbeddedMigrations(connection: any) {
  try {
    console.log("[Embedded Migrations] Starting...");

    // Split by semicolon and execute each statement
    const statements = EMBEDDED_MIGRATIONS.split(";")
      .map(s => s.trim())
      .filter(s => s.length > 0);

    console.log(`[Embedded Migrations] Found ${statements.length} statements`);

    for (const statement of statements) {
      try {
        // Use query() instead of execute() for DDL statements (CREATE TABLE, etc.)
        await (connection as any).query(statement);
      } catch (error: any) {
        // Ignore "table already exists" errors
        if (
          error.code === "ER_TABLE_EXISTS_ERROR" ||
          error.message?.includes("already exists")
        ) {
          console.log(`[Embedded Migrations] ✓ Table already exists (skipped)`);
          continue;
        }
        throw error;
      }
    }

    console.log(
      "[Embedded Migrations] ✓ All migrations completed successfully"
    );
    return true;
  } catch (error) {
    console.error("[Embedded Migrations] ✗ Failed:", error);
    throw error;
  }
}
