-- Database Optimization Script for Rabit HR Platform
-- This script adds indexes and optimizations for better performance

-- ==============================================
-- USERS TABLE OPTIMIZATION
-- ==============================================

-- Index on email for faster login lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Index on username for authentication
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Index on role for role-based queries
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Composite index for active users
CREATE INDEX IF NOT EXISTS idx_users_active_role ON users(role, createdAt) WHERE deletedAt IS NULL;

-- ==============================================
-- EMPLOYEES TABLE OPTIMIZATION
-- ==============================================

-- Index on employee ID for quick lookups
CREATE INDEX IF NOT EXISTS idx_employees_employee_id ON employees(employeeId);

-- Index on department for department queries
CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department);

-- Index on status for filtering
CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(status);

-- Composite index for department + status
CREATE INDEX IF NOT EXISTS idx_employees_dept_status ON employees(department, status);

-- Index on hire date for anniversary queries
CREATE INDEX IF NOT EXISTS idx_employees_hire_date ON employees(hireDate);

-- Full-text search on name (if MySQL 5.7+)
-- CREATE FULLTEXT INDEX idx_employees_name_fulltext ON employees(fullName);

-- ==============================================
-- ATTENDANCE TABLE OPTIMIZATION
-- ==============================================

-- Index on employee ID
CREATE INDEX IF NOT EXISTS idx_attendance_employee ON attendance(employeeId);

-- Index on date for date range queries
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);

-- Composite index for employee + date
CREATE INDEX IF NOT EXISTS idx_attendance_emp_date ON attendance(employeeId, date);

-- Index on status
CREATE INDEX IF NOT EXISTS idx_attendance_status ON attendance(status);

-- ==============================================
-- LEAVE REQUESTS OPTIMIZATION
-- ==============================================

-- Index on employee ID
CREATE INDEX IF NOT EXISTS idx_leave_employee ON leaveRequests(employeeId);

-- Index on status for approval workflows
CREATE INDEX IF NOT EXISTS idx_leave_status ON leaveRequests(status);

-- Index on leave type
CREATE INDEX IF NOT EXISTS idx_leave_type ON leaveRequests(leaveType);

-- Composite index for employee + status
CREATE INDEX IF NOT EXISTS idx_leave_emp_status ON leaveRequests(employeeId, status);

-- Index on start date for calendar views
CREATE INDEX IF NOT EXISTS idx_leave_start_date ON leaveRequests(startDate);

-- ==============================================
-- CONSULTATIONS OPTIMIZATION
-- ==============================================

-- Index on consultant ID
CREATE INDEX IF NOT EXISTS idx_consultations_consultant ON consultations(consultantId);

-- Index on client ID
CREATE INDEX IF NOT EXISTS idx_consultations_client ON consultations(userId);

-- Index on status
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);

-- Composite index for consultant + status
CREATE INDEX IF NOT EXISTS idx_consultations_cons_status ON consultations(consultantId, status);

-- Index on created date
CREATE INDEX IF NOT EXISTS idx_consultations_created ON consultations(createdAt);

-- ==============================================
-- DOCUMENTS OPTIMIZATION
-- ==============================================

-- Index on employee ID
CREATE INDEX IF NOT EXISTS idx_documents_employee ON documents(employeeId);

-- Index on document type
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(documentType);

-- Index on uploaded date
CREATE INDEX IF NOT EXISTS idx_documents_uploaded ON documents(uploadedAt);

-- ==============================================
-- PAYROLL OPTIMIZATION
-- ==============================================

-- Index on employee ID
CREATE INDEX IF NOT EXISTS idx_payroll_employee ON payroll(employeeId);

-- Index on payment date
CREATE INDEX IF NOT EXISTS idx_payroll_date ON payroll(paymentDate);

-- Index on period (month/year)
CREATE INDEX IF NOT EXISTS idx_payroll_period ON payroll(periodMonth, periodYear);

-- Composite index for employee + period
CREATE INDEX IF NOT EXISTS idx_payroll_emp_period ON payroll(employeeId, periodYear, periodMonth);

-- ==============================================
-- PERFORMANCE REVIEWS OPTIMIZATION
-- ==============================================

-- Index on employee ID
CREATE INDEX IF NOT EXISTS idx_reviews_employee ON performanceReviews(employeeId);

-- Index on reviewer ID
CREATE INDEX IF NOT EXISTS idx_reviews_reviewer ON performanceReviews(reviewerId);

-- Index on review date
CREATE INDEX IF NOT EXISTS idx_reviews_date ON performanceReviews(reviewDate);

-- Index on status
CREATE INDEX IF NOT EXISTS idx_reviews_status ON performanceReviews(status);

-- ==============================================
-- SESSIONS OPTIMIZATION
-- ==============================================

-- Index on user ID
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(userId);

-- Index on token for quick lookups
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);

-- Index on expiry for cleanup
CREATE INDEX IF NOT EXISTS idx_sessions_expiry ON sessions(expiresAt);

-- ==============================================
-- AUDIT LOGS OPTIMIZATION
-- ==============================================

-- Index on user ID
CREATE INDEX IF NOT EXISTS idx_audit_user ON auditLogs(userId);

-- Index on action type
CREATE INDEX IF NOT EXISTS idx_audit_action ON auditLogs(action);

-- Index on timestamp
CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON auditLogs(timestamp);

-- Composite index for user + timestamp
CREATE INDEX IF NOT EXISTS idx_audit_user_time ON auditLogs(userId, timestamp);

-- ==============================================
-- NOTIFICATIONS OPTIMIZATION
-- ==============================================

-- Index on user ID
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(userId);

-- Index on read status
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(isRead);

-- Composite index for user + unread
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(userId, isRead) WHERE isRead = 0;

-- Index on created date
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(createdAt);

-- ==============================================
-- QUERY OPTIMIZATION HINTS
-- ==============================================

-- Analyze tables to update statistics
ANALYZE TABLE users, employees, attendance, leaveRequests, consultations, 
             documents, payroll, performanceReviews, sessions, auditLogs, notifications;

-- ==============================================
-- PERFORMANCE MONITORING QUERIES
-- ==============================================

-- Check index usage
-- SELECT * FROM sys.schema_unused_indexes;

-- Check slow queries
-- SELECT * FROM mysql.slow_log ORDER BY query_time DESC LIMIT 10;

-- Check table sizes
-- SELECT 
--   table_name,
--   ROUND(((data_length + index_length) / 1024 / 1024), 2) AS "Size (MB)"
-- FROM information_schema.TABLES
-- WHERE table_schema = DATABASE()
-- ORDER BY (data_length + index_length) DESC;

-- ==============================================
-- CLEANUP OLD DATA (Run periodically)
-- ==============================================

-- Delete old sessions (older than 30 days)
-- DELETE FROM sessions WHERE expiresAt < DATE_SUB(NOW(), INTERVAL 30 DAY);

-- Archive old audit logs (older than 1 year)
-- CREATE TABLE IF NOT EXISTS auditLogs_archive LIKE auditLogs;
-- INSERT INTO auditLogs_archive SELECT * FROM auditLogs WHERE timestamp < DATE_SUB(NOW(), INTERVAL 1 YEAR);
-- DELETE FROM auditLogs WHERE timestamp < DATE_SUB(NOW(), INTERVAL 1 YEAR);
