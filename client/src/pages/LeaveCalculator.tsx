import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar as CalendarIcon,
  Download,
  Plus,
  Trash2,
  Info,
  TrendingUp,
  Clock,
  Sparkles,
  Bot,
  PieChart,
  BarChart3,
  FileText,
} from 'lucide-react';
import { Link } from 'wouter';
import { toast } from 'sonner';

// Types
interface LeaveEntry {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'approved' | 'pending' | 'rejected';
  notes?: string;
}

interface LeaveBalance {
  annual: { total: number; used: number; remaining: number };
  sick: { total: number; used: number; remaining: number };
  maternity: { total: number; used: number; remaining: number };
  hajj: { total: number; used: number; remaining: number };
  marriage: { total: number; used: number; remaining: number };
  bereavement: { total: number; used: number; remaining: number };
}

export default function LeaveCalculator() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Form State
  const [employeeYears, setEmployeeYears] = useState<string>('');
  const [leaveType, setLeaveType] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [leaveEntries, setLeaveEntries] = useState<LeaveEntry[]>([]);
  
  // AI State
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');

  // Calculate leave balance
  const calculateBalance = (): LeaveBalance => {
    const years = parseFloat(employeeYears) || 0;
    
    // Annual leave: 21 days (1-4 years), 30 days (5+ years)
    const annualTotal = years >= 5 ? 30 : 21;
    const annualUsed = leaveEntries
      .filter(e => e.type === 'annual' && e.status === 'approved')
      .reduce((sum, e) => sum + e.days, 0);
    
    // Sick leave: 120 days total (30 full + 60 at 75% + 30 unpaid)
    const sickTotal = 120;
    const sickUsed = leaveEntries
      .filter(e => e.type === 'sick' && e.status === 'approved')
      .reduce((sum, e) => sum + e.days, 0);
    
    // Maternity: 70 days (10 weeks)
    const maternityTotal = 70;
    const maternityUsed = leaveEntries
      .filter(e => e.type === 'maternity' && e.status === 'approved')
      .reduce((sum, e) => sum + e.days, 0);
    
    // Hajj: 10 days (once in service)
    const hajjTotal = 10;
    const hajjUsed = leaveEntries
      .filter(e => e.type === 'hajj' && e.status === 'approved')
      .reduce((sum, e) => sum + e.days, 0);
    
    // Marriage: 5 days (once in service)
    const marriageTotal = 5;
    const marriageUsed = leaveEntries
      .filter(e => e.type === 'marriage' && e.status === 'approved')
      .reduce((sum, e) => sum + e.days, 0);
    
    // Bereavement: 5 days
    const bereavementTotal = 5;
    const bereavementUsed = leaveEntries
      .filter(e => e.type === 'bereavement' && e.status === 'approved')
      .reduce((sum, e) => sum + e.days, 0);

    return {
      annual: { total: annualTotal, used: annualUsed, remaining: annualTotal - annualUsed },
      sick: { total: sickTotal, used: sickUsed, remaining: sickTotal - sickUsed },
      maternity: { total: maternityTotal, used: maternityUsed, remaining: maternityTotal - maternityUsed },
      hajj: { total: hajjTotal, used: hajjUsed, remaining: hajjTotal - hajjUsed },
      marriage: { total: marriageTotal, used: marriageUsed, remaining: marriageTotal - marriageUsed },
      bereavement: { total: bereavementTotal, used: bereavementUsed, remaining: bereavementTotal - bereavementUsed },
    };
  };

  const balance = calculateBalance();

  const calculateDays = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const startD = new Date(start);
    const endD = new Date(end);
    const diffTime = Math.abs(endD.getTime() - startD.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleAddLeave = () => {
    if (!leaveType || !startDate || !endDate) {
      toast.error('يرجى ملء جميع الحقول');
      return;
    }

    const days = calculateDays(startDate, endDate);
    
    const newEntry: LeaveEntry = {
      id: Date.now().toString(),
      type: leaveType,
      startDate,
      endDate,
      days,
      status: 'approved',
    };

    setLeaveEntries([...leaveEntries, newEntry]);
    toast.success('تم إضافة الإجازة بنجاح');
    
    // Reset form
    setLeaveType('');
    setStartDate('');
    setEndDate('');
  };

  const handleDeleteLeave = (id: string) => {
    setLeaveEntries(leaveEntries.filter(e => e.id !== id));
    toast.success('تم حذف الإجازة');
  };

  const handleAskAI = () => {
    if (!aiQuestion.trim()) return;
    
    toast.info('جاري الحصول على الإجابة...');
    setTimeout(() => {
      setAiResponse('مثال على إجابة الذكاء الاصطناعي حول الإجازات. سيتم ربطها بالنظام الفعلي قريباً.');
      toast.success('تم الحصول على الإجابة');
    }, 1000);
  };

  const getLeaveTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      'annual': 'إجازة سنوية',
      'sick': 'إجازة مرضية',
      'maternity': 'إجازة أمومة',
      'hajj': 'إجازة حج',
      'marriage': 'إجازة زواج',
      'bereavement': 'إجازة وفاة',
      'exam': 'إجازة امتحانات',
    };
    return labels[type] || type;
  };

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      'approved': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'rejected': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    };
    return colors[status] || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2">
              <img src="/rabit-logo.svg" alt="Rabit" className="h-8" />
            </a>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">
              <a>العودة للرئيسية</a>
            </Link>
          </Button>
        </div>
      </header>

      <div className="container py-8 md:py-12">
        {/* Page Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full gradient-primary mb-4">
            <CalendarIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            حاسبة الإجازات
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            احسب وتتبع جميع أنواع الإجازات - مدعومة بالذكاء الاصطناعي
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Form & AI */}
          <div className="lg:col-span-2 space-y-6">
            {/* Employee Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  معلومات الموظف
                </CardTitle>
                <CardDescription>
                  أدخل معلومات الموظف لحساب الإجازات المستحقة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employee-years">عدد سنوات الخدمة *</Label>
                  <Input
                    id="employee-years"
                    type="number"
                    placeholder="مثال: 3"
                    value={employeeYears}
                    onChange={(e) => setEmployeeYears(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    يؤثر على عدد أيام الإجازة السنوية المستحقة
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Add Leave */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  إضافة إجازة
                </CardTitle>
                <CardDescription>
                  أضف إجازة جديدة لحساب الرصيد المتبقي
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="leave-type">نوع الإجازة *</Label>
                  <Select value={leaveType} onValueChange={setLeaveType}>
                    <SelectTrigger id="leave-type">
                      <SelectValue placeholder="اختر نوع الإجازة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">إجازة سنوية (21-30 يوم)</SelectItem>
                      <SelectItem value="sick">إجازة مرضية (120 يوم)</SelectItem>
                      <SelectItem value="maternity">إجازة أمومة (70 يوم)</SelectItem>
                      <SelectItem value="hajj">إجازة حج (10 أيام)</SelectItem>
                      <SelectItem value="marriage">إجازة زواج (5 أيام)</SelectItem>
                      <SelectItem value="bereavement">إجازة وفاة (3-5 أيام)</SelectItem>
                      <SelectItem value="exam">إجازة امتحانات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">تاريخ البداية *</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">تاريخ النهاية *</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                {startDate && endDate && (
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium mb-1">عدد الأيام:</p>
                    <p className="text-2xl font-bold gradient-text">
                      {calculateDays(startDate, endDate)} يوم
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleAddLeave}
                  className="w-full gradient-primary"
                  disabled={!leaveType || !startDate || !endDate}
                >
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة الإجازة
                </Button>
              </CardContent>
            </Card>

            {/* Leave History */}
            {leaveEntries.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    سجل الإجازات
                  </CardTitle>
                  <CardDescription>
                    جميع الإجازات المسجلة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaveEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{getLeaveTypeLabel(entry.type)}</span>
                            <Badge className={getStatusColor(entry.status)}>
                              {entry.status === 'approved' ? 'معتمدة' : entry.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(entry.startDate).toLocaleDateString('ar-SA')} - {new Date(entry.endDate).toLocaleDateString('ar-SA')}
                            {' '}({entry.days} يوم)
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteLeave(entry.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Assistant */}
            <Card className="shadow-lg border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-purple-600" />
                  المساعد الذكي للإجازات
                </CardTitle>
                <CardDescription>
                  اسأل أي سؤال عن أنواع الإجازات وحقوقك
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="مثال: كم يوم إجازة سنوية أستحق بعد 3 سنوات خدمة؟"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    rows={3}
                  />
                  <Button
                    onClick={handleAskAI}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={!aiQuestion.trim()}
                  >
                    <Sparkles className="h-4 w-4 ml-2" />
                    اسأل الذكاء الاصطناعي
                  </Button>
                </div>
                
                {aiResponse && (
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <p className="text-sm">{aiResponse}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Balance & Stats */}
          <div className="space-y-6">
            {/* Balance Overview */}
            <Card className="shadow-lg border-primary/20 sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  رصيد الإجازات
                </CardTitle>
                <CardDescription>
                  الرصيد المتبقي لكل نوع إجازة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Annual Leave */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">إجازة سنوية</span>
                    <span className="text-muted-foreground">
                      {balance.annual.remaining} / {balance.annual.total} يوم
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                      style={{ width: `${(balance.annual.remaining / balance.annual.total) * 100}%` }}
                    />
                  </div>
                </div>

                <Separator />

                {/* Sick Leave */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">إجازة مرضية</span>
                    <span className="text-muted-foreground">
                      {balance.sick.remaining} / {balance.sick.total} يوم
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600"
                      style={{ width: `${(balance.sick.remaining / balance.sick.total) * 100}%` }}
                    />
                  </div>
                </div>

                <Separator />

                {/* Other Leaves */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">إجازة أمومة</span>
                    <Badge variant="secondary">{balance.maternity.remaining} يوم</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">إجازة حج</span>
                    <Badge variant="secondary">{balance.hajj.remaining} يوم</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">إجازة زواج</span>
                    <Badge variant="secondary">{balance.marriage.remaining} يوم</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">إجازة وفاة</span>
                    <Badge variant="secondary">{balance.bereavement.remaining} يوم</Badge>
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 ml-2" />
                    تصدير التقرير
                  </Button>
                  <Button variant="outline" className="w-full">
                    <BarChart3 className="h-4 w-4 ml-2" />
                    عرض الإحصائيات
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="shadow-lg bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900 dark:text-blue-100">
                    <p className="font-medium mb-2">معلومات مهمة</p>
                    <ul className="space-y-1 text-xs opacity-90">
                      <li>• الإجازة السنوية: 21 يوم (1-4 سنوات)، 30 يوم (5+ سنوات)</li>
                      <li>• الإجازة المرضية: 30 يوم بأجر كامل + 60 يوم بـ75% + 30 يوم بدون أجر</li>
                      <li>• إجازة الأمومة: 10 أسابيع بأجر كامل</li>
                      <li>• إجازة الحج: مرة واحدة طوال الخدمة</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
