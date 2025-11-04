import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { 
  ArrowRight, 
  Briefcase,
  FileText,
  Users,
  GraduationCap,
  DollarSign,
  Target,
  Scale,
  Building2,
  TrendingUp,
  BarChart
} from 'lucide-react';
import { Link } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';

const iconMap: Record<string, any> = {
  'علاقات-عمالة': Briefcase,
  'سياسات-إجراءات': FileText,
  'توظيف-استقطاب': Users,
  'تدريب-تطوير': GraduationCap,
  'تعويضات-مزايا': DollarSign,
  'إدارة-أداء': Target,
  'امتثال-قانوني': Scale,
  'تطوير-تنظيمي': Building2,
  'سعودة-توطين': TrendingUp,
  'تحليلات-hr': BarChart,
};

const colorMap: Record<number, { bg: string; text: string; border: string }> = {
  0: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
  1: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
  2: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
  3: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
  4: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200' },
  5: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200' },
  6: { bg: 'bg-teal-100', text: 'text-teal-600', border: 'border-teal-200' },
  7: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' },
  8: { bg: 'bg-cyan-100', text: 'text-cyan-600', border: 'border-cyan-200' },
  9: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200' },
};

export function ConsultingServicesSection() {
  const { data: types, isLoading } = trpc.consultant.getConsultationTypes.useQuery();

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-14 w-14 mb-4" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-8 w-24 mb-4" />
                <Skeleton className="h-10 w-full" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Display first 6 types
  const displayTypes = types?.types?.slice(0, 6) || [];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">الخدمات الاستشارية</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            استشارات متخصصة في الموارد البشرية من خبراء معتمدين - أكثر من {types?.types?.length || 10} نوع استشارة
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {displayTypes.map((type: any, index: number) => {
            const colors = colorMap[index % 10];
            const IconComponent = iconMap[type.slug] || Briefcase;
            const isPopular = index === 1; // Second card is popular

            return (
              <Card 
                key={type.id} 
                className={`p-6 hover-lift cursor-pointer group relative ${
                  isPopular ? `border-2 ${colors.border}` : ''
                }`}
              >
                {isPopular && (
                  <div className="absolute top-4 left-4">
                    <span className={`${colors.text.replace('text-', 'bg-')} text-white text-xs px-2 py-1 rounded-full`}>
                      الأكثر طلباً
                    </span>
                  </div>
                )}
                
                <div className={`h-14 w-14 rounded-lg ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className={`h-7 w-7 ${colors.text}`} />
                </div>
                
                <h3 className="text-xl font-bold mb-2">{type.nameAr}</h3>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {type.descriptionAr}
                </p>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className={`text-2xl font-bold ${colors.text}`}>
                    {type.price} ريال
                  </span>
                  <span className="text-sm text-muted-foreground">
                    / {type.duration} دقيقة
                  </span>
                </div>
                
                <Link href="/consulting/book">
                  <Button 
                    className={`w-full ${
                      isPopular 
                        ? `${colors.text.replace('text-', 'bg-')} hover:opacity-90 text-white` 
                        : ''
                    }`}
                    variant={isPopular ? 'default' : 'outline'}
                  >
                    احجز الآن
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/consulting">
            <Button size="lg" className="gradient-primary text-white">
              عرض جميع الخدمات الاستشارية ({types?.types?.length || 10})
              <ArrowRight className="mr-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
