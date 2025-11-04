# 🔒 إشعار أمني - Security Notice

## ⚠️ تحذير هام

**لا تشارك أبداً كلمات المرور أو المفاتيح السرية في:**
- ❌ ملفات التوثيق (README, guides, etc.)
- ❌ الكود المصدري
- ❌ Git commits
- ❌ Pull requests
- ❌ Issues
- ❌ المنتديات العامة

---

## 🔐 كيفية الحصول على بيانات الاعتماد بشكل آمن

### Railway MySQL:

1. اذهب إلى [railway.app/dashboard](https://railway.app/dashboard)
2. اختر مشروعك
3. انقر على MySQL service
4. اذهب إلى **Variables** tab
5. انسخ `DATABASE_URL` الكامل (يتضمن كلمة المرور)
6. استخدمه في ملف `.env` المحلي فقط
7. أضفه في Vercel Environment Variables

**رابط الاتصال**:
```bash
# احصل على الرابط الكامل من Railway Dashboard
# النموذج: mysql://root:<PASSWORD>@host:port/database
DATABASE_URL=mysql://root:<GET_FROM_RAILWAY>@shortline.proxy.rlwy.net:18829/railway
```

### TiDB Cloud:

1. اذهب إلى [tidbcloud.com](https://tidbcloud.com)
2. افتح لوحة التحكم
3. اختر Cluster الخاص بك
4. اذهب إلى **Connect** → **Standard Connection**
5. انسخ كلمة المرور أو أعد إنشاء واحدة جديدة
6. استخدمها في ملف `.env` المحلي فقط
7. أضفها في Vercel Environment Variables

**رابط الاتصال**:
```bash
# احصل على كلمة المرور من TiDB Dashboard
# النموذج: mysql://user:<PASSWORD>@host:port/database
DATABASE_URL=mysql://3aDHzR1a2i2PxnQ.root:<GET_FROM_TIDB>@gateway01.eu-central-1.prod.aws.tidbcloud.com:4000/test
```

---

## 🛡️ أفضل الممارسات الأمنية

### 1. استخدم Environment Variables

✅ **صحيح**:
```bash
# في ملف .env (مُستثنى من Git)
DATABASE_URL=mysql://root:actual_password_here@host:port/db
JWT_SECRET=actual_secret_here
```

❌ **خطأ**:
```javascript
// في الكود المصدري
const dbPassword = "actual_password_here"; // لا تفعل هذا أبداً!
```

### 2. استخدم .gitignore

تأكد من أن ملف `.gitignore` يتضمن:
```
.env
.env.local
.env*.local
*.key
*.pem
secrets/
```

### 3. استخدم Placeholders في التوثيق

✅ **صحيح**:
```bash
DATABASE_URL=mysql://root:<PASSWORD>@host:port/db
JWT_SECRET=<YOUR_SECRET_HERE>
```

❌ **خطأ**:
```bash
DATABASE_URL=mysql://root:MyRealPassword123@host:port/db
JWT_SECRET=my-actual-secret-key-here
```

### 4. أعد تعيين كلمات المرور المكشوفة

إذا كشفت كلمة مرور عن طريق الخطأ:

1. **أعد تعيين كلمة المرور فوراً** في لوحة التحكم (Railway/TiDB)
2. **حدّث المتغيرات** في Vercel
3. **حدّث `.env`** المحلي
4. **أعد نشر** التطبيق
5. **أخطر الفريق** إذا كان مشروع مشترك

### 5. استخدم أدوات الأمان

- **GitGuardian**: يكتشف الأسرار في Git تلقائياً
- **git-secrets**: يمنع commit للأسرار
- **pre-commit hooks**: فحص قبل الـ commit

تثبيت git-secrets:
```bash
# تثبيت
brew install git-secrets  # macOS
# أو
sudo apt-get install git-secrets  # Linux

# إعداد للمشروع
cd /path/to/project
git secrets --install
git secrets --register-aws
```

---

## 📋 قائمة تحقق الأمان

قبل أي commit:
- [ ] تأكدت من عدم وجود كلمات مرور في الكود
- [ ] تأكدت من عدم وجود API keys مكشوفة
- [ ] تأكدت من أن `.env` في `.gitignore`
- [ ] استخدمت placeholders في التوثيق
- [ ] راجعت `git diff` قبل الـ commit

قبل أي pull request:
- [ ] راجعت جميع الملفات المعدلة
- [ ] تأكدت من عدم وجود بيانات حساسة
- [ ] استخدمت أمثلة وهمية فقط
- [ ] أضفت تحذيرات أمنية عند الحاجة

---

## 🚨 إذا كشفت سراً عن طريق الخطأ

### الخطوات الفورية:

1. **أوقف الوصول فوراً**:
   - أعد تعيين كلمة المرور
   - أبطل API key
   - حدّث جميع المتغيرات

2. **نظف Git History** (اختياري - متقدم):
   ```bash
   # تحذير: هذا يعيد كتابة التاريخ!
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch PATH/TO/FILE" \
     --prune-empty --tag-name-filter cat -- --all
   ```

3. **أخطر الفريق**:
   - إذا كان مشروع مشترك
   - وثّق الحادثة
   - راجع الإجراءات الأمنية

4. **راقب النشاط**:
   - راقب logs لأي نشاط مشبوه
   - راجع الوصول غير المصرح به

---

## 📚 موارد إضافية

- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [OWASP Secrets Management](https://owasp.org/www-community/vulnerabilities/Use_of_hard-coded_password)
- [Railway Security](https://docs.railway.app/reference/security)
- [TiDB Cloud Security](https://docs.pingcap.com/tidbcloud/tidb-cloud-security)

---

## 🆘 الدعم

إذا كنت بحاجة لمساعدة في الأمان:

- 📧 **البريد**: security@rbithr.com
- 📱 **الهاتف**: 0570700355
- 🌐 **الموقع**: https://rabit.sa

---

<div align="center">

**🔒 الأمان أولاً - Security First 🔒**

**حافظ على أسرارك آمنة!**

</div>
