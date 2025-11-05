import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Star,
  Search,
  MapPin,
  Briefcase,
  Award,
  Calendar,
  MessageSquare,
  Video,
  Phone,
} from "lucide-react";
import { Footer } from "@/components/Footer";

const experts = [
  {
    id: 1,
    name: "د. أحمد المالكي",
    title: "مستشار موارد بشرية أول",
    specialties: ["نظام العمل", "العقود", "إنهاء الخدمة"],
    experience: "15+ سنة",
    rating: 4.9,
    reviews: 245,
    consultations: 1200,
    location: "الرياض",
    price: 500,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad",
    availability: "متاح الآن",
    languages: ["العربية", "الإنجليزية"],
  },
  {
    id: 2,
    name: "أ. فاطمة الزهراني",
    title: "خبيرة التوظيف والاختيار",
    specialties: ["التوظيف", "المقابلات", "تقييم المرشحين"],
    experience: "10+ سنوات",
    rating: 4.8,
    reviews: 189,
    consultations: 850,
    location: "جدة",
    price: 400,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    availability: "متاح غداً",
    languages: ["العربية", "الإنجليزية"],
  },
  {
    id: 3,
    name: "م. خالد العتيبي",
    title: "مستشار تطوير الأداء",
    specialties: ["الأداء", "التدريب", "التطوير"],
    experience: "12+ سنة",
    rating: 4.7,
    reviews: 156,
    consultations: 720,
    location: "الدمام",
    price: 450,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled",
    availability: "متاح الآن",
    languages: ["العربية"],
  },
  {
    id: 4,
    name: "د. نورة السديري",
    title: "مستشارة قانونية HR",
    specialties: ["القانون", "النزاعات", "التحكيم"],
    experience: "18+ سنة",
    rating: 5.0,
    reviews: 312,
    consultations: 1500,
    location: "الرياض",
    price: 600,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noura",
    availability: "متاح الآن",
    languages: ["العربية", "الإنجليزية", "الفرنسية"],
  },
  {
    id: 5,
    name: "أ. سعود الغامدي",
    title: "خبير الرواتب والمزايا",
    specialties: ["الرواتب", "المزايا", "التأمينات"],
    experience: "14+ سنة",
    rating: 4.9,
    reviews: 201,
    consultations: 950,
    location: "مكة",
    price: 450,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Saud",
    availability: "متاح بعد 3 أيام",
    languages: ["العربية"],
  },
  {
    id: 6,
    name: "د. ريم القحطاني",
    title: "مستشارة علاقات الموظفين",
    specialties: ["العلاقات", "الثقافة", "الرضا الوظيفي"],
    experience: "11+ سنة",
    rating: 4.8,
    reviews: 178,
    consultations: 800,
    location: "الخبر",
    price: 400,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Reem",
    availability: "متاح غداً",
    languages: ["العربية", "الإنجليزية"],
  },
];

const specialties = [
  "الكل",
  "نظام العمل",
  "العقود",
  "التوظيف",
  "الأداء",
  "القانون",
  "الرواتب",
];

export default function ConsultingExperts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("الكل");

  const filteredExperts = experts.filter(expert => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "الكل" ||
      expert.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              مستشارو الموارد البشرية
            </h1>
            <p className="text-xl mb-8 text-blue-50">
              تواصل مع أفضل الخبراء والمستشارين في مجال الموارد البشرية
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="ابحث عن مستشار..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pr-12 h-14 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {specialties.map(specialty => (
              <Button
                key={specialty}
                variant={
                  selectedSpecialty === specialty ? "default" : "outline"
                }
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Experts Grid */}
      <section className="py-16 flex-1">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperts.map(expert => (
              <Card
                key={expert.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-20 h-20 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{expert.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {expert.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium mr-1">
                            {expert.rating}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          ({expert.reviews} تقييم)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Specialties */}
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {expert.specialties.map(specialty => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase className="h-4 w-4" />
                      <span>{expert.experience} خبرة</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{expert.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="h-4 w-4" />
                      <span>{expert.consultations}+ استشارة</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MessageSquare className="h-4 w-4" />
                      <span>{expert.languages.join(", ")}</span>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      {expert.availability}
                    </span>
                  </div>

                  {/* Price & Actions */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          {expert.price} ﷼
                        </span>
                        <span className="text-sm text-gray-500 mr-2">
                          / ساعة
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link href={`/consulting/expert/${expert.id}`}>
                        <Button variant="outline" className="w-full">
                          عرض الملف
                        </Button>
                      </Link>
                      <Link href="/consulting/book">
                        <Button className="w-full">احجز الآن</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredExperts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                لا توجد نتائج مطابقة للبحث
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
