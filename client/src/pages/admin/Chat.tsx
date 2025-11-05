import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  Send,
  CheckCircle2,
  Clock,
  User,
  Mail,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function AdminChat() {
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [message, setMessage] = useState("");

  // جلب جميع المحادثات
  const { data: conversations = [], refetch: refetchConversations } =
    trpc.chat.getAllConversations.useQuery(undefined, {
      refetchInterval: 5000, // تحديث كل 5 ثواني
    });

  // جلب رسائل المحادثة المحددة
  const { data: messages = [], refetch: refetchMessages } =
    trpc.chat.getMessages.useQuery(
      { conversationId: selectedConversationId! },
      {
        enabled: !!selectedConversationId,
        refetchInterval: 3000, // تحديث كل 3 ثواني
      }
    );

  // إرسال رسالة
  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: () => {
      setMessage("");
      refetchMessages();
      refetchConversations();
    },
    onError: () => {
      toast.error("فشل إرسال الرسالة");
    },
  });

  // تحديث حالة المحادثة
  const updateStatusMutation = trpc.chat.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث حالة المحادثة");
      refetchConversations();
    },
    onError: () => {
      toast.error("فشل تحديث الحالة");
    },
  });

  const handleSendMessage = () => {
    if (!message.trim() || !selectedConversationId) return;

    sendMessageMutation.mutate({
      conversationId: selectedConversationId,
      message: message.trim(),
    });
  };

  const handleCloseConversation = (id: number) => {
    updateStatusMutation.mutate({
      id,
      status: "closed",
    });
  };

  const handleReopenConversation = (id: number) => {
    updateStatusMutation.mutate({
      id,
      status: "open",
    });
  };

  const selectedConversation = conversations.find(
    c => c.id === selectedConversationId
  );
  const openConversations = conversations.filter(c => c.status === "open");
  const closedConversations = conversations.filter(c => c.status === "closed");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">الدردشة المباشرة</h1>
        <p className="text-muted-foreground">
          إدارة محادثات الزوار والرد عليهم
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              المحادثات المفتوحة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{openConversations.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              المحادثات المغلقة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {closedConversations.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              إجمالي المحادثات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{conversations.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <div className="grid md:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              المحادثات
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {conversations.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  لا توجد محادثات
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {conversations.map(conversation => (
                    <button
                      key={conversation.id}
                      onClick={() => setSelectedConversationId(conversation.id)}
                      className={`w-full text-right p-3 rounded-lg transition-colors ${
                        selectedConversationId === conversation.id
                          ? "bg-primary/10 border-2 border-primary"
                          : "hover:bg-gray-100 border-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm">
                            {conversation.visitorName?.[0] || "ز"}
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {conversation.visitorName || "زائر"}
                            </p>
                            {conversation.visitorEmail && (
                              <p className="text-xs text-muted-foreground">
                                {conversation.visitorEmail}
                              </p>
                            )}
                          </div>
                        </div>
                        <Badge
                          variant={
                            conversation.status === "open"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {conversation.status === "open" ? "مفتوحة" : "مغلقة"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(conversation.lastMessageAt).toLocaleString(
                          "ar-SA"
                        )}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="md:col-span-2">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                      {selectedConversation.visitorName?.[0] || "ز"}
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {selectedConversation.visitorName || "زائر"}
                      </CardTitle>
                      {selectedConversation.visitorEmail && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {selectedConversation.visitorEmail}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedConversation.status === "open" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleCloseConversation(selectedConversation.id)
                        }
                      >
                        <CheckCircle2 className="h-4 w-4 ml-2" />
                        إغلاق المحادثة
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleReopenConversation(selectedConversation.id)
                        }
                      >
                        <Clock className="h-4 w-4 ml-2" />
                        إعادة فتح
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      لا توجد رسائل
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.senderType === "admin"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg px-4 py-2 ${
                              msg.senderType === "admin"
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">
                              {msg.message}
                            </p>
                            <p
                              className={`text-xs mt-1 ${
                                msg.senderType === "admin"
                                  ? "text-white/80"
                                  : "text-gray-500"
                              }`}
                            >
                              {new Date(msg.createdAt).toLocaleTimeString(
                                "ar-SA",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>

                {selectedConversation.status === "open" && (
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="اكتب ردك..."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyPress={e => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        disabled={sendMessageMutation.isPending}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={
                          !message.trim() || sendMessageMutation.isPending
                        }
                        className="gradient-primary"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>اختر محادثة للبدء</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
