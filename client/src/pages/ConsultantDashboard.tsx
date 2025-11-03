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
  ArrowRight,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

export default function ConsultantDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Fetch consultant's tickets
  const { data, isLoading, error } = trpc.consulting.getConsultantTickets.useQuery();

  const tickets = data?.tickets || [];

  // Filter tickets based on search and tab
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && ticket.status === "pending") ||
      (activeTab === "assigned" && ticket.status === "assigned") ||
      (activeTab === "in-progress" && ticket.status === "in-progress") ||
      (activeTab === "completed" && ticket.status === "completed");

    return matchesSearch && matchesTab;
  });

  // Calculate statistics
  const stats = {
    total: tickets.length,
    pending: tickets.filter((t) => t.status === "pending" || t.status === "assigned").length,
    inProgress: tickets.filter((t) => t.status === "in-progress").length,
    completed: tickets.filter((t) => t.status === "completed").length,
    avgRating:
      tickets.filter((t) => t.rating).length > 0
        ? (
            tickets.filter((t) => t.rating).reduce((sum, t) => sum + (t.rating || 0), 0) /
            tickets.filter((t) => t.rating).length
          ).toFixed(1)
        : "0",
  };

  // Status configurations
  const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    pending: { label: "معلقة", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    assigned: { label: "معينة لك", color: "bg-blue-100 text-blue-800", icon: User },
    "in-progress": { label: "قيد المعالجة", color: "bg-purple-100 text-purple-800", icon: MessageSquare },
    completed: { label: "مكتملة", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
    cancelled: { label: "ملغاة", color: "bg-red-100 text-red-800", icon: XCircle },
  };

  const priorityConfig: Record<string, { label: string; color: string }> = {
    low: { label: "منخفضة", color: "bg-gray-100 text-gray-800" },
    medium: { label: "متوسطة", color: "bg-blue-100 text-blue-800" },
    high: { label: "عالية", color: "bg-orange-100 text-orange-800" },
    urgent: { label: "عاجلة", color: "bg-red-100 text-red-800" },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل لوحة التحكم...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
        <div className="container max-w-7xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="text-center text-red-600">
                <XCircle className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg font-semibold">حدث خطأ أثناء تحميل البيانات</p>
                <p className="text-sm mt-2">{error.message}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">لوحة تحكم المستشار</h1>
          <p className="text-gray-600">إدارة ومتابعة جميع الاستشارات المعينة لك</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-indigo-700">إجمالي الاستشارات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-indigo-900">{stats.total}</div>
                <FileText className="h-8 w-8 text-indigo-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-yellow-700">معلقة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-yellow-900">{stats.pending}</div>
                <Clock className="h-8 w-8 text-yellow-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-purple-700">قيد المعالجة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-purple-900">{stats.inProgress}</div>
                <MessageSquare className="h-8 w-8 text-purple-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-700">مكتملة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-green-900">{stats.completed}</div>
                <CheckCircle2 className="h-8 w-8 text-green-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-amber-700">متوسط التقييم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-amber-900">{stats.avgRating}</div>
                <Star className="h-8 w-8 text-amber-600 opacity-50 fill-amber-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="justify-start h-auto py-4 border-yellow-300 hover:bg-yellow-50"
                onClick={() => setActiveTab("pending")}
              >
                <div className="text-right">
                  <div className="font-semibold text-yellow-800">استشارات معلقة</div>
                  <div className="text-sm text-yellow-600">تحتاج إلى رد ({stats.pending})</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto py-4 border-purple-300 hover:bg-purple-50"
                onClick={() => setActiveTab("in-progress")}
              >
                <div className="text-right">
                  <div className="font-semibold text-purple-800">قيد المعالجة</div>
                  <div className="text-sm text-purple-600">جارٍ العمل عليها ({stats.inProgress})</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto py-4 border-green-300 hover:bg-green-50"
                onClick={() => setActiveTab("completed")}
              >
                <div className="text-right">
                  <div className="font-semibold text-green-800">مكتملة</div>
                  <div className="text-sm text-green-600">تم إنجازها ({stats.completed})</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="ابحث في الاستشارات (الموضوع، رقم التذكرة...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="all">الكل ({stats.total})</TabsTrigger>
            <TabsTrigger value="pending">معلقة ({stats.pending})</TabsTrigger>
            <TabsTrigger value="assigned">معينة</TabsTrigger>
            <TabsTrigger value="in-progress">قيد المعالجة ({stats.inProgress})</TabsTrigger>
            <TabsTrigger value="completed">مكتملة ({stats.completed})</TabsTrigger>
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
                <p className="text-gray-500">
                  {searchQuery
                    ? "جرّب تغيير كلمات البحث أو الفلتر"
                    : "لم يتم تعيين أي استشارات لك بعد"}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredTickets.map((ticket) => {
              const StatusIcon = statusConfig[ticket.status]?.icon || Clock;
              const statusInfo = statusConfig[ticket.status] || statusConfig.pending;
              const priorityInfo = priorityConfig[ticket.priority || "medium"];

              // Check if SLA is approaching
              const slaDeadline = ticket.slaDeadline ? new Date(ticket.slaDeadline) : null;
              const now = new Date();
              const hoursUntilDeadline = slaDeadline
                ? (slaDeadline.getTime() - now.getTime()) / (1000 * 60 * 60)
                : null;
              const isSlaApproaching = hoursUntilDeadline !== null && hoursUntilDeadline < 24 && hoursUntilDeadline > 0;
              const isSlaOverdue = hoursUntilDeadline !== null && hoursUntilDeadline < 0;

              return (
                <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            {ticket.ticketNumber}
                          </Badge>
                          <Badge className={priorityInfo.color}>{priorityInfo.label}</Badge>
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="h-3 w-3 ml-1" />
                            {statusInfo.label}
                          </Badge>
                          {isSlaOverdue && (
                            <Badge className="bg-red-100 text-red-800">
                              <AlertCircle className="h-3 w-3 ml-1" />
                              متأخر عن الموعد
                            </Badge>
                          )}
                          {isSlaApproaching && (
                            <Badge className="bg-orange-100 text-orange-800">
                              <Clock className="h-3 w-3 ml-1" />
                              يقترب الموعد
                            </Badge>
                          )}
                          {ticket.rating && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Star className="h-3 w-3 ml-1 fill-yellow-600" />
                              {ticket.rating}/5
                            </Badge>
                          )}
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
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>عميل #{ticket.userId}</span>
                      </div>
                      {slaDeadline && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span className={isSlaOverdue ? "text-red-600 font-semibold" : ""}>
                            موعد الرد: {slaDeadline.toLocaleDateString("ar-SA")}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/consultation/${ticket.id}`}>
                        <Button variant="default" className="flex-1">
                          <MessageSquare className="h-4 w-4 ml-2" />
                          الرد على الاستشارة
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
