import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Send,
  Paperclip,
  Sparkles,
  CheckCircle2,
  Clock,
  Star,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Streamdown } from "streamdown";

export default function ConsultationChat() {
  const { id } = useParams<{ id: string }>();
  const bookingId = parseInt(id || "0");
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();

  const [message, setMessage] = useState("");
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const utils = trpc.useUtils();

  // Get booking details
  const { data: bookingData, isLoading: bookingLoading } =
    trpc.consulting.getTicket.useQuery(
      { ticketId: bookingId },
      { enabled: !!bookingId && isAuthenticated }
    );

  // Get messages
  const { data: messagesData, isLoading: messagesLoading } =
    trpc.consultant.getMessages.useQuery(
      { bookingId },
      {
        enabled: !!bookingId && isAuthenticated,
        refetchInterval: 3000, // Refresh every 3 seconds
      }
    );

  // Send message mutation
  const sendMessageMutation = trpc.consultant.sendMessage.useMutation({
    onSuccess: () => {
      setMessage("");
      utils.consultant.getMessages.invalidate({ bookingId });
      scrollToBottom();
    },
    onError: error => {
      toast.error("فشل إرسال الرسالة: " + error.message);
    },
  });

  // Get AI suggestion mutation
  const getAiSuggestionMutation = trpc.consultant.getAiSuggestion.useMutation({
    onSuccess: data => {
      setMessage(
        typeof data.suggestion === "string"
          ? data.suggestion
          : Array.isArray(data.suggestion)
            ? JSON.stringify(data.suggestion)
            : ""
      );
      toast.success("تم إنشاء الاقتراح بنجاح!");
      setIsLoadingAi(false);
    },
    onError: error => {
      toast.error("فشل إنشاء الاقتراح: " + error.message);
      setIsLoadingAi(false);
    },
  });

  // Update status mutation
  const updateStatusMutation =
    trpc.consultant.updateConsultationStatus.useMutation({
      onSuccess: () => {
        toast.success("تم تحديث الحالة بنجاح");
        utils.consulting.getTicket.invalidate({ ticketId: bookingId });
      },
      onError: error => {
        toast.error("فشل تحديث الحالة: " + error.message);
      },
    });

  // Rate consultation mutation
  const rateConsultationMutation = trpc.consultant.rateConsultation.useMutation(
    {
      onSuccess: () => {
        toast.success("شكراً لتقييمك!");
        setShowRating(false);
        navigate("/my-consultations");
      },
      onError: error => {
        toast.error("فشل إرسال التقييم: " + error.message);
      },
    }
  );

  const booking = bookingData?.ticket;
  const messages = messagesData?.messages || [];

  // Check if user is consultant
  const [isConsultant, setIsConsultant] = useState(false);
  useEffect(() => {
    if (user && booking) {
      // This is a simplified check - in production, verify with consultant table
      setIsConsultant(booking.consultantId === user.id);
    }
  }, [user, booking]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error("الرجاء كتابة رسالة");
      return;
    }

    sendMessageMutation.mutate({
      bookingId,
      message: message.trim(),
    });
  };

  const handleGetAiSuggestion = async () => {
    if (messages.length === 0) {
      toast.error("لا توجد رسائل للحصول على اقتراح");
      return;
    }

    setIsLoadingAi(true);

    // Get last client message
    const lastClientMessage = messages
      .filter(m => m.senderType === "client")
      .slice(-1)[0];

    if (!lastClientMessage) {
      toast.error("لا توجد رسالة من العميل");
      setIsLoadingAi(false);
      return;
    }

    // Build conversation history
    const conversationHistory = messages.slice(-10).map(m => ({
      role: m.senderType as "client" | "consultant",
      message: m.message,
    }));

    getAiSuggestionMutation.mutate({
      bookingId,
      clientMessage: lastClientMessage.message,
      conversationHistory,
    });
  };

  const handleUpdateStatus = (status: "in-progress" | "completed") => {
    updateStatusMutation.mutate({ bookingId, status });
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      toast.error("الرجاء اختيار تقييم");
      return;
    }

    rateConsultationMutation.mutate({
      bookingId,
      rating,
      comment: ratingComment,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              يجب تسجيل الدخول للوصول إلى هذه الصفحة
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (bookingLoading || messagesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              الاستشارة غير موجودة
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500",
    confirmed: "bg-blue-500",
    "in-progress": "bg-purple-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
  };

  const statusLabels: Record<string, string> = {
    pending: "قيد الانتظار",
    confirmed: "مؤكدة",
    "in-progress": "قيد التنفيذ",
    completed: "مكتملة",
    cancelled: "ملغاة",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  navigate(
                    isConsultant ? "/consultant/dashboard" : "/my-consultations"
                  )
                }
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">
                  استشارة #{booking.ticketNumber}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {booking.subject}
                </p>
              </div>
            </div>
            <Badge className={statusColors[booking.status || "pending"]}>
              {statusLabels[booking.status || "pending"]}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-[calc(100vh-200px)] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                  محادثة الاستشارة
                </CardTitle>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <h3 className="text-lg font-semibold mb-2">
                      ابدأ المحادثة
                    </h3>
                    <p className="text-muted-foreground">
                      {isConsultant
                        ? "قم بإرسال رسالة للعميل لبدء الاستشارة"
                        : "قم بإرسال رسالة للمستشار"}
                    </p>
                  </div>
                ) : (
                  messages.map(msg => {
                    const isMyMessage = msg.senderId === user?.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            isMyMessage
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold">
                              {msg.senderType === "consultant"
                                ? "المستشار"
                                : "العميل"}
                            </span>
                            {msg.isAiAssisted && (
                              <Sparkles className="h-3 w-3 text-yellow-500" />
                            )}
                          </div>
                          <Streamdown>{msg.message}</Streamdown>
                          <div className="text-xs opacity-70 mt-1">
                            {new Date(msg.createdAt).toLocaleTimeString(
                              "ar-SA",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input Area */}
              <div className="border-t p-4">
                {booking.status === "completed" &&
                !isConsultant &&
                !showRating ? (
                  <Button
                    className="w-full"
                    onClick={() => setShowRating(true)}
                  >
                    <Star className="mr-2 h-4 w-4" />
                    قيّم الاستشارة
                  </Button>
                ) : showRating ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        التقييم
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
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
                      </div>
                    </div>
                    <Textarea
                      placeholder="تعليقك (اختياري)"
                      value={ratingComment}
                      onChange={e => setRatingComment(e.target.value)}
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSubmitRating}
                        disabled={rateConsultationMutation.isPending}
                        className="flex-1"
                      >
                        {rateConsultationMutation.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                        )}
                        إرسال التقييم
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowRating(false)}
                      >
                        إلغاء
                      </Button>
                    </div>
                  </div>
                ) : booking.status !== "cancelled" ? (
                  <div className="space-y-2">
                    {isConsultant && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleGetAiSuggestion}
                        disabled={isLoadingAi || messages.length === 0}
                        className="w-full mb-2"
                      >
                        {isLoadingAi ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        مساعدة AI - اقتراح رد ذكي
                      </Button>
                    )}
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="اكتب رسالتك هنا..."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        rows={2}
                        className="flex-1"
                      />
                      <div className="flex flex-col gap-2">
                        <Button
                          size="icon"
                          onClick={handleSendMessage}
                          disabled={
                            sendMessageMutation.isPending || !message.trim()
                          }
                        >
                          {sendMessageMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-4">
                    الاستشارة ملغاة
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar - Booking Details */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">تفاصيل الاستشارة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    الموضوع
                  </label>
                  <p className="font-medium">{booking.subject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    الوصف
                  </label>
                  <p className="text-sm">{booking.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    تاريخ الإنشاء
                  </label>
                  <p className="text-sm">
                    {new Date(booking.createdAt).toLocaleDateString("ar-SA")}
                  </p>
                </div>
              </CardContent>
            </Card>

            {isConsultant &&
              booking.status !== "completed" &&
              booking.status !== "cancelled" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">إجراءات</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {booking.status === "pending" && (
                      <Button
                        className="w-full"
                        onClick={() => handleUpdateStatus("in-progress")}
                        disabled={updateStatusMutation.isPending}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        بدء الاستشارة
                      </Button>
                    )}
                    {booking.status === "in-progress" && (
                      <Button
                        className="w-full"
                        onClick={() => handleUpdateStatus("completed")}
                        disabled={updateStatusMutation.isPending}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        إنهاء الاستشارة
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
