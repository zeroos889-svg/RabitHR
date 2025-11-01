import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Plus,
  Upload,
  Calendar,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Search,
  Filter,
  Bot,
  Download,
  Edit,
  Trash2,
  Send,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export default function Reminders() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [aiQuery, setAiQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // بيانات تجريبية للتذكيرات
  const reminders = [
    {
      id: 1,
      type: "contract",
      title: "تجديد عقد أحمد محمد",
      description: "ينتهي عقد الموظف أحمد محمد في 15 ديسمبر 2024",
      date: "2024-12-15",
      daysLeft: 45,
      priority: "high",
      status: "pending",
      employee: "أحمد محمد",
    },
    {
      id: 2,
      type: "visa",
      title: "انتهاء تأشيرة سارة أحمد",
      description: "تنتهي تأشيرة الموظفة سارة أحمد في 20 نوفمبر 2024",
      date: "2024-11-20",
      daysLeft: 20,
      priority: "urgent",
      status: "pending",
      employee: "سارة أحمد",
    },
    {
      id: 3,
      type: "insurance",
      title: "تجديد التأمين الطبي",
      description: "ينتهي التأمين الطبي للموظفين في 31 ديسمبر 2024",
      date: "2024-12-31",
      daysLeft: 61,
      priority: "medium",
      status: "pending",
      employee: "جميع الموظفين",
    },
    {
      id: 4,
      type: "birthday",
      title: "عيد ميلاد خالد علي",
      description: "عيد ميلاد الموظف خالد علي",
      date: "2024-11-10",
      daysLeft: 10,
      priority: "low",
      status: "pending",
      employee: "خالد علي",
    },
    {
      id: 5,
      type: "meeting",
      title: "اجتماع تقييم الأداء السنوي",
      description: "اجتماع تقييم الأداء السنوي لجميع الموظفين",
      date: "2024-11-25",
      daysLeft: 25,
      priority: "high",
      status: "pending",
      employee: "-",
    },
  ];

  const stats = {
    total: reminders.length,
    urgent: reminders.filter((r) => r.priority === "urgent").length,
    thisWeek: reminders.filter((r) => r.daysLeft <= 7).length,
    thisMonth: reminders.filter((r) => r.daysLeft <= 30).length,
  };

  const getReminderTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      contract: "تجديد عقد",
      visa: "تأشيرة",
      insurance: "تأمين طبي",
      birthday: "عيد ميلاد",
      meeting: "موعد مهم",
      custom: "مخصص",
    };
    return types[type] || type;
  };

  const getReminderTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      contract: "bg-blue-500",
      visa: "bg-purple-500",
      insurance: "bg-green-500",
      birthday: "bg-pink-500",
      meeting: "bg-orange-500",
      custom: "bg-gray-500",
    };
    return colors[type] || "bg-gray-500";
  };

  const getPriorityBadge = (priority: string) => {
    const badges: Record<string, { variant: any; label: string }> = {
      urgent: { variant: "destructive", label: "عاجل" },
      high: { variant: "default", label: "عالية" },
      medium: { variant: "secondary", label: "متوسطة" },
      low: { variant: "outline", label: "منخفضة" },
    };
    return badges[priority] || badges.medium;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleExtractFromFile = () => {
    if (!selectedFile) {
      toast.error("الرجاء اختيار ملف");
      return;
    }
    
    toast.success("جاري استخراج المواعيد بالذكاء الاصطناعي...");
    
    // محاكاة استخراج البيانات
    setTimeout(() => {
      toast.success("تم استخراج 12 تذكير من الملف بنجاح!");
      setIsUploadDialogOpen(false);
      setSelectedFile(null);
    }, 2000);
  };

  const handleAIQuery = () => {
    if (!aiQuery.trim()) {
      toast.error("الرجاء كتابة سؤالك");
      return;
    }

    toast.success("جاري البحث...");
    
    // محاكاة الإجابة
    setTimeout(() => {
      toast.success("تم العثور على الإجابة!");
    }, 1500);
  };

  const filteredReminders = reminders.filter((reminder) =>
    reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reminder.employee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">التنبيهات والتذكيرات</h1>
          <p className="text-muted-foreground">لا تفوت أي موعد مهم</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsAIAssistantOpen(true)}
            className="bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-purple-200"
          >
            <Bot className="h-4 w-4 ml-2" />
            مساعد AI
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsUploadDialogOpen(true)}
          >
            <Upload className="h-4 w-4 ml-2" />
            رفع ملف
          </Button>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
          >
            <Plus className="h-4 w-4 ml-2" />
            تذكير جديد
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي التذكيرات</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">عاجل</p>
                <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">هذا الأسبوع</p>
                <p className="text-2xl font-bold text-orange-600">{stats.thisWeek}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">هذا الشهر</p>
                <p className="text-2xl font-bold text-green-600">{stats.thisMonth}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث في التذكيرات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 ml-2" />
          فلترة
        </Button>
      </div>

      {/* Reminders Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">الكل ({reminders.length})</TabsTrigger>
          <TabsTrigger value="urgent">عاجل ({stats.urgent})</TabsTrigger>
          <TabsTrigger value="week">هذا الأسبوع ({stats.thisWeek})</TabsTrigger>
          <TabsTrigger value="month">هذا الشهر ({stats.thisMonth})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredReminders.map((reminder) => (
            <Card key={reminder.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div
                      className={`h-12 w-12 rounded-lg ${getReminderTypeColor(
                        reminder.type
                      )} flex items-center justify-center shrink-0`}
                    >
                      <Bell className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{reminder.title}</h3>
                        <Badge variant={getPriorityBadge(reminder.priority).variant}>
                          {getPriorityBadge(reminder.priority).label}
                        </Badge>
                        <Badge variant="outline">
                          {getReminderTypeLabel(reminder.type)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {reminder.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {reminder.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          متبقي {reminder.daysLeft} يوم
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {reminder.employee}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="urgent">
          {/* نفس البطاقات مع فلترة العاجل */}
        </TabsContent>

        <TabsContent value="week">
          {/* نفس البطاقات مع فلترة الأسبوع */}
        </TabsContent>

        <TabsContent value="month">
          {/* نفس البطاقات مع فلترة الشهر */}
        </TabsContent>
      </Tabs>

      {/* Add Reminder Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>إضافة تذكير جديد</DialogTitle>
            <DialogDescription>
              أضف تذكير لموعد مهم
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>نوع التذكير</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contract">تجديد عقد</SelectItem>
                    <SelectItem value="visa">تأشيرة</SelectItem>
                    <SelectItem value="insurance">تأمين طبي</SelectItem>
                    <SelectItem value="birthday">عيد ميلاد</SelectItem>
                    <SelectItem value="meeting">موعد مهم</SelectItem>
                    <SelectItem value="custom">مخصص</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>الأولوية</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الأولوية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">عاجل</SelectItem>
                    <SelectItem value="high">عالية</SelectItem>
                    <SelectItem value="medium">متوسطة</SelectItem>
                    <SelectItem value="low">منخفضة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>العنوان</Label>
              <Input placeholder="عنوان التذكير" />
            </div>
            <div>
              <Label>الوصف</Label>
              <Textarea placeholder="وصف التذكير" rows={3} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>التاريخ</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>الموظف</Label>
                <Input placeholder="اسم الموظف" />
              </div>
            </div>
            <div>
              <Label>التذكير قبل</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm">
                  30 يوم
                </Button>
                <Button variant="outline" size="sm">
                  15 يوم
                </Button>
                <Button variant="outline" size="sm">
                  7 أيام
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => {
                  toast.success("تم إضافة التذكير بنجاح");
                  setIsAddDialogOpen(false);
                }}
              >
                إضافة
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload File Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              رفع ملف واستخراج المواعيد بالذكاء الاصطناعي
            </DialogTitle>
            <DialogDescription>
              ارفع ملف Excel أو CSV أو PDF يحتوي على بيانات الموظفين والمواعيد
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">
                اسحب الملف هنا أو انقر للتحميل
              </p>
              <Input
                type="file"
                accept=".xlsx,.xls,.csv,.pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="max-w-xs mx-auto"
              />
              {selectedFile && (
                <p className="text-sm text-green-600 mt-4">
                  تم اختيار: {selectedFile.name}
                </p>
              )}
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                💡 الأنواع المدعومة:
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Excel (.xlsx, .xls)</Badge>
                <Badge variant="secondary">CSV</Badge>
                <Badge variant="secondary">PDF</Badge>
                <Badge variant="secondary">صور (OCR)</Badge>
              </div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
                🤖 سيقوم الذكاء الاصطناعي بـ:
              </p>
              <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                <li>• استخراج أسماء الموظفين</li>
                <li>• تحديد تواريخ انتهاء العقود</li>
                <li>• تحديد تواريخ انتهاء التأشيرات</li>
                <li>• استخراج أعياد الميلاد</li>
                <li>• إنشاء تذكيرات تلقائية</li>
              </ul>
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
                onClick={handleExtractFromFile}
                disabled={!selectedFile}
              >
                <Sparkles className="h-4 w-4 ml-2" />
                استخراج بالذكاء الاصطناعي
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsUploadDialogOpen(false);
                  setSelectedFile(null);
                }}
              >
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Assistant Dialog */}
      <Dialog open={isAIAssistantOpen} onOpenChange={setIsAIAssistantOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-purple-600" />
              مساعد AI للتذكيرات
            </DialogTitle>
            <DialogDescription>
              اسأل أي سؤال عن المواعيد والتذكيرات
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>اسأل المساعد</Label>
              <Textarea
                placeholder="مثال: متى ينتهي عقد أحمد؟ أو كم موظف عقده ينتهي هذا الشهر؟"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                rows={3}
              />
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg">
              <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
                💡 أمثلة على الأسئلة:
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setAiQuery("متى ينتهي عقد أحمد محمد؟")}
                >
                  متى ينتهي عقد أحمد محمد؟
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setAiQuery("كم موظف عقده ينتهي هذا الشهر؟")}
                >
                  كم موظف عقده ينتهي هذا الشهر؟
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setAiQuery("أي تأشيرات تنتهي قريباً؟")}
                >
                  أي تأشيرات تنتهي قريباً؟
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
                onClick={handleAIQuery}
              >
                <Sparkles className="h-4 w-4 ml-2" />
                اسأل
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAIAssistantOpen(false);
                  setAiQuery("");
                }}
              >
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
