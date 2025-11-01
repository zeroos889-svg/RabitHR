import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Sparkles, Download, Save, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Streamdown } from 'streamdown';

type Step = 'select' | 'input' | 'result';

const categoryLabels: Record<string, string> = {
  employment: 'التوظيف',
  certificates: 'الشهادات',
  internal: 'خطابات داخلية',
  disciplinary: 'الإجراءات التأديبية',
  termination: 'إنهاء الخدمة',
};

export default function DocumentGenerator() {
  const { user, loading: authLoading } = useAuth();
  const [step, setStep] = useState<Step>('select');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [generatedDoc, setGeneratedDoc] = useState<any>(null);

  // Fetch templates
  const { data: templatesData, isLoading: templatesLoading } = trpc.documentGenerator.getTemplates.useQuery();
  const templates = templatesData?.templates || [];

  // Generate document mutation
  const generateMutation = trpc.documentGenerator.generateDocument.useMutation({
    onSuccess: (data) => {
      setGeneratedDoc(data);
      setStep('result');
      toast.success('تم توليد المستند بنجاح!');
    },
    onError: (error) => {
      toast.error('فشل توليد المستند: ' + error.message);
    },
  });

  // Group templates by category
  const groupedTemplates = templates.reduce((acc: any, template: any) => {
    const cat = template.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(template);
    return acc;
  }, {});

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template);
    setFormData({});
    setStep('input');
  };

  const handleGenerate = () => {
    if (!selectedTemplate) return;

    generateMutation.mutate({
      templateCode: selectedTemplate.code,
      inputData: formData,
      lang: formData.lang || 'ar',
      style: formData.style || 'formal',
      companyLogo: formData.companyLogo,
      companyName: formData.companyName,
    });
  };

  if (authLoading || templatesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>تسجيل الدخول مطلوب</CardTitle>
            <CardDescription>يجب تسجيل الدخول لاستخدام مولّد النماذج</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = '/api/oauth/login'} className="w-full">
              تسجيل الدخول
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            مولّد النماذج الذكي
          </h1>
          <p className="text-muted-foreground">
            قم بإنشاء المستندات والخطابات الرسمية بالذكاء الاصطناعي في ثوانٍ
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`flex items-center gap-2 ${step === 'select' ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'select' ? 'bg-primary text-white' : 'bg-muted'}`}>
              1
            </div>
            <span className="hidden sm:inline">اختر القالب</span>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className={`flex items-center gap-2 ${step === 'input' ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'input' ? 'bg-primary text-white' : 'bg-muted'}`}>
              2
            </div>
            <span className="hidden sm:inline">أدخل البيانات</span>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className={`flex items-center gap-2 ${step === 'result' ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'result' ? 'bg-primary text-white' : 'bg-muted'}`}>
              3
            </div>
            <span className="hidden sm:inline">النتيجة</span>
          </div>
        </div>

        {/* Step 1: Select Template */}
        {step === 'select' && (
          <div className="space-y-6">
            {Object.entries(groupedTemplates).map(([category, categoryTemplates]: [string, any]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {categoryLabels[category] || category}
                  </CardTitle>
                  <CardDescription>
                    {(categoryTemplates as any[]).length} قالب متاح
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(categoryTemplates as any[]).map((template) => (
                      <Card
                        key={template.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary"
                        onClick={() => handleSelectTemplate(template)}
                      >
                        <CardHeader>
                          <CardTitle className="text-lg">{template.titleAr}</CardTitle>
                          <CardDescription className="text-sm">{template.titleEn}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" className="w-full">
                            اختر هذا القالب
                            <ArrowRight className="mr-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Step 2: Input Data */}
        {step === 'input' && selectedTemplate && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedTemplate.titleAr}</CardTitle>
                  <CardDescription>{selectedTemplate.titleEn}</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setStep('select')}>
                  <ArrowLeft className="ml-2 h-4 w-4" />
                  العودة
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Company Info */}
              <div className="space-y-4">
                <h3 className="font-semibold">معلومات الشركة (اختياري)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">اسم الشركة</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName || ''}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="مثال: شركة رابِط للموارد البشرية"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyLogo">رابط شعار الشركة</Label>
                    <Input
                      id="companyLogo"
                      value={formData.companyLogo || ''}
                      onChange={(e) => setFormData({ ...formData, companyLogo: e.target.value })}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                </div>
              </div>

              {/* Document Settings */}
              <div className="space-y-4">
                <h3 className="font-semibold">إعدادات المستند</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lang">اللغة</Label>
                    <Select value={formData.lang || 'ar'} onValueChange={(value) => setFormData({ ...formData, lang: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">الإنجليزية</SelectItem>
                        <SelectItem value="both">ثنائي اللغة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="style">الأسلوب</Label>
                    <Select value={formData.style || 'formal'} onValueChange={(value) => setFormData({ ...formData, style: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formal">رسمي</SelectItem>
                        <SelectItem value="semi-formal">شبه رسمي</SelectItem>
                        <SelectItem value="friendly">ودّي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Dynamic Fields based on template */}
              <div className="space-y-4">
                <h3 className="font-semibold">بيانات المستند</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="employeeName">اسم الموظف</Label>
                    <Input
                      id="employeeName"
                      value={formData.employeeName || ''}
                      onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                      placeholder="مثال: أحمد محمد"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobTitle">المسمى الوظيفي</Label>
                    <Input
                      id="jobTitle"
                      value={formData.jobTitle || ''}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      placeholder="مثال: مدير الموارد البشرية"
                    />
                  </div>
                  <div>
                    <Label htmlFor="additionalInfo">معلومات إضافية</Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo || ''}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      placeholder="أي معلومات أخرى تريد تضمينها في المستند..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <div className="flex gap-4">
                <Button
                  onClick={handleGenerate}
                  disabled={generateMutation.isPending || !formData.employeeName}
                  className="flex-1"
                  size="lg"
                >
                  {generateMutation.isPending ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      جاري التوليد...
                    </>
                  ) : (
                    <>
                      <Sparkles className="ml-2 h-4 w-4" />
                      توليد المستند
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Result */}
        {step === 'result' && generatedDoc && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    <CardTitle>تم توليد المستند بنجاح!</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setStep('select')}>
                    <ArrowLeft className="ml-2 h-4 w-4" />
                    مستند جديد
                  </Button>
                </div>
                <CardDescription>
                  يمكنك الآن معاينة المستند وتحميله أو حفظه في مكتبتك
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Warning */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    ⚠️ <strong>تنبيه مهم:</strong> هذا المستند مولّد بالذكاء الاصطناعي ويخضع للمراجعة البشرية قبل الاستخدام الرسمي. 
                    يُنصح بمراجعته من قبل متخصص HR أو قانوني.
                  </p>
                </div>

                {/* Preview */}
                <div className="bg-white border rounded-lg p-6 prose prose-sm max-w-none">
                  <Streamdown>{generatedDoc.outputHtml}</Streamdown>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    <Download className="ml-2 h-4 w-4" />
                    تحميل PDF
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="ml-2 h-4 w-4" />
                    تحميل Word
                  </Button>
                  <Button className="flex-1">
                    <Save className="ml-2 h-4 w-4" />
                    حفظ في مكتبتي
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
