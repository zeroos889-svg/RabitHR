import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';
import { toast } from 'sonner';

interface Message {
  id: number;
  senderType: 'visitor' | 'admin';
  senderName: string | null;
  message: string;
  createdAt: Date;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { user } = useAuth();

  // جلب المحادثة الحالية
  const { data: existingConversation } = trpc.chat.getMyConversation.useQuery(
    undefined,
    { enabled: !!user }
  );

  // جلب الرسائل
  const { data: messages = [], refetch: refetchMessages } = trpc.chat.getMessages.useQuery(
    { conversationId: conversationId! },
    { enabled: !!conversationId, refetchInterval: 3000 } // تحديث كل 3 ثواني
  );

  // إنشاء محادثة
  const createConversation = trpc.chat.createConversation.useMutation({
    onSuccess: (data) => {
      setConversationId(data.conversationId);
      setShowWelcome(false);
    },
    onError: () => {
      toast.error('فشل بدء المحادثة');
    },
  });

  // إرسال رسالة
  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: () => {
      setMessage('');
      refetchMessages();
    },
    onError: () => {
      toast.error('فشل إرسال الرسالة');
    },
  });

  // التمرير التلقائي للأسفل
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // تحميل المحادثة الموجودة
  useEffect(() => {
    if (existingConversation) {
      setConversationId(existingConversation.id);
      setShowWelcome(false);
    }
  }, [existingConversation]);

  const handleStartChat = () => {
    if (!user && (!visitorName || !visitorEmail)) {
      toast.error('الرجاء إدخال الاسم والبريد الإلكتروني');
      return;
    }

    createConversation.mutate({
      visitorName: user ? undefined : visitorName,
      visitorEmail: user ? undefined : visitorEmail,
    });
  };

  const handleSendMessage = () => {
    if (!message.trim() || !conversationId) return;

    sendMessageMutation.mutate({
      conversationId,
      message: message.trim(),
      senderName: user?.name || visitorName,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showWelcome) {
        handleStartChat();
      } else {
        handleSendMessage();
      }
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="فتح الدردشة"
      >
        <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full animate-pulse" />
      </button>
    );
  }

  return (
    <Card className={`fixed bottom-6 left-6 z-50 w-96 shadow-2xl transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-[600px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">الدعم الفوري</h3>
            <p className="text-xs opacity-90">نحن هنا لمساعدتك</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white/20 p-1.5 rounded transition-colors"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-1.5 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Welcome Screen */}
          {showWelcome ? (
            <div className="p-6 space-y-4">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">مرحباً بك!</h4>
                <p className="text-sm text-muted-foreground">
                  كيف يمكننا مساعدتك اليوم؟
                </p>
              </div>

              {!user && (
                <div className="space-y-3">
                  <Input
                    placeholder="الاسم"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={visitorEmail}
                    onChange={(e) => setVisitorEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              )}

              <Button
                onClick={handleStartChat}
                className="w-full gradient-primary"
                disabled={createConversation.isPending}
              >
                {createConversation.isPending ? 'جاري البدء...' : 'بدء المحادثة'}
              </Button>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(600px-140px)]">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground text-sm py-8">
                    ابدأ المحادثة بإرسال رسالة
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.senderType === 'admin' ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          msg.senderType === 'admin'
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                        <p className={`text-xs mt-1 ${
                          msg.senderType === 'admin' ? 'text-gray-500' : 'text-white/80'
                        }`}>
                          {new Date(msg.createdAt).toLocaleTimeString('ar-SA', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="اكتب رسالتك..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={sendMessageMutation.isPending}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || sendMessageMutation.isPending}
                    className="gradient-primary"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </Card>
  );
}
