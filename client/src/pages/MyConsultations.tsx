import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Calendar,
  User,
  FileText,
  Star,
  Plus,
  ArrowRight,
} from "lucide-react";

export default function MyConsultations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Fetch user's consultations
  const { data, isLoading, error } = trpc.consulting.getMyTickets.useQuery();

  const tickets = data?.tickets || [];

  // Filter tickets based on search and tab
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      (ticket.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && ["pending", "assigned", "in-progress"].includes(ticket.status)) ||
      (activeTab === "completed" && ticket.status === "completed") ||
      (activeTab === "cancelled" && ticket.status === "cancelled");

    return matchesSearch && matchesTab;
  });

  // Calculate statistics
  const stats = {
    total: tickets.length,
    active: tickets.filter((t) => ["pending", "assigned", "in-progress"].includes(t.status)).length,
    completed: tickets.filter((t) => t.status === "completed").length,
    cancelled: tickets.filter((t) => t.status === "cancelled").length,
  };

  // Status configurations
  const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    pending: { label: "معلقة", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    assigned: { label: "معينة", color: "bg-blue-100 text-blue-800", icon: User },
    "in-progress": { label: "قيد المعالجة", color: "bg-purple-100 text-purple-800", icon: MessageSquare },
    completed: { label: "مكتملة", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
    cancelled: { label: "ملغاة", color: "bg-red-100 text-red-800", icon: XCircle },
  };

  // Priority configurations
  const priorityConfig: Record<string, { label: string; color: string }> = {
    low: { label: "منخفضة", color: "bg-gray-100 text-gray-800" },
    medium: { label: "متوسطة", color: "bg-blue-100 text-blue-800" },
    high: { label: "عالية", color: "bg-orange-100 text-orange-800" },
    urgent: { label: "عاجلة", color: "bg-red-100 text-red-800" },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل استشاراتك...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
        <div className="container max-w-7xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="text-center text-red-600">
                <XCircle className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg font-semibold">حدث خطأ أثناء تحميل الاستشارات</p>
                <p className="text-sm mt-2">{error.message}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">استشاراتي</h1>
          <p className="text-gray-600">إدارة ومتابعة جميع استشاراتك في مكان واحد</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-purple-700">إجمالي الاستشارات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-purple-900">{stats.total}</div>
                <FileText className="h-8 w-8 text-purple-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-700">استشارات نشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-blue-900">{stats.active}</div>
                <MessageSquare className="h-8 w-8 text-blue-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-700">استشارات مكتملة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-green-900">{stats.completed}</div>
                <CheckCircle2 className="h-8 w-8 text-green-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-gradient-to-br from-red-50 to-red-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-red-700">استشارات ملغاة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-red-900">{stats.cancelled}</div>
                <XCircle className="h-8 w-8 text-red-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="ابحث في استشاراتك (الموضوع، رقم التذكرة...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
          <Link href="/consulting/book">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 whitespace-nowrap">
              <Plus className="h-4 w-4 ml-2" />
              استشارة جديدة
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="all">الكل ({stats.total})</TabsTrigger>
            <TabsTrigger value="active">نشطة ({stats.active})</TabsTrigger>
            <TabsTrigger value="completed">مكتملة ({stats.completed})</TabsTrigger>
            <TabsTrigger value="cancelled">ملغاة ({stats.cancelled})</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Consultations List */}
        {filteredTickets.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {searchQuery ? "لا توجد نتائج" : "لا توجد استشارات"}
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery
                    ? "جرّب تغيير كلمات البحث أو الفلتر"
                    : "ابدأ أول استشارة لك الآن واحصل على إجابات من خبراء الموارد البشرية"}
                </p>
                <Link href="/consulting/book">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Plus className="h-4 w-4 ml-2" />
                    احجز استشارة جديدة
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredTickets.map((ticket) => {
              const StatusIcon = statusConfig[ticket.status || 'pending']?.icon || Clock;
              const statusInfo = statusConfig[ticket.status || 'pending'] || statusConfig.pending;
              const priorityInfo = priorityConfig[ticket.priority || "medium"];

              return (
                <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {ticket.ticketNumber}
                          </Badge>
                          <Badge className={priorityInfo.color}>{priorityInfo.label}</Badge>
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="h-3 w-3 ml-1" />
                            {statusInfo.label}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl mb-1">{ticket.subject}</CardTitle>
                        <CardDescription className="line-clamp-2">{ticket.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(ticket.createdAt).toLocaleDateString("ar-SA")}</span>
                      </div>
                      {(ticket as any).assignedConsultantId && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>معين لمستشار</span>
                        </div>
                      )}
                      {ticket.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{ticket.rating}/5</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/consultation/${ticket.id}`}>
                        <Button variant="default" className="flex-1">
                          <MessageSquare className="h-4 w-4 ml-2" />
                          عرض التفاصيل
                          <ArrowRight className="h-4 w-4 mr-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
