import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { 
  Download, 
  Edit, 
  Trash2, 
  Ban, 
  Shield, 
  CheckCircle,
  XCircle,
  Clock,
  User
} from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * صفحة إدارة طلبات حقوق البيانات (للأدمن)
 * PDPL Requirement: معالجة طلبات الأفراد خلال 30 يوم
 */
export default function AdminDataRequests() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState('');

  // Query
  const { data, isLoading } = trpc.adminPdpl.getRequests.useQuery();

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    setLocation('/');
    return null;
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      access: 'الوصول إلى البيانات',
      correct: 'تصحيح البيانات',
      delete: 'حذف البيانات',
      withdraw: 'سحب الموافقة',
      object: 'الاعتراض على المعالجة',
    };
    return labels[type] || type;
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, any> = {
      access: Download,
      correct: Edit,
      delete: Trash2,
      withdraw: Shield,
      object: Ban,
    };
    const Icon = icons[type] || Download;
    return <Icon className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      new: { variant: 'default', label: 'جديد', icon: Clock },
      in_progress: { variant: 'secondary', label: 'قيد المعالجة', icon: Clock },
      done: { variant: 'default', label: 'مكتمل', icon: CheckCircle },
      rejected: { variant: 'destructive', label: 'مرفوض', icon: XCircle },
    };
    const config = variants[status] || variants.new;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getDaysRemaining = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    const remaining = 30 - diffDays;
    
    if (remaining < 0) {
      return <span className="text-red-600 font-semibold">متأخر {Math.abs(remaining)} يوم</span>;
    } else if (remaining <= 5) {
      return <span className="text-amber-600 font-semibold">متبقي {remaining} يوم</span>;
    } else {
      return <span className="text-muted-foreground">متبقي {remaining} يوم</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            طلبات حقوق البيانات
          </h1>
          <p className="text-muted-foreground">
            إدارة طلبات الأفراد (الرد خلال 30 يوم)
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {data?.requests?.filter((r: any) => r.status === 'new').length || 0}
                </p>
                <p className="text-sm text-muted-foreground mt-1">طلبات جديدة</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-600">
                  {data?.requests?.filter((r: any) => r.status === 'in_progress').length || 0}
                </p>
                <p className="text-sm text-muted-foreground mt-1">قيد المعالجة</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">
                  {data?.requests?.filter((r: any) => r.status === 'done').length || 0}
                </p>
                <p className="text-sm text-muted-foreground mt-1">مكتملة</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600">
                  {data?.requests?.filter((r: any) => {
                    const created = new Date(r.createdAt);
                    const now = new Date();
                    const diffDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
                    return diffDays > 30 && r.status !== 'done';
                  }).length || 0}
                </p>
                <p className="text-sm text-muted-foreground mt-1">متأخرة</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        <Card>
          <CardHeader>
            <CardTitle>جميع الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            {!data?.requests || data.requests.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد طلبات حالياً</p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.requests.map((request: any) => (
                  <Card key={request.id} className="border-2">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              {getTypeIcon(request.type)}
                            </div>
                            <div>
                              <h3 className="font-semibold">{getTypeLabel(request.type)}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <User className="h-3 w-3" />
                                <span>المستخدم #{request.userId}</span>
                                <span>•</span>
                                <span>{new Date(request.createdAt).toLocaleDateString('ar-SA')}</span>
                              </div>
                            </div>
                          </div>

                          {request.payloadJson && (
                            <div className="bg-slate-50 p-3 rounded-lg text-sm">
                              <p className="font-semibold mb-1">التفاصيل:</p>
                              <p className="text-muted-foreground">{request.payloadJson}</p>
                            </div>
                          )}

                          {request.adminNotes && (
                            <div className="bg-blue-50 p-3 rounded-lg text-sm">
                              <p className="font-semibold mb-1">ملاحظات الأدمن:</p>
                              <p className="text-blue-900">{request.adminNotes}</p>
                            </div>
                          )}
                        </div>

                        <div className="text-right space-y-2">
                          {getStatusBadge(request.status)}
                          <p className="text-sm">
                            {getDaysRemaining(request.createdAt)}
                          </p>
                          {request.status === 'new' && (
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" variant="default">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                قبول
                              </Button>
                              <Button size="sm" variant="destructive">
                                <XCircle className="h-3 w-3 mr-1" />
                                رفض
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="mt-6 bg-amber-50 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Clock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm text-amber-900">
                <p className="font-semibold">تذكير مهم:</p>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>يجب الرد على جميع الطلبات خلال 30 يوم عمل (متطلب PDPL)</li>
                  <li>يمكن تمديد المدة 30 يوماً إضافياً في الحالات المعقدة (مع إخطار المستخدم)</li>
                  <li>الطلبات المتأخرة قد تعرض المنصة لغرامات من سدايا</li>
                  <li>يجب توثيق جميع الإجراءات المتخذة</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
