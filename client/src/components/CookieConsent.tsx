import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';
import { Link } from 'wouter';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after 1 second
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t-2 border-purple-500 shadow-2xl animate-in slide-in-from-bottom duration-500">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-1">🍪 نستخدم ملفات تعريف الارتباط (Cookies)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا، وتحليل حركة المرور، وتخصيص المحتوى.
                باستخدامك لهذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط وفقاً لـ
                {' '}
                <Link href="/cookies" className="text-purple-600 hover:underline font-medium">
                  سياسة ملفات تعريف الارتباط
                </Link>
                {' '}و{' '}
                <Link href="/privacy" className="text-purple-600 hover:underline font-medium">
                  سياسة الخصوصية
                </Link>
                .
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
              className="min-w-[100px]"
            >
              رفض
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="min-w-[100px] bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
            >
              قبول
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReject}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
