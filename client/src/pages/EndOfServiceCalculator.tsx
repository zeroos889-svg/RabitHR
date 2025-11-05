import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Calculator,
  Download,
  Share2,
  Save,
  Info,
  TrendingUp,
  Calendar,
  DollarSign,
  FileText,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Upload,
  Bot,
  FileCheck,
} from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// Types
interface CalculationResult {
  totalAmount: number;
  firstFiveYears: number;
  afterFiveYears: number;
  percentage: number;
  yearsCount: number;
  monthsCount: number;
  daysCount: number;
  breakdown: {
    years: number;
    months: number;
    days: number;
  };
  aiInsights?: string;
}

export default function EndOfServiceCalculator() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Form State
  const [salary, setSalary] = useState<string>("");
  const [contractType, setContractType] = useState<string>("");
  const [terminationReason, setTerminationReason] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // AI Features
  const [aiQuestion, setAiQuestion] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [verificationResult, setVerificationResult] = useState<string>("");

  // Result State
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Calculate service duration from dates
  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return { years: 0, months: 0, days: 0 };

    const startD = new Date(start);
    const endD = new Date(end);

    let years = endD.getFullYear() - startD.getFullYear();
    let months = endD.getMonth() - startD.getMonth();
    let days = endD.getDate() - startD.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(endD.getFullYear(), endD.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  // Calculate in real-time
  useEffect(() => {
    if (salary && contractType && terminationReason && startDate && endDate) {
      calculateEOSB();
    }
  }, [salary, contractType, terminationReason, startDate, endDate]);

  const calculateEOSB = async () => {
    const salaryNum = parseFloat(salary) || 0;

    if (salaryNum <= 0 || !startDate || !endDate) return;

    const duration = calculateDuration(startDate, endDate);
    const { years: yearsNum, months: monthsNum, days: daysNum } = duration;

    // Convert everything to years
    const totalYears = yearsNum + monthsNum / 12 + daysNum / 365;

    // Calculate first 5 years
    const firstFiveYearsCount = Math.min(totalYears, 5);
    const firstFiveYearsAmount = (salaryNum / 2) * firstFiveYearsCount;

    // Calculate after 5 years
    const afterFiveYearsCount = Math.max(0, totalYears - 5);
    const afterFiveYearsAmount = salaryNum * afterFiveYearsCount;

    // Total before percentage
    const totalBeforePercentage = firstFiveYearsAmount + afterFiveYearsAmount;

    // Determine percentage based on contract type and termination reason
    let percentage = 100;

    if (contractType === "unlimited" && terminationReason === "resignation") {
      if (totalYears < 2) {
        percentage = 0;
      } else if (totalYears < 5) {
        percentage = 33.33;
      } else if (totalYears < 10) {
        percentage = 66.66;
      } else {
        percentage = 100;
      }
    } else if (
      contractType === "limited" &&
      terminationReason === "resignation_before_end"
    ) {
      if (totalYears < 2) {
        percentage = 0;
      } else if (totalYears < 5) {
        percentage = 33.33;
      } else if (totalYears < 10) {
        percentage = 66.66;
      } else {
        percentage = 100;
      }
    } else if (terminationReason === "disciplinary_severe") {
      percentage = 0;
    }

    const finalAmount = (totalBeforePercentage * percentage) / 100;

    // Get AI insights
    let aiInsights = "";
    try {
      // This would call the AI to provide insights
      aiInsights = `بناءً على الحساب، الموظف يستحق ${percentage}% من المكافأة الكاملة حسب المادة 84 من نظام العمل السعودي.`;
    } catch (error) {
      console.error("AI insights error:", error);
    }

    setResult({
      totalAmount: Math.round(finalAmount),
      firstFiveYears: Math.round(firstFiveYearsAmount),
      afterFiveYears: Math.round(afterFiveYearsAmount),
      percentage,
      yearsCount: yearsNum,
      monthsCount: monthsNum,
      daysCount: daysNum,
      breakdown: {
        years: yearsNum,
        months: monthsNum,
        days: daysNum,
      },
      aiInsights,
    });

    setShowResult(true);
  };

  const generatePDFMutation = trpc.eosb.generatePDF.useMutation();

  const handleExportPDF = async () => {
    if (!result || !salary || !startDate || !endDate) {
      toast.error("يجب إجراء الحساب أولاً");
      return;
    }

    try {
      toast.info("جاري إنشاء ملف PDF...");

      const response = await generatePDFMutation.mutateAsync({
        salary: parseFloat(salary),
        startDate,
        endDate,
        contractType,
        terminationReason,
        result: {
          totalAmount: result.totalAmount,
          firstFiveYears: result.firstFiveYears,
          afterFiveYears: result.afterFiveYears,
          percentage: result.percentage,
          yearsCount: result.yearsCount,
          monthsCount: result.monthsCount,
          daysCount: result.daysCount,
        },
      });

      // Create blob and download
      const blob = new Blob([response.pdfContent], { type: "text/html" });
      const url = window.URL.createObjectURL(blob);

      // Open in new window for printing
      const printWindow = window.open(url, "_blank");
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
        };
      }

      toast.success("تم إنشاء التقرير بنجاح");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("حدث خطأ في إنشاء التقرير");
    }
  };

  const handleReset = () => {
    setSalary("");
    setContractType("");
    setTerminationReason("");
    setStartDate("");
    setEndDate("");
    setResult(null);
    setShowResult(false);
    setAiQuestion("");
    setAiResponse("");
    setUploadedFile(null);
    setVerificationResult("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast.success("تم رفع الملف بنجاح");
      // Here you would process the file with AI
      setTimeout(() => {
        setVerificationResult(
          "جاري التحقق من الملف باستخدام الذكاء الاصطناعي..."
        );
      }, 500);
    }
  };

  const handleAskAI = async () => {
    if (!aiQuestion.trim()) return;

    toast.info("جاري الحصول على الإجابة...");
    // Here you would call the AI API
    setTimeout(() => {
      setAiResponse(
        "هذا مثال على إجابة الذكاء الاصطناعي. سيتم ربطها بالنظام الفعلي قريباً."
      );
      toast.success("تم الحصول على الإجابة");
    }, 1000);
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString("ar-SA")} ﷼`;
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
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            حاسبة نهاية الخدمة
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            احسب مكافأة نهاية الخدمة بدقة وفقاً للمادة 84 - مدعومة بالذكاء
            الاصطناعي
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Calculator Form */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  بيانات الحساب
                </CardTitle>
                <CardDescription>
                  أدخل البيانات المطلوبة لحساب مكافأة نهاية الخدمة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Salary */}
                <div className="space-y-2">
                  <Label htmlFor="salary" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    الراتب الأساسي الأخير *
                  </Label>
                  <div className="relative">
                    <Input
                      id="salary"
                      type="number"
                      placeholder="مثال: 10000"
                      value={salary}
                      onChange={e => setSalary(e.target.value)}
                      className="text-lg pr-12"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">
                      ﷼
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    الراتب الأساسي + البدلات الثابتة
                  </p>
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="start-date"
                      className="flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      تاريخ المباشرة *
                    </Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="end-date"
                      className="flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      آخر يوم عمل *
                    </Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Service Duration Display */}
                {startDate && endDate && (
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium mb-2">
                      مدة الخدمة المحسوبة:
                    </p>
                    <p className="text-lg font-bold gradient-text">
                      {(() => {
                        const duration = calculateDuration(startDate, endDate);
                        return `${duration.years} سنة، ${duration.months} شهر، ${duration.days} يوم`;
                      })()}
                    </p>
                  </div>
                )}

                <Separator />

                {/* Contract Type */}
                <div className="space-y-2">
                  <Label htmlFor="contract-type">نوع العقد *</Label>
                  <Select value={contractType} onValueChange={setContractType}>
                    <SelectTrigger id="contract-type">
                      <SelectValue placeholder="اختر نوع العقد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unlimited">
                        عقد غير محدد المدة
                      </SelectItem>
                      <SelectItem value="limited">عقد محدد المدة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Termination Reason */}
                <div className="space-y-2">
                  <Label htmlFor="termination-reason">
                    سبب انتهاء الخدمة *
                  </Label>
                  <Select
                    value={terminationReason}
                    onValueChange={setTerminationReason}
                  >
                    <SelectTrigger id="termination-reason">
                      <SelectValue placeholder="اختر سبب الإنهاء" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract_end">
                        انتهاء مدة العقد
                      </SelectItem>
                      <SelectItem value="resignation">
                        استقالة العامل
                      </SelectItem>
                      <SelectItem value="resignation_before_end">
                        استقالة قبل انتهاء العقد
                      </SelectItem>
                      <SelectItem value="employer_termination">
                        إنهاء من صاحب العمل
                      </SelectItem>
                      <SelectItem value="retirement">
                        بلوغ سن التقاعد
                      </SelectItem>
                      <SelectItem value="disability">
                        العجز الكلي/الجزئي
                      </SelectItem>
                      <SelectItem value="death">الوفاة</SelectItem>
                      <SelectItem value="force_majeure">
                        القوة القاهرة
                      </SelectItem>
                      <SelectItem value="marriage">زواج (للمرأة)</SelectItem>
                      <SelectItem value="maternity">ولادة (للمرأة)</SelectItem>
                      <SelectItem value="disciplinary">فصل تأديبي</SelectItem>
                      <SelectItem value="disciplinary_severe">
                        فصل تأديبي جسيم
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={calculateEOSB}
                    className="flex-1 gradient-primary"
                    size="lg"
                    disabled={
                      !salary ||
                      !contractType ||
                      !terminationReason ||
                      !startDate ||
                      !endDate
                    }
                  >
                    <Calculator className="h-5 w-5 ml-2" />
                    احسب المكافأة
                  </Button>
                  <Button onClick={handleReset} variant="outline" size="lg">
                    إعادة تعيين
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <Card className="shadow-lg border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-purple-600" />
                  المساعد الذكي
                </CardTitle>
                <CardDescription>
                  اسأل أي سؤال عن حساب نهاية الخدمة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="مثال: ما هي حقوقي في حالة الاستقالة بعد 3 سنوات؟"
                    value={aiQuestion}
                    onChange={e => setAiQuestion(e.target.value)}
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

            {/* File Verification */}
            <Card className="shadow-lg border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-green-600" />
                  التحقق من الحساب
                </CardTitle>
                <CardDescription>ارفع ملف لتحقق من صحة الحساب</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.xlsx,.xls,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">
                      {uploadedFile ? uploadedFile.name : "اضغط لرفع ملف"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, Excel, أو صورة
                    </p>
                  </label>
                </div>

                {verificationResult && (
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-sm">{verificationResult}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          {showResult && result ? (
            <Card className="shadow-lg border-primary/20 lg:sticky lg:top-20 h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  نتيجة الحساب
                </CardTitle>
                <CardDescription>
                  تفاصيل مكافأة نهاية الخدمة المستحقة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Total Amount */}
                <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    المبلغ الإجمالي المستحق
                  </p>
                  <p className="text-4xl font-bold gradient-text">
                    {formatCurrency(result.totalAmount)}
                  </p>
                  {result.percentage < 100 && (
                    <Badge variant="secondary" className="mt-3">
                      {result.percentage}% من المكافأة الكاملة
                    </Badge>
                  )}
                </div>

                {/* Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    تفاصيل الحساب
                  </h4>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">السنوات الخمس الأولى</span>
                      <span className="font-semibold">
                        {formatCurrency(result.firstFiveYears)}
                      </span>
                    </div>

                    {result.afterFiveYears > 0 && (
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">ما بعد السنوات الخمس</span>
                        <span className="font-semibold">
                          {formatCurrency(result.afterFiveYears)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                      <span className="text-sm font-medium">مدة الخدمة</span>
                      <span className="font-semibold">
                        {result.yearsCount} سنة، {result.monthsCount} شهر،{" "}
                        {result.daysCount} يوم
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Insights */}
                {result.aiInsights && (
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                    <div className="flex gap-3">
                      <Sparkles className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium mb-1 text-purple-900 dark:text-purple-100">
                          رؤية ذكية
                        </p>
                        <p className="text-xs opacity-90">
                          {result.aiInsights}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Info Note */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900 dark:text-blue-100">
                      <p className="font-medium mb-1">الحساب وفقاً للمادة 84</p>
                      <p className="text-xs opacity-90">
                        تم احتساب المكافأة وفقاً لنظام العمل السعودي. النتيجة
                        تقريبية ويُنصح بمراجعة قسم الموارد البشرية للتأكيد.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleExportPDF}
                    disabled={generatePDFMutation.isPending}
                  >
                    <Download className="h-4 w-4 ml-2" />
                    {generatePDFMutation.isPending
                      ? "جاري الإنشاء..."
                      : "تصدير PDF"}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 ml-2" />
                    مشاركة
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Save className="h-4 w-4 ml-2" />
                    حفظ
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 ml-2" />
                    Excel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg border-dashed lg:sticky lg:top-20">
              <CardContent className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8">
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Calculator className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">ابدأ الحساب</h3>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  أدخل البيانات المطلوبة في النموذج لحساب مكافأة نهاية الخدمة
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="h-4 w-4" />
                  <span>النتيجة ستظهر هنا تلقائياً</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Info Section */}
        <Card className="mt-8 max-w-7xl mx-auto">
          <CardHeader>
            <CardTitle>معلومات مهمة عن مكافأة نهاية الخدمة</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">قواعد الحساب:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>نصف شهر عن كل سنة من السنوات الخمس الأولى</li>
                  <li>شهر كامل عن كل سنة بعد السنوات الخمس</li>
                  <li>يُعتمد آخر راتب أساسي في الحساب</li>
                  <li>تُحسب الكسور (الأشهر والأيام) بالتناسب</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">حالات خاصة:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>الاستقالة: نسب مختلفة حسب مدة الخدمة</li>
                  <li>الإنهاء من صاحب العمل: مكافأة كاملة</li>
                  <li>التقاعد أو العجز: مكافأة كاملة</li>
                  <li>المرأة العاملة: حالات خاصة للزواج والولادة</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
