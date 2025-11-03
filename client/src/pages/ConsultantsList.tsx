import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Star, 
  MessageSquare, 
  Calendar,
  ChevronRight,
  Filter
} from "lucide-react";
import { Footer } from "@/components/Footer";

export default function ConsultantsList() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  // بيانات المستشارين
  const consultants = [
    {
      id: "1",
      name: "د. أحمد المالكي",
      specialty: "قانون العمل",
      rating: 4.9,
      reviews: 245,
      consultations: 250,
      avatar: "👨‍⚖️",
      bio: "متخصص في قانون العمل السعودي والعقود التجارية",
      hourlyRate: 199,
      responseTime: "< 1 ساعة",
      experience: "15 سنة"
    },
    {
      id: "2",
      name: "أ. فاطمة العتيبي",
      specialty: "الموارد البشرية",
      rating: 4.8,
      reviews: 189,
      consultations: 180,
      avatar: "👩‍💼",
      bio: "خبيرة في إدارة الموارد البشرية والتطوير التنظيمي",
      hourlyRate: 179,
      responseTime: "< 2 ساعة",
      experience: "12 سنة"
    },
    {
      id: "3",
      name: "د. محمد السعيد",
      specialty: "العقود والاتفاقيات",
      rating: 4.9,
      reviews: 312,
      consultations: 320,
      avatar: "👨‍💼",
      bio: "متخصص في صياغة والمراجعة القانونية للعقود",
      hourlyRate: 219,
      responseTime: "< 30 دقيقة",
      experience: "18 سنة"
    },
    {
      id: "4",
      name: "أ. نورة الشمري",
      specialty: "العلاقات الوظيفية",
      rating: 4.7,
      reviews: 156,
      consultations: 150,
      avatar: "👩‍⚖️",
      bio: "متخصصة في حل النزاعات والعلاقات الوظيفية",
      hourlyRate: 159,
      responseTime: "< 3 ساعات",
      experience: "10 سنوات"
    },
    {
      id: "5",
      name: "د. عبدالله الدوسري",
      specialty: "قانون العمل",
      rating: 4.8,
      reviews: 198,
      consultations: 210,
      avatar: "👨‍⚖️",
      bio: "متخصص في قضايا العمل والتقاضي",
      hourlyRate: 199,
      responseTime: "< 2 ساعة",
      experience: "14 سنة"
    },
    {
      id: "6",
      name: "أ. ليلى الحربي",
      specialty: "الموارد البشرية",
      rating: 4.9,
      reviews: 267,
      consultations: 280,
      avatar: "👩‍💼",
      bio: "خبيرة في استقطاب المواهب والتطوير الوظيفي",
      hourlyRate: 189,
      responseTime: "< 1 ساعة",
      experience: "13 سنة"
    }
  ];

  const specialties = [
    { id: "all", name: "جميع التخصصات" },
    { id: "قانون العمل", name: "قانون العمل" },
    { id: "الموارد البشرية", name: "الموارد البشرية" },
    { id: "العقود والاتفاقيات", name: "العقود والاتفاقيات" },
    { id: "العلاقات الوظيفية", name: "العلاقات الوظيفية" }
  ];

  // البحث والفلترة
  const filteredConsultants = useMemo(() => {
    let filtered = consultants;

    // البحث
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.name.includes(searchQuery) ||
        c.specialty.includes(searchQuery) ||
        c.bio.includes(searchQuery)
      );
    }

    // الفلترة حسب التخصص
    if (selectedSpecialty !== "all") {
      filtered = filtered.filter(c => c.specialty === selectedSpecialty);
    }

    // الترتيب
    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "experience") {
      filtered.sort((a, b) => {
        const expA = parseInt(a.experience);
        const expB = parseInt(b.experience);
        return expB - expA;
      });
    } else if (sortBy === "price") {
      filtered.sort((a, b) => a.hourlyRate - b.hourlyRate);
    }

    return filtered;
  }, [searchQuery, selectedSpecialty, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-12 border-b">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              المستشارون المتخصصون
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              اختر من أفضل المستشارين والخبراء في مجال الموارد البشرية والقانون
            </p>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute right-4 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="ابحث عن مستشار..."
                className="pl-4 pr-12 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-12 flex-1">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">التخصص</label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg bg-background"
                >
                  {specialties.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">الترتيب</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg bg-background"
                >
                  <option value="rating">الأعلى تقييماً</option>
                  <option value="experience">الأكثر خبرة</option>
                  <option value="price">الأقل سعراً</option>
                </select>
              </div>
            </div>

            {/* Results Info */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                وجدنا <span className="font-bold text-foreground">{filteredConsultants.length}</span> مستشار
              </p>
            </div>

            {/* Consultants Grid */}
            {filteredConsultants.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredConsultants.map((consultant) => (
                  <Card key={consultant.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="text-5xl">{consultant.avatar}</div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{consultant.name}</CardTitle>
                          <CardDescription>{consultant.specialty}</CardDescription>
                          <div className="flex items-center gap-4 mt-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                              <span className="font-semibold">{consultant.rating}</span>
                              <span className="text-muted-foreground">({consultant.reviews})</span>
                            </div>
                            <div className="text-muted-foreground">
                              {consultant.consultations} استشارة
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{consultant.bio}</p>

                      <div className="grid grid-cols-3 gap-4 py-4 border-y">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{consultant.hourlyRate}</div>
                          <div className="text-xs text-muted-foreground">ريال/ساعة</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-semibold">{consultant.responseTime}</div>
                          <div className="text-xs text-muted-foreground">وقت الرد</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-semibold">{consultant.experience}</div>
                          <div className="text-xs text-muted-foreground">الخبرة</div>
                        </div>
                      </div>

                      <Button 
                        className="w-full"
                        onClick={() => setLocation(`/consulting-book?consultant=${consultant.id}`)}
                      >
                        احجز استشارة
                        <ChevronRight className="mr-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold mb-2">لم يتم العثور على مستشارين</p>
                  <p className="text-muted-foreground">حاول تغيير معايير البحث</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
