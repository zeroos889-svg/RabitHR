-- Migration: Add Database Indexes for Performance Optimization
-- إضافة فهارس قاعدة البيانات لتحسين الأداء

-- Users table indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_openId ON users(openId);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_userType ON users(userType);
CREATE INDEX idx_users_createdAt ON users(createdAt);
CREATE INDEX idx_users_lastSignedIn ON users(lastSignedIn);

-- Passwords table indexes
CREATE INDEX idx_passwords_userId ON passwords(userId);
CREATE INDEX idx_passwords_resetToken ON passwords(resetToken);

-- Companies table indexes
CREATE INDEX idx_companies_userId ON companies(userId);
CREATE INDEX idx_companies_commercialRegister ON companies(commercialRegister);
CREATE INDEX idx_companies_subscriptionStatus ON companies(subscriptionStatus);
CREATE INDEX idx_companies_subscriptionEndDate ON companies(subscriptionEndDate);

-- IndividualHRs table indexes
CREATE INDEX idx_individualHRs_userId ON individualHRs(userId);
CREATE INDEX idx_individualHRs_subscriptionStatus ON individualHRs(subscriptionStatus);

-- Employees table indexes
CREATE INDEX idx_employees_userId ON employees(userId);
CREATE INDEX idx_employees_companyName ON employees(companyName);

-- Subscriptions table indexes
CREATE INDEX idx_subscriptions_userId ON subscriptions(userId);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_endDate ON subscriptions(endDate);

-- Consultation bookings indexes
CREATE INDEX idx_consultationBookings_userId ON consultationBookings(userId);
CREATE INDEX idx_consultationBookings_bookingNumber ON consultationBookings(bookingNumber);
CREATE INDEX idx_consultationBookings_status ON consultationBookings(status);
CREATE INDEX idx_consultationBookings_bookingDate ON consultationBookings(bookingDate);

-- Contracts table indexes
CREATE INDEX idx_contracts_userId ON contracts(userId);
CREATE INDEX idx_contracts_contractType ON contracts(contractType);
CREATE INDEX idx_contracts_status ON contracts(status);
CREATE INDEX idx_contracts_createdAt ON contracts(createdAt);

-- Payrolls table indexes
CREATE INDEX idx_payrolls_userId ON payrolls(userId);
CREATE INDEX idx_payrolls_month ON payrolls(month);
CREATE INDEX idx_payrolls_year ON payrolls(year);
CREATE INDEX idx_payrolls_status ON payrolls(status);

-- Leave requests table indexes
CREATE INDEX idx_leaveRequests_userId ON leaveRequests(userId);
CREATE INDEX idx_leaveRequests_status ON leaveRequests(status);
CREATE INDEX idx_leaveRequests_startDate ON leaveRequests(startDate);

-- Attendance records table indexes
CREATE INDEX idx_attendanceRecords_userId ON attendanceRecords(userId);
CREATE INDEX idx_attendanceRecords_date ON attendanceRecords(date);
CREATE INDEX idx_attendanceRecords_status ON attendanceRecords(status);

-- Performance reviews table indexes
CREATE INDEX idx_performanceReviews_userId ON performanceReviews(userId);
CREATE INDEX idx_performanceReviews_reviewDate ON performanceReviews(reviewDate);

-- Training programs table indexes
CREATE INDEX idx_trainingPrograms_category ON trainingPrograms(category);
CREATE INDEX idx_trainingPrograms_status ON trainingPrograms(status);

-- Training enrollments table indexes
CREATE INDEX idx_trainingEnrollments_userId ON trainingEnrollments(userId);
CREATE INDEX idx_trainingEnrollments_programId ON trainingEnrollments(programId);
CREATE INDEX idx_trainingEnrollments_status ON trainingEnrollments(status);

-- Documents table indexes
CREATE INDEX idx_documents_userId ON documents(userId);
CREATE INDEX idx_documents_documentType ON documents(documentType);
CREATE INDEX idx_documents_status ON documents(status);

-- Notifications table indexes
CREATE INDEX idx_notifications_userId ON notifications(userId);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_createdAt ON notifications(createdAt);

-- Payments table indexes
CREATE INDEX idx_payments_userId ON payments(userId);
CREATE INDEX idx_payments_paymentMethod ON payments(paymentMethod);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_createdAt ON payments(createdAt);

-- Support tickets table indexes
CREATE INDEX idx_supportTickets_userId ON supportTickets(userId);
CREATE INDEX idx_supportTickets_status ON supportTickets(status);
CREATE INDEX idx_supportTickets_priority ON supportTickets(priority);
CREATE INDEX idx_supportTickets_createdAt ON supportTickets(createdAt);

-- Announcements table indexes
CREATE INDEX idx_announcements_targetAudience ON announcements(targetAudience);
CREATE INDEX idx_announcements_publishDate ON announcements(publishDate);

-- Feedback table indexes
CREATE INDEX idx_feedback_userId ON feedback(userId);
CREATE INDEX idx_feedback_rating ON feedback(rating);
CREATE INDEX idx_feedback_createdAt ON feedback(createdAt);
