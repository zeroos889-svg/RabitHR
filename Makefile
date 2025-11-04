# Makefile لإدارة مشروع رابِط HR

.PHONY: help build up down restart logs logs-app logs-db clean health test backup restore

# الأمر الافتراضي - عرض المساعدة
help:
	@echo "أوامر إدارة مشروع رابِط HR:"
	@echo ""
	@echo "  make build      - بناء صور Docker"
	@echo "  make up         - تشغيل جميع الخدمات"
	@echo "  make down       - إيقاف جميع الخدمات"
	@echo "  make restart    - إعادة تشغيل الخدمات"
	@echo "  make logs       - عرض سجلات جميع الخدمات"
	@echo "  make logs-app   - عرض سجلات التطبيق فقط"
	@echo "  make logs-db    - عرض سجلات قاعدة البيانات"
	@echo "  make clean      - حذف جميع الحاويات والبيانات"
	@echo "  make health     - فحص صحة الخدمات"
	@echo "  make test       - تشغيل الاختبارات"
	@echo "  make backup     - عمل نسخة احتياطية من قاعدة البيانات"
	@echo "  make restore    - استعادة نسخة احتياطية"
	@echo ""

# بناء الصور
build:
	@echo "🔨 بناء صور Docker..."
	docker-compose build --no-cache

# تشغيل الخدمات
up:
	@echo "🚀 تشغيل الخدمات..."
	docker-compose up -d
	@echo "✅ الخدمات تعمل الآن!"
	@echo "التطبيق: http://localhost:3000"
	@echo "قاعدة البيانات: localhost:3306"

# إيقاف الخدمات
down:
	@echo "🛑 إيقاف الخدمات..."
	docker-compose down
	@echo "✅ تم إيقاف جميع الخدمات"

# إعادة تشغيل
restart:
	@echo "🔄 إعادة تشغيل الخدمات..."
	docker-compose restart
	@echo "✅ تم إعادة التشغيل"

# عرض السجلات
logs:
	@echo "📋 عرض السجلات..."
	docker-compose logs -f

logs-app:
	@echo "📋 عرض سجلات التطبيق..."
	docker-compose logs -f app

logs-db:
	@echo "📋 عرض سجلات قاعدة البيانات..."
	docker-compose logs -f db

# تنظيف شامل
clean:
	@echo "🧹 تنظيف جميع البيانات..."
	@read -p "هل أنت متأكد؟ سيتم حذف جميع البيانات! (yes/no): " confirm; \
	if [ "$$confirm" = "yes" ]; then \
		docker-compose down -v; \
		docker system prune -af; \
		echo "✅ تم التنظيف بنجاح"; \
	else \
		echo "❌ تم الإلغاء"; \
	fi

# فحص الصحة
health:
	@echo "🏥 فحص صحة الخدمات..."
	@docker-compose ps
	@echo ""
	@echo "فحص التطبيق..."
	@curl -f http://localhost:3000/health 2>/dev/null && echo "✅ التطبيق يعمل" || echo "❌ التطبيق لا يستجيب"
	@echo ""
	@echo "فحص قاعدة البيانات..."
	@docker exec rabithr-db mysqladmin ping -h localhost 2>/dev/null && echo "✅ قاعدة البيانات تعمل" || echo "❌ قاعدة البيانات لا تستجيب"

# تشغيل الاختبارات
test:
	@echo "🧪 تشغيل الاختبارات..."
	npm run test

# نسخة احتياطية
backup:
	@echo "💾 إنشاء نسخة احتياطية..."
	@mkdir -p backups
	@BACKUP_FILE="backups/backup_$$(date +%Y%m%d_%H%M%S).sql"; \
	docker exec rabithr-db mysqldump -u root -p$${MYSQL_ROOT_PASSWORD:-rootpassword} rabithr > $$BACKUP_FILE; \
	echo "✅ تم حفظ النسخة الاحتياطية: $$BACKUP_FILE"

# استعادة نسخة احتياطية
restore:
	@echo "📥 استعادة نسخة احتياطية..."
	@if [ -z "$(FILE)" ]; then \
		echo "❌ يرجى تحديد الملف: make restore FILE=backups/backup.sql"; \
	else \
		docker exec -i rabithr-db mysql -u root -p$${MYSQL_ROOT_PASSWORD:-rootpassword} rabithr < $(FILE); \
		echo "✅ تم استعادة النسخة الاحتياطية من: $(FILE)"; \
	fi

# Development commands
dev:
	@echo "🔧 تشغيل وضع التطوير..."
	npm run dev

install:
	@echo "📦 تثبيت التبعيات..."
	npm install --legacy-peer-deps

# Database commands
db-push:
	@echo "🗄️ تحديث قاعدة البيانات..."
	npm run db:push

db-shell:
	@echo "💻 الدخول إلى قاعدة البيانات..."
	docker exec -it rabithr-db mysql -u root -p$${MYSQL_ROOT_PASSWORD:-rootpassword} rabithr
