import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator,
  DollarSign,
  Shield,
  Award,
  Hash,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";

export default function Tools() {
  // حاسبة الراتب
  const [grossSalary, setGrossSalary] = useState("");
  const [deductions, setDeductions] = useState("");
  const [netSalary, setNetSalary] = useState<number | null>(null);

  // حاسبة التأمينات
  const [insuranceSalary, setInsuranceSalary] = useState("");
  const [insuranceResult, setInsuranceResult] = useState<{
    employee: number;
    employer: number;
    total: number;
  } | null>(null);

  // حاسبة المكافآت
  const [bonusBaseSalary, setBonusBaseSalary] = useState("");
  const [bonusPercentage, setBonusPercentage] = useState("");
  const [bonusResult, setBonusResult] = useState<number | null>(null);

  // مولد أرقام الموظفين
  const [employeePrefix, setEmployeePrefix] = useState("EMP");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [generatedId, setGeneratedId] = useState("");
  const [copied, setCopied] = useState(false);

  const calculateNetSalary = () => {
    const gross = parseFloat(grossSalary);
    const deduct = parseFloat(deductions) || 0;

    if (isNaN(gross) || gross <= 0) {
      toast.error("الرجاء إدخال راتب إجمالي صحيح");
      return;
    }

    const net = gross - deduct;
    setNetSalary(net);
    toast.success("تم حساب الراتب الصافي");
  };

  const calculateInsurance = () => {
    const salary = parseFloat(insuranceSalary);

    if (isNaN(salary) || salary <= 0) {
      toast.error("الرجاء إدخال راتب صحيح");
      return;
    }

    // نسب التأمينات الاجتماعية في السعودية
    const employeeRate = 0.1; // 10% على الموظف
    const employerRate = 0.12; // 12% على صاحب العمل

    const employeeContribution = salary * employeeRate;
    const employerContribution = salary * employerRate;
    const totalContribution = employeeContribution + employerContribution;

    setInsuranceResult({
      employee: employeeContribution,
      employer: employerContribution,
      total: totalContribution,
    });
    toast.success("تم حساب التأمينات الاجتماعية");
  };

  const calculateBonus = () => {
    const base = parseFloat(bonusBaseSalary);
    const percentage = parseFloat(bonusPercentage);

    if (isNaN(base) || base <= 0 || isNaN(percentage) || percentage <= 0) {
      toast.error("الرجاء إدخال قيم صحيحة");
      return;
    }

    const bonus = (base * percentage) / 100;
    setBonusResult(bonus);
    toast.success("تم حساب المكافأة");
  };

  const generateEmployeeId = () => {
    if (!employeeNumber || isNaN(parseInt(employeeNumber))) {
      toast.error("الرجاء إدخال رقم صحيح");
      return;
    }

    const paddedNumber = employeeNumber.padStart(5, "0");
    const year = new Date().getFullYear();
    const id = `${employeePrefix}-${year}-${paddedNumber}`;
    setGeneratedId(id);
    toast.success("تم توليد رقم الموظف");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedId);
    setCopied(true);
    toast.success("تم نسخ رقم الموظف");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">الأدوات المساعدة</h1>
        <p className="text-muted-foreground">
          مجموعة من الأدوات والحاسبات لتسهيل المهام اليومية
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calculator className="h-4 w-4 text-blue-600" />
              حاسبة الراتب
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground mt-1">أدوات متاحة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              التأمينات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10%</div>
            <p className="text-xs text-muted-foreground mt-1">نسبة الموظف</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-600" />
              المكافآت
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">متغيرة</div>
            <p className="text-xs text-muted-foreground mt-1">حسب النسبة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Hash className="h-4 w-4 text-orange-600" />
              أرقام الموظفين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">تلقائي</div>
            <p className="text-xs text-muted-foreground mt-1">توليد فوري</p>
          </CardContent>
        </Card>
      </div>

      {/* Tools Tabs */}
      <Tabs defaultValue="salary" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="salary" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            حاسبة الراتب
          </TabsTrigger>
          <TabsTrigger value="insurance" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            التأمينات
          </TabsTrigger>
          <TabsTrigger value="bonus" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            المكافآت
          </TabsTrigger>
          <TabsTrigger value="id" className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            أرقام الموظفين
          </TabsTrigger>
        </TabsList>

        {/* حاسبة الراتب */}
        <TabsContent value="salary">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                حاسبة الراتب الصافي
              </CardTitle>
              <CardDescription>احسب الراتب الصافي بعد الخصومات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grossSalary">الراتب الإجمالي (ريال)</Label>
                  <Input
                    id="grossSalary"
                    type="number"
                    placeholder="مثال: 10000"
                    value={grossSalary}
                    onChange={e => setGrossSalary(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deductions">الخصومات (ريال)</Label>
                  <Input
                    id="deductions"
                    type="number"
                    placeholder="مثال: 1000"
                    value={deductions}
                    onChange={e => setDeductions(e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={calculateNetSalary} className="w-full">
                <Calculator className="h-4 w-4 ml-2" />
                احسب الراتب الصافي
              </Button>

              {netSalary !== null && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        الراتب الصافي
                      </p>
                      <p className="text-4xl font-bold text-blue-600">
                        {netSalary.toLocaleString("ar-SA")} ريال
                      </p>
                      <div className="mt-4 pt-4 border-t border-blue-200 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            الراتب الإجمالي
                          </p>
                          <p className="font-semibold">
                            {parseFloat(grossSalary).toLocaleString("ar-SA")}{" "}
                            ريال
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">الخصومات</p>
                          <p className="font-semibold text-red-600">
                            -
                            {parseFloat(deductions || "0").toLocaleString(
                              "ar-SA"
                            )}{" "}
                            ريال
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* حاسبة التأمينات */}
        <TabsContent value="insurance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                حاسبة التأمينات الاجتماعية
              </CardTitle>
              <CardDescription>
                احسب اشتراكات التأمينات الاجتماعية (10% موظف + 12% صاحب عمل)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="insuranceSalary">الراتب الأساسي (ريال)</Label>
                <Input
                  id="insuranceSalary"
                  type="number"
                  placeholder="مثال: 10000"
                  value={insuranceSalary}
                  onChange={e => setInsuranceSalary(e.target.value)}
                />
              </div>

              <Button
                onClick={calculateInsurance}
                className="w-full gradient-employee text-white"
              >
                <Calculator className="h-4 w-4 ml-2" />
                احسب التأمينات
              </Button>

              {insuranceResult && (
                <div className="space-y-4">
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            اشتراك الموظف (10%)
                          </span>
                          <span className="font-semibold text-green-600">
                            {insuranceResult.employee.toLocaleString("ar-SA")}{" "}
                            ريال
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            اشتراك صاحب العمل (12%)
                          </span>
                          <span className="font-semibold text-green-600">
                            {insuranceResult.employer.toLocaleString("ar-SA")}{" "}
                            ريال
                          </span>
                        </div>
                        <div className="pt-4 border-t border-green-200 flex justify-between items-center">
                          <span className="font-semibold">
                            إجمالي الاشتراكات
                          </span>
                          <span className="text-2xl font-bold text-green-600">
                            {insuranceResult.total.toLocaleString("ar-SA")} ريال
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* حاسبة المكافآت */}
        <TabsContent value="bonus">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                حاسبة المكافآت والبدلات
              </CardTitle>
              <CardDescription>
                احسب المكافآت بناءً على نسبة مئوية من الراتب
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bonusBaseSalary">الراتب الأساسي (ريال)</Label>
                  <Input
                    id="bonusBaseSalary"
                    type="number"
                    placeholder="مثال: 10000"
                    value={bonusBaseSalary}
                    onChange={e => setBonusBaseSalary(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bonusPercentage">نسبة المكافأة (%)</Label>
                  <Input
                    id="bonusPercentage"
                    type="number"
                    placeholder="مثال: 15"
                    value={bonusPercentage}
                    onChange={e => setBonusPercentage(e.target.value)}
                  />
                </div>
              </div>

              <Button
                onClick={calculateBonus}
                className="w-full gradient-individual text-white"
              >
                <Calculator className="h-4 w-4 ml-2" />
                احسب المكافأة
              </Button>

              {bonusResult !== null && (
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        قيمة المكافأة
                      </p>
                      <p className="text-4xl font-bold text-purple-600">
                        {bonusResult.toLocaleString("ar-SA")} ريال
                      </p>
                      <div className="mt-4 pt-4 border-t border-purple-200">
                        <p className="text-sm text-muted-foreground">
                          {bonusPercentage}% من{" "}
                          {parseFloat(bonusBaseSalary).toLocaleString("ar-SA")}{" "}
                          ريال
                        </p>
                        <p className="text-lg font-semibold text-purple-600 mt-2">
                          الراتب الإجمالي:{" "}
                          {(
                            parseFloat(bonusBaseSalary) + bonusResult
                          ).toLocaleString("ar-SA")}{" "}
                          ريال
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* مولد أرقام الموظفين */}
        <TabsContent value="id">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-orange-600" />
                مولد أرقام الموظفين
              </CardTitle>
              <CardDescription>
                قم بتوليد أرقام موظفين فريدة تلقائياً
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeePrefix">البادئة</Label>
                  <Input
                    id="employeePrefix"
                    placeholder="مثال: EMP"
                    value={employeePrefix}
                    onChange={e => setEmployeePrefix(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeNumber">الرقم التسلسلي</Label>
                  <Input
                    id="employeeNumber"
                    type="number"
                    placeholder="مثال: 1"
                    value={employeeNumber}
                    onChange={e => setEmployeeNumber(e.target.value)}
                  />
                </div>
              </div>

              <Button
                onClick={generateEmployeeId}
                className="w-full gradient-company text-white"
              >
                <Hash className="h-4 w-4 ml-2" />
                توليد رقم الموظف
              </Button>

              {generatedId && (
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <p className="text-sm text-muted-foreground">
                        رقم الموظف المولد
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-3xl font-bold text-orange-600 font-mono">
                          {generatedId}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={copyToClipboard}
                          className="h-8 w-8"
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        الصيغة: {employeePrefix}-{new Date().getFullYear()}
                        -XXXXX
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h4 className="font-semibold text-sm">نصائح:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• استخدم بادئة قصيرة ومعبرة (مثل: EMP، STF، MGR)</li>
                  <li>• الرقم التسلسلي يبدأ من 1 ويزيد تلقائياً</li>
                  <li>• السنة الحالية تضاف تلقائياً للرقم</li>
                  <li>• الأرقام تُملأ بأصفار لتكون 5 خانات</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
