#!/bin/bash
# سكريبت النسخ الاحتياطي لقاعدة البيانات

set -e

# الألوان للعرض
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔄 بدء عملية النسخ الاحتياطي...${NC}"

# إنشاء مجلد النسخ الاحتياطية
BACKUP_DIR="backups"
mkdir -p "$BACKUP_DIR"

# اسم الملف مع التاريخ
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/rabithr_backup_$TIMESTAMP.sql"

# قراءة كلمة المرور من .env أو استخدام القيمة الافتراضية
MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD:-rootpassword}

# التحقق من أن الحاوية تعمل
if ! docker ps | grep -q rabithr-db; then
    echo -e "${RED}❌ خطأ: حاوية قاعدة البيانات غير مشغلة!${NC}"
    echo -e "${YELLOW}قم بتشغيلها باستخدام: docker-compose up -d${NC}"
    exit 1
fi

# عمل النسخة الاحتياطية
echo -e "${YELLOW}📦 جاري حفظ البيانات...${NC}"
docker exec rabithr-db mysqldump \
    -u root \
    -p"$MYSQL_ROOT_PASSWORD" \
    --single-transaction \
    --routines \
    --triggers \
    --events \
    rabithr > "$BACKUP_FILE"

# التحقق من نجاح العملية
if [ $? -eq 0 ]; then
    # حساب حجم الملف
    FILESIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo -e "${GREEN}✅ تم إنشاء النسخة الاحتياطية بنجاح!${NC}"
    echo -e "${GREEN}📁 الموقع: $BACKUP_FILE${NC}"
    echo -e "${GREEN}📊 الحجم: $FILESIZE${NC}"
    
    # ضغط الملف
    echo -e "${YELLOW}🗜️  جاري ضغط الملف...${NC}"
    gzip "$BACKUP_FILE"
    COMPRESSED_SIZE=$(du -h "$BACKUP_FILE.gz" | cut -f1)
    echo -e "${GREEN}✅ تم الضغط بنجاح! الحجم الجديد: $COMPRESSED_SIZE${NC}"
    
    # حذف النسخ القديمة (الاحتفاظ بآخر 7 نسخ)
    echo -e "${YELLOW}🧹 حذف النسخ القديمة...${NC}"
    ls -t "$BACKUP_DIR"/rabithr_backup_*.sql.gz 2>/dev/null | tail -n +8 | xargs -r rm
    echo -e "${GREEN}✅ تم الاحتفاظ بآخر 7 نسخ احتياطية${NC}"
else
    echo -e "${RED}❌ فشل إنشاء النسخة الاحتياطية!${NC}"
    rm -f "$BACKUP_FILE"
    exit 1
fi
