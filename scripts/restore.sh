#!/bin/bash
# سكريبت استعادة النسخة الاحتياطية

set -e

# الألوان للعرض
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# التحقق من وجود معامل الملف
if [ -z "$1" ]; then
    echo -e "${RED}❌ خطأ: يجب تحديد ملف النسخة الاحتياطية!${NC}"
    echo -e "${YELLOW}الاستخدام: $0 <backup_file>${NC}"
    echo -e "${YELLOW}مثال: $0 backups/rabithr_backup_20251104_120000.sql.gz${NC}"
    exit 1
fi

BACKUP_FILE="$1"

# التحقق من وجود الملف
if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}❌ خطأ: الملف غير موجود: $BACKUP_FILE${NC}"
    exit 1
fi

echo -e "${YELLOW}⚠️  تحذير: سيتم استبدال جميع البيانات الحالية!${NC}"
read -p "هل أنت متأكد؟ (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo -e "${YELLOW}❌ تم الإلغاء${NC}"
    exit 0
fi

# قراءة كلمة المرور من .env أو استخدام القيمة الافتراضية
MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD:-rootpassword}

# التحقق من أن الحاوية تعمل
if ! docker ps | grep -q rabithr-db; then
    echo -e "${RED}❌ خطأ: حاوية قاعدة البيانات غير مشغلة!${NC}"
    echo -e "${YELLOW}قم بتشغيلها باستخدام: docker-compose up -d${NC}"
    exit 1
fi

echo -e "${YELLOW}🔄 بدء عملية الاستعادة...${NC}"

# فك ضغط الملف إذا كان مضغوطاً
TEMP_FILE=""
if [[ "$BACKUP_FILE" == *.gz ]]; then
    echo -e "${YELLOW}📦 فك ضغط الملف...${NC}"
    TEMP_FILE="${BACKUP_FILE%.gz}"
    gunzip -c "$BACKUP_FILE" > "$TEMP_FILE"
    RESTORE_FILE="$TEMP_FILE"
else
    RESTORE_FILE="$BACKUP_FILE"
fi

# استعادة البيانات
echo -e "${YELLOW}📥 جاري استعادة البيانات...${NC}"
docker exec -i rabithr-db mysql \
    -u root \
    -p"$MYSQL_ROOT_PASSWORD" \
    rabithr < "$RESTORE_FILE"

# التحقق من نجاح العملية
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ تم استعادة النسخة الاحتياطية بنجاح!${NC}"
    
    # حذف الملف المؤقت
    if [ -n "$TEMP_FILE" ] && [ -f "$TEMP_FILE" ]; then
        rm "$TEMP_FILE"
    fi
    
    # إعادة تشغيل التطبيق
    echo -e "${YELLOW}🔄 إعادة تشغيل التطبيق...${NC}"
    docker-compose restart app
    echo -e "${GREEN}✅ اكتمل!${NC}"
else
    echo -e "${RED}❌ فشل استعادة النسخة الاحتياطية!${NC}"
    
    # حذف الملف المؤقت
    if [ -n "$TEMP_FILE" ] && [ -f "$TEMP_FILE" ]; then
        rm "$TEMP_FILE"
    fi
    exit 1
fi
