import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  FileText,
  Search,
  Plus,
  Copy,
  Download,
  Edit,
  Trash2,
  Star,
  Mail,
  FileSignature,
  ClipboardList,
  Eye,
  Save,
  X,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [editorTitle, setEditorTitle] = useState("");

  // قوالب الرسائل
  const emailTemplates = [
    {
      id: 1,
      title: "عرض عمل",
      description: "رسالة عرض عمل رسمية للمرشح",
      category: "توظيف",
      usageCount: 145,
      isFavorite: true,
      content: `السيد/ة {{candidate_name}} المحترم/ة،

تحية طيبة وبعد،

يسرنا في {{company_name}} أن نقدم لكم عرض عمل لشغل وظيفة {{job_title}} في قسم {{department}}.

تفاصيل العرض:
- المسمى الوظيفي: {{job_title}}
- الراتب الشهري: {{salary}} ريال
- تاريخ المباشرة: {{start_date}}
- موقع العمل: {{location}}

المزايا:
- تأمين طبي شامل
- إجازة سنوية مدفوعة (21 يوم)
- بدل سكن وانتقال

نأمل قبول هذا العرض والرد علينا في أقرب وقت ممكن.

مع أطيب التحيات،
{{sender_name}}
{{sender_title}}
{{company_name}}`,
    },
    {
      id: 2,
      title: "رفض مرشح",
      description: "رسالة رفض مهذبة للمتقدم",
      category: "توظيف",
      usageCount: 89,
      isFavorite: false,
      content: `السيد/ة {{candidate_name}} المحترم/ة،

تحية طيبة وبعد،

نشكر لكم اهتمامكم بالانضمام إلى {{company_name}} والتقدم لوظيفة {{job_title}}.

بعد مراجعة دقيقة لطلبكم ومقارنته بمتطلبات الوظيفة، نأسف لإبلاغكم بأننا قررنا عدم المضي قدماً في طلبكم في الوقت الحالي.

نقدر الوقت والجهد الذي بذلتموه في عملية التقديم، ونتمنى لكم كل التوفيق في مسيرتكم المهنية.

مع أطيب التحيات،
{{sender_name}}
فريق الموارد البشرية
{{company_name}}`,
    },
    {
      id: 3,
      title: "قبول استقالة",
      description: "رسالة قبول استقالة موظف",
      category: "إنهاء خدمة",
      usageCount: 67,
      isFavorite: true,
      content: `السيد/ة {{employee_name}} المحترم/ة،

تحية طيبة وبعد،

نشير إلى طلب استقالتكم المقدم بتاريخ {{resignation_date}}، ونفيدكم بقبول الاستقالة اعتباراً من {{last_working_day}}.

نشكر لكم جهودكم وإسهاماتكم خلال فترة عملكم معنا، ونتمنى لكم التوفيق في مسيرتكم المهنية القادمة.

يرجى التنسيق مع قسم الموارد البشرية لإتمام إجراءات تسليم المهام والمستحقات.

مع أطيب التحيات،
{{sender_name}}
{{sender_title}}
{{company_name}}`,
    },
    {
      id: 4,
      title: "ترحيب بموظف جديد",
      description: "رسالة ترحيب للموظف الجديد",
      category: "توظيف",
      usageCount: 123,
      isFavorite: true,
      content: `السيد/ة {{employee_name}} المحترم/ة،

أهلاً وسهلاً بك في {{company_name}}!

يسعدنا انضمامك إلى فريقنا كـ {{job_title}} في قسم {{department}}.

تفاصيل يوم المباشرة:
- التاريخ: {{start_date}}
- الوقت: {{start_time}}
- المكان: {{location}}
- المسؤول المباشر: {{manager_name}}

يرجى إحضار المستندات التالية:
- صورة من الهوية الوطنية
- الشهادات العلمية
- شهادات الخبرة

نتطلع للعمل معك!

مع أطيب التحيات،
فريق الموارد البشرية
{{company_name}}`,
    },
    {
      id: 5,
      title: "تهنئة بالترقية",
      description: "رسالة تهنئة للموظف بالترقية",
      category: "داخلي",
      usageCount: 54,
      isFavorite: false,
      content: `السيد/ة {{employee_name}} المحترم/ة،

تحية طيبة وبعد،

يسرنا أن نهنئك بترقيتك إلى منصب {{new_position}} اعتباراً من {{effective_date}}.

هذه الترقية تأتي تقديراً لجهودك المتميزة وإنجازاتك خلال فترة عملك معنا.

التفاصيل الجديدة:
- المسمى الوظيفي: {{new_position}}
- القسم: {{new_department}}
- الراتب الجديد: {{new_salary}} ريال
- المسؤول المباشر: {{new_manager}}

نتمنى لك المزيد من النجاح والتميز!

مع أطيب التحيات،
{{sender_name}}
{{sender_title}}
{{company_name}}`,
    },
  ];

  // قوالب العقود
  const contractTemplates = [
    {
      id: 6,
      title: "عقد عمل دائم",
      description: "عقد عمل دائم وفق نظام العمل السعودي",
      category: "عقود",
      usageCount: 234,
      isFavorite: true,
      content: `عقد عمل

بين كل من:
الطرف الأول: {{company_name}} (صاحب العمل)
السجل التجاري: {{commercial_register}}
العنوان: {{company_address}}

الطرف الثاني: {{employee_name}} (الموظف)
رقم الهوية: {{national_id}}
الجنسية: {{nationality}}
العنوان: {{employee_address}}

تم الاتفاق على ما يلي:

المادة الأولى: طبيعة العمل
يعمل الطرف الثاني لدى الطرف الأول بوظيفة {{job_title}} في قسم {{department}}.

المادة الثانية: مدة العقد
هذا عقد عمل دائم يبدأ من تاريخ {{start_date}}.

المادة الثالثة: الراتب والمزايا
- الراتب الأساسي: {{basic_salary}} ريال شهرياً
- بدل السكن: {{housing_allowance}} ريال
- بدل المواصلات: {{transportation_allowance}} ريال
- الراتب الإجمالي: {{total_salary}} ريال

المادة الرابعة: ساعات العمل
يعمل الموظف {{working_hours}} ساعة أسبوعياً، موزعة على {{working_days}} أيام.

المادة الخامسة: الإجازات
- إجازة سنوية: {{annual_leave}} يوم مدفوع الأجر
- إجازة مرضية: وفقاً لنظام العمل السعودي

المادة السادسة: إنهاء العقد
يحق لأي من الطرفين إنهاء هذا العقد بإشعار كتابي مدته {{notice_period}} يوم.

حرر هذا العقد من نسختين، لكل طرف نسخة للعمل بموجبها.

التوقيع:
الطرف الأول: _____________  التاريخ: _____________
الطرف الثاني: _____________  التاريخ: _____________`,
    },
    {
      id: 7,
      title: "عقد تدريب",
      description: "عقد تدريب للخريجين والمتدربين",
      category: "عقود",
      usageCount: 156,
      isFavorite: false,
      content: `عقد تدريب

بين كل من:
الطرف الأول: {{company_name}} (الجهة المدربة)
الطرف الثاني: {{trainee_name}} (المتدرب)

تم الاتفاق على ما يلي:

المادة الأولى: مجال التدريب
يتدرب الطرف الثاني في مجال {{training_field}} لدى الطرف الأول.

المادة الثانية: مدة التدريب
تبدأ فترة التدريب من {{start_date}} وتنتهي في {{end_date}}.

المادة الثالثة: المكافأة
يحصل المتدرب على مكافأة شهرية قدرها {{stipend}} ريال.

المادة الرابعة: ساعات التدريب
{{training_hours}} ساعة أسبوعياً.

المادة الخامسة: الالتزامات
يلتزم المتدرب بالحضور المنتظم والالتزام بسياسات الشركة.

التوقيع:
الطرف الأول: _____________  التاريخ: _____________
الطرف الثاني: _____________  التاريخ: _____________`,
    },
    {
      id: 8,
      title: "عقد عمل مؤقت",
      description: "عقد عمل لفترة محددة",
      category: "عقود",
      usageCount: 178,
      isFavorite: true,
      content: `عقد عمل مؤقت

بين كل من:
الطرف الأول: {{company_name}} (صاحب العمل)
الطرف الثاني: {{employee_name}} (الموظف)

تم الاتفاق على ما يلي:

المادة الأولى: طبيعة العمل
يعمل الطرف الثاني بوظيفة {{job_title}} لمدة محددة.

المادة الثانية: مدة العقد
يبدأ العقد من {{start_date}} وينتهي في {{end_date}}.

المادة الثالثة: الراتب
الراتب الشهري: {{salary}} ريال.

المادة الرابعة: إنهاء العقد
ينتهي العقد تلقائياً بانتهاء المدة المحددة.

التوقيع:
الطرف الأول: _____________  التاريخ: _____________
الطرف الثاني: _____________  التاريخ: _____________`,
    },
  ];

  // قوالب النماذج
  const formTemplates = [
    {
      id: 9,
      title: "طلب إجازة",
      description: "نموذج طلب إجازة للموظفين",
      category: "نماذج",
      usageCount: 456,
      isFavorite: true,
      content: `نموذج طلب إجازة

بيانات الموظف:
الاسم: {{employee_name}}
الرقم الوظيفي: {{employee_id}}
القسم: {{department}}
المسمى الوظيفي: {{job_title}}

تفاصيل الإجازة:
نوع الإجازة: {{leave_type}}
من تاريخ: {{start_date}}
إلى تاريخ: {{end_date}}
عدد الأيام: {{days_count}}

السبب:
{{reason}}

عنوان الاتصال أثناء الإجازة:
{{contact_address}}
رقم الجوال: {{phone_number}}

توقيع الموظف: _____________  التاريخ: _____________

الموافقات:
المدير المباشر: _____________  التاريخ: _____________
الموارد البشرية: _____________  التاريخ: _____________`,
    },
    {
      id: 10,
      title: "تقييم أداء",
      description: "نموذج تقييم أداء الموظف",
      category: "نماذج",
      usageCount: 234,
      isFavorite: true,
      content: `نموذج تقييم الأداء

بيانات الموظف:
الاسم: {{employee_name}}
الرقم الوظيفي: {{employee_id}}
القسم: {{department}}
المسمى الوظيفي: {{job_title}}
فترة التقييم: من {{period_start}} إلى {{period_end}}

معايير التقييم:
(1 = ضعيف، 2 = مقبول، 3 = جيد، 4 = جيد جداً، 5 = ممتاز)

1. جودة العمل: [ ]
2. الإنتاجية: [ ]
3. الالتزام بالمواعيد: [ ]
4. التعاون مع الفريق: [ ]
5. المبادرة والإبداع: [ ]
6. مهارات التواصل: [ ]
7. حل المشكلات: [ ]
8. الالتزام بالسياسات: [ ]

نقاط القوة:
{{strengths}}

نقاط التحسين:
{{improvement_areas}}

التوصيات:
{{recommendations}}

توقيع المقيّم: _____________  التاريخ: _____________
توقيع الموظف: _____________  التاريخ: _____________`,
    },
    {
      id: 11,
      title: "طلب شهادة",
      description: "نموذج طلب شهادة راتب أو خبرة",
      category: "نماذج",
      usageCount: 345,
      isFavorite: false,
      content: `نموذج طلب شهادة

بيانات الموظف:
الاسم: {{employee_name}}
الرقم الوظيفي: {{employee_id}}
القسم: {{department}}
المسمى الوظيفي: {{job_title}}

نوع الشهادة المطلوبة:
[ ] شهادة راتب
[ ] شهادة خبرة
[ ] شهادة تعريف بالراتب
[ ] شهادة للسفارة

الغرض من الشهادة:
{{purpose}}

الجهة المطلوب تقديم الشهادة لها:
{{recipient}}

ملاحظات إضافية:
{{notes}}

توقيع الموظف: _____________  التاريخ: _____________

الموافقة:
الموارد البشرية: _____________  التاريخ: _____________`,
    },
  ];

  const allTemplates = [
    ...emailTemplates,
    ...contractTemplates,
    ...formTemplates,
  ];

  const filteredTemplates = (templates: any[]) => {
    return templates.filter(
      template =>
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("تم النسخ إلى الحافظة");
  };

  const handleDownload = (template: any) => {
    const blob = new Blob([template.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.title}.txt`;
    a.click();
    toast.success("تم تحميل القالب");
  };

  const handleEdit = (template: any) => {
    setSelectedTemplate(template);
    setEditorTitle(template.title);
    setEditorContent(template.content);
    setIsEditorOpen(true);
  };

  const handleSave = () => {
    toast.success("تم حفظ القالب المخصص");
    setIsEditorOpen(false);
  };

  const mostUsedTemplates = [...allTemplates]
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">مكتبة القوالب</h1>
          <p className="text-muted-foreground">
            قوالب جاهزة للرسائل والعقود والنماذج
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90">
          <Plus className="h-4 w-4 ml-2" />
          قالب جديد
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي القوالب</p>
                <p className="text-2xl font-bold">{allTemplates.length}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">القوالب المفضلة</p>
                <p className="text-2xl font-bold">
                  {allTemplates.filter(t => t.isFavorite).length}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الاستخدامات</p>
                <p className="text-2xl font-bold">
                  {allTemplates.reduce((sum, t) => sum + t.usageCount, 0)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">قوالب مخصصة</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Edit className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Most Used Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            القوالب الأكثر استخداماً
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {mostUsedTemplates.map(template => (
              <Card
                key={template.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{template.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                    {template.isFavorite && (
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary">{template.category}</Badge>
                    <span>•</span>
                    <span>{template.usageCount} استخدام</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="ابحث في القوالب..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pr-10"
        />
      </div>

      {/* Templates Tabs */}
      <Tabs defaultValue="emails" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="emails" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            الرسائل ({emailTemplates.length})
          </TabsTrigger>
          <TabsTrigger value="contracts" className="flex items-center gap-2">
            <FileSignature className="h-4 w-4" />
            العقود ({contractTemplates.length})
          </TabsTrigger>
          <TabsTrigger value="forms" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            النماذج ({formTemplates.length})
          </TabsTrigger>
        </TabsList>

        {/* Email Templates */}
        <TabsContent value="emails" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {filteredTemplates(emailTemplates).map(template => (
              <Card
                key={template.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {template.title}
                        {template.isFavorite && (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        )}
                      </CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{template.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {template.usageCount} استخدام
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedTemplate(template);
                      }}
                    >
                      <Eye className="h-4 w-4 ml-2" />
                      معاينة
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(template.content)}
                    >
                      <Copy className="h-4 w-4 ml-2" />
                      نسخ
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(template)}
                    >
                      <Edit className="h-4 w-4 ml-2" />
                      تعديل
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(template)}
                    >
                      <Download className="h-4 w-4 ml-2" />
                      تحميل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contract Templates */}
        <TabsContent value="contracts" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {filteredTemplates(contractTemplates).map(template => (
              <Card
                key={template.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {template.title}
                        {template.isFavorite && (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        )}
                      </CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{template.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {template.usageCount} استخدام
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedTemplate(template);
                      }}
                    >
                      <Eye className="h-4 w-4 ml-2" />
                      معاينة
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(template.content)}
                    >
                      <Copy className="h-4 w-4 ml-2" />
                      نسخ
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(template)}
                    >
                      <Edit className="h-4 w-4 ml-2" />
                      تعديل
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(template)}
                    >
                      <Download className="h-4 w-4 ml-2" />
                      تحميل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Form Templates */}
        <TabsContent value="forms" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {filteredTemplates(formTemplates).map(template => (
              <Card
                key={template.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {template.title}
                        {template.isFavorite && (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        )}
                      </CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{template.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {template.usageCount} استخدام
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedTemplate(template);
                      }}
                    >
                      <Eye className="h-4 w-4 ml-2" />
                      معاينة
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(template.content)}
                    >
                      <Copy className="h-4 w-4 ml-2" />
                      نسخ
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(template)}
                    >
                      <Edit className="h-4 w-4 ml-2" />
                      تعديل
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(template)}
                    >
                      <Download className="h-4 w-4 ml-2" />
                      تحميل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      {selectedTemplate && !isEditorOpen && (
        <Dialog
          open={!!selectedTemplate}
          onOpenChange={() => setSelectedTemplate(null)}
        >
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedTemplate.title}
                {selectedTemplate.isFavorite && (
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                )}
              </DialogTitle>
              <DialogDescription>
                {selectedTemplate.description}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge>{selectedTemplate.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  {selectedTemplate.usageCount} استخدام
                </span>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {selectedTemplate.content}
                </pre>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleCopy(selectedTemplate.content)}>
                  <Copy className="h-4 w-4 ml-2" />
                  نسخ
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleEdit(selectedTemplate)}
                >
                  <Edit className="h-4 w-4 ml-2" />
                  تعديل
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDownload(selectedTemplate)}
                >
                  <Download className="h-4 w-4 ml-2" />
                  تحميل
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Editor Dialog */}
      {isEditorOpen && (
        <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>تعديل القالب</DialogTitle>
              <DialogDescription>
                قم بتعديل القالب وحفظه كقالب مخصص
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>عنوان القالب</Label>
                <Input
                  value={editorTitle}
                  onChange={e => setEditorTitle(e.target.value)}
                  placeholder="عنوان القالب"
                />
              </div>
              <div>
                <Label>محتوى القالب</Label>
                <Textarea
                  value={editorContent}
                  onChange={e => setEditorContent(e.target.value)}
                  placeholder="محتوى القالب"
                  className="min-h-[400px] font-mono text-sm"
                />
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                  💡 استخدم المتغيرات الديناميكية:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{"{{name}}"}</Badge>
                  <Badge variant="secondary">{"{{date}}"}</Badge>
                  <Badge variant="secondary">{"{{company_name}}"}</Badge>
                  <Badge variant="secondary">{"{{employee_name}}"}</Badge>
                  <Badge variant="secondary">{"{{salary}}"}</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="h-4 w-4 ml-2" />
                  حفظ كقالب مخصص
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditorOpen(false)}
                >
                  <X className="h-4 w-4 ml-2" />
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
