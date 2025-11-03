import { useState } from 'react';
import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Link } from 'wouter';
import { Upload, CheckCircle2 } from 'lucide-react';

export default function ConsultantRegister() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialization: '',
    yearsOfExperience: '',
    bio: '',
    certificates: null as File[] | null,
  });

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    cookies: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, certificates: Array.from(e.target.files) });
    }
  };

  const canSubmit = 
    formData.fullName &&
    formData.email &&
    formData.phone &&
    formData.specialization &&
    formData.yearsOfExperience &&
    formData.bio &&
    agreements.terms &&
    agreements.privacy &&
    agreements.cookies;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmit) {
      toast.error('يرجى ملء جميع الحقول والموافقة على الإقرارات');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement API call to register consultant
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      toast.success('تم إرسال طلب التسجيل بنجاح! سنتواصل معك قريباً.');
    } catch (error) {
      toast.error('حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">تم إرسال طلبك بنجاح!</h2>
          <p className="text-lg text-muted-foreground mb-8">
            شكراً لك على التسجيل كمستشار في منصة رابِط. سيقوم فريقنا بمراجعة طلبك 
            والتواصل معك خلال 2-3 أيام عمل.
          </p>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              ستتلقى رسالة تأكيد على بريدك الإلكتروني: <strong>{formData.email}</strong>
            </p>
            
            <div className="flex gap-4 justify-center">
              <Link href="/">
                <Button variant="outline">
                  العودة للصفحة الرئيسية
                </Button>
              </Link>
              <Link href="/consulting">
                <Button className="gradient-primary text-white">
                  تصفح الاستشارات
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <BackButton />
        
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">التسجيل كمستشار</h1>
            <p className="text-lg text-muted-foreground">
              انضم إلى فريق المستشارين المحترفين في منصة رابِط وشارك خبرتك مع الآلاف من الشركات والأفراد
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <section>
                <h2 className="text-2xl font-bold mb-4">المعلومات الشخصية</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">الاسم الكامل *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="أدخل اسمك الكامل"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@email.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">رقم الجوال *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="05xxxxxxxx"
                        required
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Professional Information */}
              <section>
                <h2 className="text-2xl font-bold mb-4">المعلومات المهنية</h2>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="specialization">التخصص *</Label>
                      <Input
                        id="specialization"
                        value={formData.specialization}
                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                        placeholder="مثال: استشارات قانونية، تطوير الموارد البشرية"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="yearsOfExperience">سنوات الخبرة *</Label>
                      <Input
                        id="yearsOfExperience"
                        type="number"
                        min="1"
                        value={formData.yearsOfExperience}
                        onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                        placeholder="عدد سنوات الخبرة"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">نبذة عنك وخبراتك *</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="اكتب نبذة مختصرة عن خبراتك ومؤهلاتك (لا تقل عن 100 كلمة)"
                      rows={6}
                      required
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.bio.length} حرف
                    </p>
                  </div>
                </div>
              </section>

              {/* Certificates Upload */}
              <section>
                <h2 className="text-2xl font-bold mb-4">الشهادات والمستندات</h2>
                
                <div>
                  <Label htmlFor="certificates">رفع الشهادات والمستندات (اختياري)</Label>
                  <div className="mt-2">
                    <label 
                      htmlFor="certificates" 
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold">اضغط لرفع الملفات</span> أو اسحب وأفلت
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PDF, PNG, JPG (حد أقصى 10 ملفات)
                        </p>
                      </div>
                      <input
                        id="certificates"
                        type="file"
                        className="hidden"
                        multiple
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                      />
                    </label>
                    
                    {formData.certificates && formData.certificates.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">الملفات المرفوعة:</p>
                        <ul className="space-y-1">
                          {formData.certificates.map((file, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                              {file.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Agreements */}
              <section className="border-t pt-6">
                <h2 className="text-2xl font-bold mb-4">الإقرارات *</h2>
                
                <div className="space-y-4">
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
                      <Link href="/terms" className="text-primary hover:underline">
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
                      <Link href="/privacy" className="text-primary hover:underline">
                        سياسة الخصوصية
                      </Link>
                      {' '}وأفهم كيفية استخدام بياناتي
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
                      <Link href="/cookies-policy" className="text-primary hover:underline">
                        سياسة الكوكيز
                      </Link>
                      {' '}واستخدام ملفات تعريف الارتباط
                    </label>
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="flex-1 gradient-primary text-white"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال طلب التسجيل'}
                </Button>
                
                <Link href="/">
                  <Button type="button" variant="outline">
                    إلغاء
                  </Button>
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
