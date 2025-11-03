import { useLocation } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  MessageSquare, 
  Phone, 
  Video, 
  FileText, 
  Scale, 
  Briefcase,
  Calendar,
  Clock,
  CheckCircle2,
  Upload,
  ArrowRight,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { trpc } from "@/lib/trpc";

export default function ConsultingBook() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState("");
  const [selectedExpert, setSelectedExpert] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createTicketMutation = trpc.consulting.createTicket.useMutation();

  const serviceTypes = [
    {
      id: "quick",
      title: "استشارة سريعة",
      description: "استشارة قصيرة لحل مشكلة محددة",
      types: [
        { id: "text", icon: MessageSquare, name: "نصية", duration: "15-30 دقيقة", price: 99 },
        { id: "voice", icon: Phone, name: "صوتية", duration: "30 دقيقة", price: 149 },
        { id: "video", icon: Video, name: "فيديو", duration: "30-45 دقيقة", price: 199 }
      ]
    },
    {
      id: "contract",
      title: "مراجعة عقود العمل",
      description: "مراجعة قانونية شاملة للعقود",
      packages: [
        { id: "basic", name: "مراجعة بسيطة", price: 299, duration: "2-3 أيام" },
        { id: "advanced", name: "مراجعة متقدمة", price: 499, duration: "3-5 أيام" },
        { id: "new", name: "صياغة عقد جديد", price: 799, duration: "5-7 أيام" }
      ]
    },
    {
      id: "termination",
      title: "تدقيق قرارات الفصل",
      description: "فحص قانوني للقرارات الإدارية",
      packages: [
        { id: "basic", name: "تدقيق أساسي", price: 199, duration: "1-2 يوم" },
        { id: "comprehensive", name: "تدقيق شامل", price: 399, duration: "2-3 أيام" },
        { id: "consultation", name: "تدقيق + استشارة", price: 499, duration: "2-3 أيام" }
      ]
    },
    {
      id: "case-study",
      title: "دراسة حالة HR",
      description: "دراسة تفصيلية للحالات المعقدة",
      packages: [
        { id: "basic", name: "دراسة أساسية", price: 999, duration: "7-10 أيام" },
        { id: "action-plan", name: "دراسة + خطة عمل", price: 1499, duration: "10-14 يوم" }
      ]
    }
  ];

  const experts = [
    { id: "1", name: "د. أحمد المالكي", specialty: "قانون العمل", rating: 4.9, consultations: 250, avatar: "👨‍⚖️" },
    { id: "2", name: "أ. فاطمة العتيبي", specialty: "الموارد البشرية", rating: 4.8, consultations: 180, avatar: "👩‍💼" },
    { id: "3", name: "د. محمد السعيد", specialty: "العقود والاتفاقيات", rating: 4.9, consultations: 320, avatar: "👨‍💼" },
    { id: "4", name: "أ. نورة الشمري", specialty: "العلاقات الوظيفية", rating: 4.7, consultations: 150, avatar: "👩‍⚖️" }
  ];

  const timeSlots = [
    "09:00 ص", "10:00 ص", "11:00 ص", "12:00 م",
    "02:00 م", "03:00 م", "04:00 م", "05:00 م"
  ];

  const getServicePrice = () => {
    const service = serviceTypes.find(s => s.id === serviceType);
    if (!service) return 0;
    
    if (service.types) {
      const type = service.types.find(t => t.id === selectedExpert);
      return type?.price || 0;
    }
    
    if (service.packages) {
      const pkg = service.packages.find(p => p.id === selectedExpert);
      return pkg?.price || 0;
    }
    
    return 0;
  };

  const handleSubmit = async () => {
    if (!topic.trim() || !selectedDate || !selectedTime) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createTicketMutation.mutateAsync({
        packageId: parseInt(selectedExpert),
        subject: topic,
        description: details,
        priority: "medium",
      });

      toast.success("تم حجز الاستشارة بنجاح!");
      
      // إعادة التوجيه إلى صفحة استشاراتي
      setTimeout(() => {
        setLocation("/my-consultations");
      }, 1500);
    } catch (error) {
      toast.error("حدث خطأ أثناء حجز الاستشارة");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-12 border-b">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Link href="/consulting" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4">
              <ArrowLeft className="h-4 w-4" />
              العودة للخدمات الاستشارية
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              احجز استشارتك
            </h1>
            <p className="text-lg text-muted-foreground">
              اختر نوع الخدمة والوقت المناسب لك
            </p>

            {/* Progress Steps */}
            <div className="flex items-center gap-4 mt-8">
              {[
                { num: 1, title: "نوع الخدمة" },
                { num: 2, title: "اختيار المستشار" },
                { num: 3, title: "الموعد والتفاصيل" },
                { num: 4, title: "تأكيد الحجز" }
              ].map((s, idx) => (
                <div key={idx} className="flex items-center gap-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= s.num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {step > s.num ? <CheckCircle2 className="h-5 w-5" /> : s.num}
                  </div>
                  <span className="text-sm hidden md:block">{s.title}</span>
                  {idx < 3 && <div className={`h-0.5 flex-1 ${step > s.num ? 'bg-primary' : 'bg-muted'}`} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 flex-1">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            
            {/* Step 1: Service Type */}
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">اختر نوع الخدمة</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {serviceTypes.map((service) => (
                      <Card 
                        key={service.id}
                        className={`cursor-pointer transition-all ${
                          serviceType === service.id ? 'border-primary shadow-lg' : 'hover:border-primary/50'
                        }`}
                        onClick={() => {
                          setServiceType(service.id);
                          setSelectedExpert("");
                        }}
                      >
                        <CardHeader>
                          <CardTitle className="text-xl">{service.title}</CardTitle>
                          <CardDescription>{service.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {service.types && (
                            <div className="space-y-2">
                              {service.types.map((type) => (
                                <div key={type.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                  <div className="flex items-center gap-2">
                                    <type.icon className="h-4 w-4 text-primary" />
                                    <span className="font-medium">{type.name}</span>
                                    <span className="text-sm text-muted-foreground">({type.duration})</span>
                                  </div>
                                  <span className="font-bold text-primary">{type.price} ريال</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {service.packages && (
                            <div className="space-y-2">
                              {service.packages.map((pkg) => (
                                <div key={pkg.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                  <div>
                                    <div className="font-medium">{pkg.name}</div>
                                    <div className="text-sm text-muted-foreground">{pkg.duration}</div>
                                  </div>
                                  <span className="font-bold text-primary">{pkg.price} ريال</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {serviceType && (
                  <div className="flex justify-end">
                    <Button size="lg" onClick={() => setStep(2)}>
                      التالي
                      <ArrowRight className="mr-2 h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Choose Expert */}
            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">اختر المستشار أو الباقة</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {serviceTypes.find(s => s.id === serviceType)?.types ? (
                      experts.map((expert) => (
                        <Card 
                          key={expert.id} 
                          className={`hover:shadow-lg transition-all cursor-pointer ${
                            selectedExpert === expert.id ? 'border-primary shadow-lg' : ''
                          }`}
                          onClick={() => setSelectedExpert(expert.id)}
                        >
                          <CardHeader>
                            <div className="flex items-start gap-4">
                              <div className="text-4xl">{expert.avatar}</div>
                              <div className="flex-1">
                                <CardTitle className="text-lg">{expert.name}</CardTitle>
                                <CardDescription>{expert.specialty}</CardDescription>
                                <div className="flex items-center gap-4 mt-2 text-sm">
                                  <div className="flex items-center gap-1">
                                    <span className="text-yellow-500">★</span>
                                    <span className="font-semibold">{expert.rating}</span>
                                  </div>
                                  <div className="text-muted-foreground">
                                    {expert.consultations} استشارة
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Button className="w-full" variant={selectedExpert === expert.id ? "default" : "outline"}>
                              {selectedExpert === expert.id ? "✓ مختار" : "اختيار"}
                            </Button>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      serviceTypes.find(s => s.id === serviceType)?.packages?.map((pkg) => (
                        <Card 
                          key={pkg.id}
                          className={`hover:shadow-lg transition-all cursor-pointer ${
                            selectedExpert === pkg.id ? 'border-primary shadow-lg' : ''
                          }`}
                          onClick={() => setSelectedExpert(pkg.id)}
                        >
                          <CardHeader>
                            <CardTitle>{pkg.name}</CardTitle>
                            <CardDescription>{pkg.duration}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="text-2xl font-bold text-primary">{pkg.price} ريال</div>
                            <Button className="w-full" variant={selectedExpert === pkg.id ? "default" : "outline"}>
                              {selectedExpert === pkg.id ? "✓ مختار" : "اختيار"}
                            </Button>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    <ArrowLeft className="ml-2 h-5 w-5" />
                    السابق
                  </Button>
                  <Button size="lg" disabled={!selectedExpert} onClick={() => setStep(3)}>
                    التالي
                    <ArrowRight className="mr-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Date & Details */}
            {step === 3 && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>تفاصيل الاستشارة</CardTitle>
                    <CardDescription>املأ البيانات التالية</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date">التاريخ</Label>
                        <Input 
                          type="date" 
                          id="date" 
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">الوقت</Label>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الوقت" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="topic">موضوع الاستشارة *</Label>
                      <Input 
                        id="topic" 
                        placeholder="مثال: مراجعة عقد عمل"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="details">تفاصيل إضافية</Label>
                      <Textarea 
                        id="details" 
                        placeholder="اشرح تفاصيل الاستشارة..."
                        rows={5}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    <ArrowLeft className="ml-2 h-5 w-5" />
                    السابق
                  </Button>
                  <Button size="lg" onClick={() => setStep(4)}>
                    التالي
                    <ArrowRight className="mr-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>ملخص الحجز</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">نوع الخدمة</span>
                      <span className="font-semibold">{serviceTypes.find(s => s.id === serviceType)?.title}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">الباقة/المستشار</span>
                      <span className="font-semibold">
                        {serviceTypes.find(s => s.id === serviceType)?.types?.find(t => t.id === selectedExpert)?.name ||
                         serviceTypes.find(s => s.id === serviceType)?.packages?.find(p => p.id === selectedExpert)?.name ||
                         experts.find(e => e.id === selectedExpert)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">التاريخ والوقت</span>
                      <span className="font-semibold">{selectedDate} | {selectedTime}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">الموضوع</span>
                      <span className="font-semibold">{topic}</span>
                    </div>
                    <div className="flex justify-between py-4 text-lg font-bold">
                      <span>الإجمالي</span>
                      <span className="text-primary">{getServicePrice()} ريال</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    <ArrowLeft className="ml-2 h-5 w-5" />
                    السابق
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        جاري الحجز...
                      </>
                    ) : (
                      <>
                        تأكيد الحجز
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
