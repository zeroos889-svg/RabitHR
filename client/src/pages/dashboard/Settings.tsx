import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Settings as SettingsIcon,
  Building2,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Upload,
} from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    weekly: true,
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent flex items-center gap-2">
            <SettingsIcon className="h-8 w-8 text-gray-600" />
            الإعدادات
          </h1>
          <p className="text-muted-foreground mt-1">
            إدارة إعدادات الشركة والحساب والنظام
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="company" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="company">الشركة</TabsTrigger>
            <TabsTrigger value="account">الحساب</TabsTrigger>
            <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
            <TabsTrigger value="security">الأمان</TabsTrigger>
            <TabsTrigger value="appearance">المظهر</TabsTrigger>
          </TabsList>

          {/* Company Settings */}
          <TabsContent value="company" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  معلومات الشركة
                </CardTitle>
                <CardDescription>
                  تحديث البيانات الأساسية للشركة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">اسم الشركة *</Label>
                    <Input
                      id="company-name"
                      placeholder="مثال: شركة التقنية المتقدمة"
                      defaultValue="شركة التقنية المتقدمة"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-name-en">
                      اسم الشركة (بالإنجليزية)
                    </Label>
                    <Input
                      id="company-name-en"
                      placeholder="Advanced Technology Company"
                      defaultValue="Advanced Technology Company"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cr-number">السجل التجاري</Label>
                    <Input
                      id="cr-number"
                      placeholder="1234567890"
                      defaultValue="1234567890"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-number">الرقم الضريبي</Label>
                    <Input
                      id="tax-number"
                      placeholder="300123456789003"
                      defaultValue="300123456789003"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-address">عنوان الشركة</Label>
                  <Textarea
                    id="company-address"
                    placeholder="العنوان الكامل للشركة"
                    defaultValue="الرياض، حي الملقا، شارع الملك فهد"
                    rows={3}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company-phone">رقم الهاتف</Label>
                    <Input
                      id="company-phone"
                      placeholder="0570700355"
                      defaultValue="0570700355"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-email">البريد الإلكتروني</Label>
                    <Input
                      id="company-email"
                      type="email"
                      placeholder="info@company.com"
                      defaultValue="info@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-logo">شعار الشركة</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                      <Building2 className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <Input id="company-logo" type="file" accept="image/*" />
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG أو SVG (حجم أقصى 2MB)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Save className="h-4 w-4 ml-2" />
                    حفظ التغييرات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-green-600" />
                  الملف الشخصي
                </CardTitle>
                <CardDescription>تحديث معلوماتك الشخصية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    أ
                  </div>
                  <div className="flex-1">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 ml-2" />
                      تحميل صورة
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG أو PNG (حجم أقصى 1MB)
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">الاسم الكامل *</Label>
                    <Input
                      id="full-name"
                      placeholder="أحمد محمد العلي"
                      defaultValue="أحمد محمد العلي"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-title">المسمى الوظيفي</Label>
                    <Input
                      id="job-title"
                      placeholder="مدير الموارد البشرية"
                      defaultValue="مدير الموارد البشرية"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="user-email">البريد الإلكتروني</Label>
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="ahmed@company.com"
                      defaultValue="ahmed@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-phone">رقم الجوال</Label>
                    <Input
                      id="user-phone"
                      placeholder="0570700355"
                      defaultValue="0570700355"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">نبذة تعريفية</Label>
                  <Textarea
                    id="bio"
                    placeholder="نبذة مختصرة عنك..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
                    <Save className="h-4 w-4 ml-2" />
                    حفظ التغييرات
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تغيير كلمة المرور</CardTitle>
                <CardDescription>تحديث كلمة المرور الخاصة بك</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="flex justify-end">
                  <Button variant="outline">تحديث كلمة المرور</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-yellow-600" />
                  تفضيلات الإشعارات
                </CardTitle>
                <CardDescription>اختر كيف تريد تلقي الإشعارات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">
                      إشعارات البريد الإلكتروني
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      تلقي الإشعارات عبر البريد الإلكتروني
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={checked =>
                      setNotifications({ ...notifications, email: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">
                      إشعارات الرسائل النصية
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      تلقي الإشعارات عبر الرسائل النصية
                    </p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={notifications.sms}
                    onCheckedChange={checked =>
                      setNotifications({ ...notifications, sms: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">
                      الإشعارات الفورية
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      تلقي الإشعارات الفورية في المتصفح
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.push}
                    onCheckedChange={checked =>
                      setNotifications({ ...notifications, push: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weekly-report">التقرير الأسبوعي</Label>
                    <p className="text-sm text-muted-foreground">
                      تلقي ملخص أسبوعي للنشاطات
                    </p>
                  </div>
                  <Switch
                    id="weekly-report"
                    checked={notifications.weekly}
                    onCheckedChange={checked =>
                      setNotifications({ ...notifications, weekly: checked })
                    }
                  />
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">إشعارات محددة</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="new-employee">موظف جديد</Label>
                      <Switch id="new-employee" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="leave-request">طلب إجازة</Label>
                      <Switch id="leave-request" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="new-ticket">تذكرة جديدة</Label>
                      <Switch id="new-ticket" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="new-applicant">متقدم جديد</Label>
                      <Switch id="new-applicant" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-yellow-600 to-orange-600">
                    <Save className="h-4 w-4 ml-2" />
                    حفظ التفضيلات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  الأمان والخصوصية
                </CardTitle>
                <CardDescription>
                  إدارة إعدادات الأمان والخصوصية
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">المصادقة الثنائية</Label>
                    <p className="text-sm text-muted-foreground">
                      إضافة طبقة أمان إضافية لحسابك
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    تفعيل
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>الجلسات النشطة</Label>
                    <p className="text-sm text-muted-foreground">
                      إدارة الأجهزة المتصلة بحسابك
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    عرض الجلسات
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>سجل النشاطات</Label>
                    <p className="text-sm text-muted-foreground">
                      عرض سجل جميع النشاطات على حسابك
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    عرض السجل
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3 text-red-600">
                    منطقة الخطر
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                      <div>
                        <p className="font-medium">تعطيل الحساب</p>
                        <p className="text-sm text-muted-foreground">
                          تعطيل الحساب مؤقتاً
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        تعطيل
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                      <div>
                        <p className="font-medium">حذف الحساب</p>
                        <p className="text-sm text-muted-foreground">
                          حذف الحساب نهائياً وجميع البيانات
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">
                        حذف
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-purple-600" />
                  المظهر واللغة
                </CardTitle>
                <CardDescription>تخصيص مظهر النظام واللغة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>السمة (Theme)</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border-2 border-blue-600 rounded-lg p-4 cursor-pointer">
                      <div className="h-20 bg-white rounded mb-2"></div>
                      <p className="text-sm font-medium text-center">فاتح</p>
                    </div>
                    <div className="border-2 border-transparent hover:border-gray-300 rounded-lg p-4 cursor-pointer">
                      <div className="h-20 bg-gray-900 rounded mb-2"></div>
                      <p className="text-sm font-medium text-center">داكن</p>
                    </div>
                    <div className="border-2 border-transparent hover:border-gray-300 rounded-lg p-4 cursor-pointer">
                      <div className="h-20 bg-gradient-to-br from-white to-gray-900 rounded mb-2"></div>
                      <p className="text-sm font-medium text-center">تلقائي</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">اللغة</Label>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <select
                      id="language"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compact-mode">الوضع المضغوط</Label>
                    <p className="text-sm text-muted-foreground">
                      عرض المزيد من المحتوى في الشاشة
                    </p>
                  </div>
                  <Switch id="compact-mode" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">الحركات والتأثيرات</Label>
                    <p className="text-sm text-muted-foreground">
                      تفعيل الحركات الانتقالية
                    </p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Save className="h-4 w-4 ml-2" />
                    حفظ التفضيلات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
