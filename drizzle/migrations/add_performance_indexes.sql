-- Migration: إضافة Indexes لتحسين الأداء
-- تاريخ: 2024-11-04
-- الوصف: إضافة فهارس على الجداول الأكثر استخداماً لتحسين أداء الاستعلامات

-- Indexes لجدول consultants
CREATE INDEX IF NOT EXISTS idx_consultants_status ON consultants(status);
CREATE INDEX IF NOT EXISTS idx_consultants_email ON consultants(email);

-- Indexes لجدول consultationBookings  
CREATE INDEX IF NOT EXISTS idx_bookings_client ON consultationBookings(clientId);
CREATE INDEX IF NOT EXISTS idx_bookings_consultant ON consultationBookings(consultantId);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON consultationBookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON consultationBookings(scheduledDate);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON consultationBookings(createdAt);

-- Indexes لجدول consultantReviews
CREATE INDEX IF NOT EXISTS idx_reviews_consultant ON consultantReviews(consultantId);
CREATE INDEX IF NOT EXISTS idx_reviews_client ON consultantReviews(clientId);
CREATE INDEX IF NOT EXISTS idx_reviews_booking ON consultantReviews(bookingId);

-- Indexes لجدول users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_created ON users(createdAt);

-- Indexes لجدول consultationTypes
CREATE INDEX IF NOT EXISTS idx_consultation_types_active ON consultationTypes(isActive);

-- Composite indexes للاستعلامات المعقدة
CREATE INDEX IF NOT EXISTS idx_bookings_consultant_status ON consultationBookings(consultantId, status);
CREATE INDEX IF NOT EXISTS idx_bookings_client_status ON consultationBookings(clientId, status);
CREATE INDEX IF NOT EXISTS idx_bookings_date_status ON consultationBookings(scheduledDate, status);
