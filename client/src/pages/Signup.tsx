import { useState } from 'react';
import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Building2, User, Mail, Lock, ArrowRight, Shield, Phone, Briefcase, UserCircle } from 'lucide-react';
import { Link } from 'wouter';
import { getLoginUrl } from '@/const';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';
import { useLocation } from 'wouter';

export default function Signup() {
  const [, setLocation] = useLocation();
  const [accountType, setAccountType] = useState<'company' | 'freelancer' | 'employee'>('company');
  const [isLoading, setIsLoading] = useState(false);
  
  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: (data) => {
      toast.success('تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول');
      // Save user data to localStorage
      localStorage.setItem('registeredUser', JSON.stringify(data.user));
      // Redirect to login
      setTimeout(() => {
        setLocation('/login');
      }, 1500);
    },
    onError: (error) => {
      toast.error(error.message || 'فشل في إنشاء الحساب');
      setIsLoading(false);
    },
  });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
  });
  
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    cookies: false,
  });

  const canSubmit = 
    formData.fullName &&
    formData.email &&
    formData.phone &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    agreements.terms &&
    agreements.privacy &&
    agreements.cookies;

  const handleSignup = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!canSubmit) {
      toast.error('يرجى ملء جميع الحقول والموافقة على الإقرارات');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('كلمات المرور غير متطابقة');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      return;
    }

    setIsLoading(true);

    // Map account type to userType
    const userTypeMap = {
      'company': 'company' as const,
      'freelancer': 'individual' as const,
      'employee': 'employee' as const,
    };

    // Register with database
    registerMutation.mutate({
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phone,
      userType: userTypeMap[accountType],
    });
  };

  const handleSocialSignup = (provider: string) => {
    // Save account type and agreements
    const socialData = {
      accountType,
      agreements,
      provider,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('pendingSocialSignup', JSON.stringify(socialData));
    
    // Redirect to OAuth
    window.location.href = getLoginUrl();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="container max-w-2xl py-8">
        <BackButton />
        
        <Card className="mt-6">
          <CardHeader className="space-y-1 text-center">
            <Link href="/" className="flex items-center justify-center gap-2 mb-4">
              <img src="/rabit-logo.svg" alt="Rabit" className="h-10 w-10" />
              <span className="text-2xl font-bold text-gradient-primary">رابِط</span>
            </Link>
            <CardTitle className="text-3xl">إنشاء حساب جديد</CardTitle>
            <CardDescription className="text-base">
              ابدأ رحلتك مع مساعد الموارد البشرية الذكي
            </CardDescription>
            
            {/* Free Month Offer */}
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-semibold text-blue-700">
                🎁 عرض خاص: شهر مجاني عند التسجيل الآن!
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Account Type Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">نوع الحساب *</Label>
              <RadioGroup value={accountType} onValueChange={(value: any) => setAccountType(value)}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <label className={`flex items-center space-x-2 space-x-reverse p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    accountType === 'company' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}>
                    <RadioGroupItem value="company" id="company" />
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">شركة</p>
                        <p className="text-xs text-muted-foreground">إدارة الموظفين</p>
                      </div>
                    </div>
                  </label>

                  <label className={`flex items-center space-x-2 space-x-reverse p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    accountType === 'freelancer' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}>
                    <RadioGroupItem value="freelancer" id="freelancer" />
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">مستقل HR</p>
                        <p className="text-xs text-muted-foreground">مستشار موارد بشرية</p>
                      </div>
                    </div>
                  </label>

                  <label className={`flex items-center space-x-2 space-x-reverse p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    accountType === 'employee' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}>
                    <RadioGroupItem value="employee" id="employee" />
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">موظف</p>
                        <p className="text-xs text-muted-foreground">استخدام شخصي</p>
                      </div>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">الاسم الكامل *</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="fullName" 
                      placeholder="أدخل اسمك الكامل" 
                      className="pr-10"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الجوال *</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="phone" 
                      type="tel"
                      placeholder="05xxxxxxxx" 
                      className="pr-10"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني *</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="example@company.com" 
                    className="pr-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {accountType === 'company' && (
                <div className="space-y-2">
                  <Label htmlFor="company">اسم الشركة (اختياري)</Label>
                  <div className="relative">
                    <Building2 className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="company" 
                      placeholder="اسم شركتك" 
                      className="pr-10"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور *</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تأكيد كلمة المرور *</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pr-10"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Agreements */}
            <div className="space-y-3 border-t pt-4">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                الإقرارات الإلزامية *
              </Label>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={agreements.terms}
                    onCheckedChange={(checked) => 
                      setAgreements({ ...agreements, terms: checked as boolean })
                    }
                    required
                  />
                  <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    أوافق على{' '}
                    <Link href="/terms" target="_blank" className="text-primary hover:underline font-medium">
                      الشروط والأحكام
                    </Link>
                    {' '}الخاصة بمنصة رابِط
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="privacy"
                    checked={agreements.privacy}
                    onCheckedChange={(checked) => 
                      setAgreements({ ...agreements, privacy: checked as boolean })
                    }
                    required
                  />
                  <label htmlFor="privacy" className="text-sm leading-relaxed cursor-pointer">
                    أوافق على{' '}
                    <Link href="/privacy-policy" target="_blank" className="text-primary hover:underline font-medium">
                      سياسة الخصوصية
                    </Link>
                    {' '}وأفهم كيفية معالجة بياناتي وفقاً لنظام حماية البيانات الشخصية السعودي (PDPL)
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="cookies"
                    checked={agreements.cookies}
                    onCheckedChange={(checked) => 
                      setAgreements({ ...agreements, cookies: checked as boolean })
                    }
                    required
                  />
                  <label htmlFor="cookies" className="text-sm leading-relaxed cursor-pointer">
                    أوافق على{' '}
                    <Link href="/cookies-policy" target="_blank" className="text-primary hover:underline font-medium">
                      سياسة الكوكيز
                    </Link>
                    {' '}واستخدام ملفات تعريف الارتباط
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              className="w-full gradient-primary text-white" 
              size="lg"
              onClick={handleSignup}
              type="button"
              disabled={!canSubmit}
            >
              إنشاء الحساب
              <ArrowRight className="mr-2 h-4 w-4" />
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  أو التسجيل عبر
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleSocialSignup('google')}
                type="button"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4 ml-2" />
                Google
              </Button>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleSocialSignup('apple')}
                type="button"
              >
                <svg className="h-4 w-4 ml-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Apple
              </Button>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleSocialSignup('microsoft')}
                type="button"
              >
                <svg className="h-4 w-4 ml-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
                </svg>
                Microsoft
              </Button>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
              لديك حساب بالفعل؟{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                تسجيل الدخول
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
