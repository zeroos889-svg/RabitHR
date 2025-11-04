#!/bin/bash
# تنظيف النسخ الاحتياطية القديمة

set -e

BACKUP_DIR="backups"
RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-30}

echo "🧹 تنظيف النسخ الاحتياطية الأقدم من $RETENTION_DAYS يوم..."

# حذف النسخ المحلية القديمة
find "$BACKUP_DIR" -name "rabithr_backup_*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete
echo "✅ تم حذف النسخ المحلية القديمة"

# حذف النسخ من S3 (إذا كان مفعّل)
if [ -n "$AWS_S3_BUCKET" ] && [ -n "$AWS_ACCESS_KEY_ID" ]; then
    echo "🗑️  حذف النسخ القديمة من S3..."
    CUTOFF_DATE=$(date -d "$RETENTION_DAYS days ago" +%Y-%m-%d)
    
    aws s3 ls s3://$AWS_S3_BUCKET/backups/ | while read -r line; do
        CREATE_DATE=$(echo $line | awk '{print $1}')
        FILE=$(echo $line | awk '{print $4}')
        
        if [[ "$CREATE_DATE" < "$CUTOFF_DATE" ]]; then
            aws s3 rm s3://$AWS_S3_BUCKET/backups/$FILE
            echo "  حذف: $FILE"
        fi
    done
    echo "✅ تم التنظيف من S3"
fi

echo "✅ اكتمل التنظيف!"
