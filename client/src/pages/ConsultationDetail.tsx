import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useRoute, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  User,
  Send,
  Star,
  ArrowRight,
  Package,
  AlertCircle,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

export default function ConsultationDetail() {
  const [, params] = useRoute("/consultation/:id");
  const ticketId = params?.id ? parseInt(params.id) : 0;

  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch ticket details
  const {
    data: ticketData,
    isLoading: ticketLoading,
    error: ticketError,
    refetch: refetchTicket,
  } = trpc.consulting.getTicket.useQuery(
    { ticketId },
    { enabled: ticketId > 0 }
  );

  // Fetch responses
  const {
    data: responsesData,
    isLoading: responsesLoading,
    refetch: refetchResponses,
  } = trpc.consulting.getTicketResponses.useQuery(
    { ticketId },
    { enabled: ticketId > 0, refetchInterval: 5000 }
  );

  const ticket = ticketData?.ticket;
  const responses = responsesData?.responses || [];

  // Mutations
  const uploadFileMutation = trpc.consulting.uploadFile.useMutation();

  const addResponseMutation = trpc.consulting.addResponse.useMutation({
    onSuccess: () => {
      toast.success("تم إرسال الرسالة بنجاح");
      setMessage("");
      refetchResponses();
    },
    onError: error => {
      toast.error("فشل إرسال الرسالة: " + error.message);
    },
  });

  const rateTicketMutation = trpc.consulting.rateTicket.useMutation({
    onSuccess: () => {
      toast.success("تم تقييم الاستشارة بنجاح");
      refetchTicket();
    },
    onError: error => {
      toast.error("فشل التقييم: " + error.message);
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [responses]);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Validate file types
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const invalidFiles = files.filter(f => !validTypes.includes(f.type));

    if (invalidFiles.length > 0) {
      toast.error("نوع الملف غير مدعوم. الرجاء اختيار صور أو مستندات فقط");
      return;
    }

    // Validate file size (10MB max)
    const oversizedFiles = files.filter(f => f.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error("حجم الملف يجب أن لا يتجاوز 10 ميجابايت");
      return;
    }

    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (): Promise<string[]> => {
    if (selectedFiles.length === 0) return [];

    setUploadingFiles(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of selectedFiles) {
        const reader = new FileReader();
        const fileData = await new Promise<string>(resolve => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        const result = await uploadFileMutation.mutateAsync({
          fileName: file.name,
          fileType: file.type,
          fileData,
        });

        uploadedUrls.push(result.url);
      }

      return uploadedUrls;
    } catch (error) {
      toast.error("فشل رفع الملفات");
      throw error;
    } finally {
      setUploadingFiles(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() && selectedFiles.length === 0) {
      toast.error("الرجاء كتابة رسالة أو إرفاق ملف");
      return;
    }

    try {
      // Upload files first
      const uploadedUrls = await uploadFiles();

      // Send message with attachments
      await addResponseMutation.mutateAsync({
        ticketId,
        message: message.trim() || "(ملف مرفق)",
        attachments:
          uploadedUrls.length > 0 ? JSON.stringify(uploadedUrls) : undefined,
      });

      // Clear form
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      // Error already handled in mutations
    }
  };

  const handleRating = () => {
    if (rating === 0) {
      toast.error("الرجاء اختيار تقييم");
      return;
    }

    rateTicketMutation.mutate({
      ticketId,
      rating,
      feedback: feedback.trim() || undefined,
    });
  };

  // Status configurations
  const statusConfig: Record<
    string,
    { label: string; color: string; icon: any }
  > = {
    pending: {
      label: "معلقة",
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
    },
    assigned: {
      label: "معينة",
      color: "bg-blue-100 text-blue-800",
      icon: User,
    },
    "in-progress": {
      label: "قيد المعالجة",
      color: "bg-purple-100 text-purple-800",
      icon: MessageSquare,
    },
    completed: {
      label: "مكتملة",
      color: "bg-green-100 text-green-800",
      icon: CheckCircle2,
    },
    cancelled: {
      label: "ملغاة",
      color: "bg-red-100 text-red-800",
      icon: XCircle,
    },
  };

  const priorityConfig: Record<string, { label: string; color: string }> = {
    low: { label: "منخفضة", color: "bg-gray-100 text-gray-800" },
    medium: { label: "متوسطة", color: "bg-blue-100 text-blue-800" },
    high: { label: "عالية", color: "bg-orange-100 text-orange-800" },
    urgent: { label: "عاجلة", color: "bg-red-100 text-red-800" },
  };

  if (ticketLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل تفاصيل الاستشارة...</p>
          </div>
        </div>
      </div>
    );
  }

  if (ticketError || !ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="text-center text-red-600">
                <XCircle className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg font-semibold">
                  لم يتم العثور على الاستشارة
                </p>
                <p className="text-sm mt-2">
                  الاستشارة المطلوبة غير موجودة أو تم حذفها
                </p>
                <Link href="/my-consultations">
                  <Button className="mt-4" variant="outline">
                    العودة إلى استشاراتي
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const StatusIcon = statusConfig[ticket.status || "pending"]?.icon || Clock;
  const statusInfo =
    statusConfig[ticket.status || "pending"] || statusConfig.pending;
  const priorityInfo = priorityConfig[ticket.priority || "medium"];

  const isCompleted = ticket.status === "completed";
  const canRate = isCompleted && !ticket.rating;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/my-consultations">
          <Button variant="ghost" className="mb-6">
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة إلى استشاراتي
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ticket Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {ticket.ticketNumber}
                      </Badge>
                      <Badge className={priorityInfo.color}>
                        {priorityInfo.label}
                      </Badge>
                      <Badge className={statusInfo.color}>
                        <StatusIcon className="h-3 w-3 ml-1" />
                        {statusInfo.label}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">{ticket.subject}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-base">
                  {ticket.description}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* SLA Alert */}
            {ticket.slaDeadline &&
              new Date(ticket.slaDeadline) > new Date() && (
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>موعد الرد المتوقع:</strong>{" "}
                    {new Date(ticket.slaDeadline).toLocaleDateString("ar-SA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </AlertDescription>
                </Alert>
              )}

            {/* Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  المحادثة ({responses.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto">
                  {responses.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-30" />
                      <p>لا توجد ردود بعد</p>
                      <p className="text-sm">
                        سيتم الرد على استشارتك في أقرب وقت
                      </p>
                    </div>
                  ) : (
                    responses.map(response => {
                      const isConsultant = response.userId !== ticket.userId;
                      return (
                        <div
                          key={response.id}
                          className={`flex ${isConsultant ? "justify-start" : "justify-end"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-4 ${
                              isConsultant
                                ? "bg-white border border-gray-200"
                                : "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <User className="h-4 w-4" />
                              <span className="text-sm font-semibold">
                                {isConsultant ? "المستشار" : "أنت"}
                              </span>
                              <span
                                className={`text-xs ${isConsultant ? "text-gray-500" : "text-purple-100"}`}
                              >
                                {new Date(
                                  response.createdAt
                                ).toLocaleDateString("ar-SA", {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <p className="whitespace-pre-wrap">
                              {response.message}
                            </p>

                            {/* Display attachments */}
                            {response.attachments &&
                              (() => {
                                try {
                                  const urls = JSON.parse(response.attachments);
                                  return (
                                    <div className="mt-3 space-y-2">
                                      {urls.map((url: string, idx: number) => {
                                        const isImage =
                                          /\.(jpg|jpeg|png|gif)$/i.test(url);
                                        return (
                                          <div key={idx}>
                                            {isImage ? (
                                              <a
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                <img
                                                  src={url}
                                                  alt="مرفق"
                                                  className="max-w-full rounded-lg max-h-64 object-contain cursor-pointer hover:opacity-90 transition-opacity"
                                                />
                                              </a>
                                            ) : (
                                              <a
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center gap-2 p-2 rounded ${isConsultant ? "bg-gray-50 hover:bg-gray-100" : "bg-white/20 hover:bg-white/30"} transition-colors`}
                                              >
                                                <FileText className="h-4 w-4" />
                                                <span className="text-sm">
                                                  مستند مرفق
                                                </span>
                                              </a>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  );
                                } catch {
                                  return null;
                                }
                              })()}
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <Separator className="my-4" />

                {/* Send Message Form */}
                {!isCompleted && ticket.status !== "cancelled" ? (
                  <div className="space-y-3">
                    <Textarea
                      placeholder="اكتب رسالتك هنا..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />

                    {/* File attachments */}
                    {selectedFiles.length > 0 && (
                      <div className="space-y-2">
                        {selectedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-700">
                                {file.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({(file.size / 1024).toFixed(1)} KB)
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="h-6 w-6 p-0"
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*,.pdf,.doc,.docx"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={
                              uploadingFiles || addResponseMutation.isPending
                            }
                            asChild
                          >
                            <span className="cursor-pointer">
                              <FileText className="h-4 w-4 ml-2" />
                              إرفاق ملف
                            </span>
                          </Button>
                        </label>
                      </div>
                      <Button
                        onClick={handleSendMessage}
                        disabled={
                          addResponseMutation.isPending ||
                          uploadingFiles ||
                          (!message.trim() && selectedFiles.length === 0)
                        }
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        {addResponseMutation.isPending || uploadingFiles ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2" />
                            {uploadingFiles
                              ? "جاري الرفع..."
                              : "جاري الإرسال..."}
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 ml-2" />
                            إرسال
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {ticket.status === "completed"
                        ? "تم إغلاق هذه الاستشارة. لا يمكن إضافة ردود جديدة."
                        : "تم إلغاء هذه الاستشارة."}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Rating Section */}
            {canRate && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    قيّم الاستشارة
                  </CardTitle>
                  <CardDescription>
                    ساعدنا في تحسين خدماتنا بتقييمك
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="text-sm text-gray-600 mr-2">
                        ({rating}/5)
                      </span>
                    )}
                  </div>
                  <Textarea
                    placeholder="أخبرنا عن تجربتك (اختياري)"
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    rows={3}
                  />
                  <Button
                    onClick={handleRating}
                    disabled={rating === 0 || rateTicketMutation.isPending}
                    className="w-full bg-yellow-600 hover:bg-yellow-700"
                  >
                    {rateTicketMutation.isPending
                      ? "جاري الإرسال..."
                      : "إرسال التقييم"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Already Rated */}
            {ticket.rating && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-900">
                        تم تقييم الاستشارة
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= ticket.rating!
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 mr-2">
                          ({ticket.rating}/5)
                        </span>
                      </div>
                      {(ticket as any).ratingFeedback && (
                        <p className="text-sm text-gray-700 mt-2">
                          {(ticket as any).ratingFeedback}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">معلومات الاستشارة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      تاريخ الإنشاء
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(ticket.createdAt).toLocaleDateString("ar-SA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {(ticket as any).assignedConsultantId && (
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        المستشار المعين
                      </p>
                      <p className="text-sm text-gray-600">معين</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">الباقة</p>
                    <p className="text-sm text-gray-600">باقة استشارية</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      عدد الردود
                    </p>
                    <p className="text-sm text-gray-600">
                      {responses.length} رد
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">
                  هل تحتاج مساعدة؟
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-800 mb-4">
                  إذا كان لديك أي استفسار أو مشكلة، يمكنك التواصل معنا
                </p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    تواصل معنا
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
