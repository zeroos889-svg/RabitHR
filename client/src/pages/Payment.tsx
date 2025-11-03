import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface PaymentProps {
  planName: string;
  price: number;
  currency?: string;
  onSuccess?: () => void;
}

export default function Payment({ planName, price, currency = 'SAR', onSuccess }: PaymentProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // محاكاة معالجة الدفع
      await new Promise(resolve => setTimeout(resolve, 2000));

      // في الإنتاج، سيتم ربط Moyasar أو Tap Payments هنا
      setSuccess(true);

      // استدعاء callback عند النجاح
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (err) {
      setError('حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">تم الدفع بنجاح!</h1>
          <p className="text-muted-foreground mb-4">
            شكراً لاختيارك {planName}. سيتم تفعيل حسابك قريباً.
          </p>
          <p className="text-sm text-muted-foreground">
            سيتم إعادة توجيهك إلى لوحة التحكم...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* ملخص الطلب */}
        <Card className="mb-6 p-6">
          <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">الباقة:</span>
              <span className="font-semibold">{planName}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>الإجمالي:</span>
              <span className="text-primary">
                {price} {currency}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            * هذه نسخة تجريبية. لا يتم خصم أي مبالغ فعلية.
          </p>
        </Card>

        {/* نموذج الدفع */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">بيانات الدفع</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handlePayment} className="space-y-4">
            {/* اسم المالك */}
            <div>
              <label className="block text-sm font-medium mb-2">اسم المالك</label>
              <Input
                type="text"
                name="cardName"
                placeholder="أحمد محمد"
                value={cardData.cardName}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>

            {/* رقم البطاقة */}
            <div>
              <label className="block text-sm font-medium mb-2">رقم البطاقة</label>
              <Input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardData.cardNumber}
                onChange={handleInputChange}
                maxLength={19}
                required
                disabled={loading}
              />
            </div>

            {/* تاريخ الانتهاء و CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">انتهاء الصلاحية</label>
                <Input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={cardData.expiryDate}
                  onChange={handleInputChange}
                  maxLength={5}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CVV</label>
                <Input
                  type="text"
                  name="cvv"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={handleInputChange}
                  maxLength={4}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* زر الدفع */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  جاري المعالجة...
                </>
              ) : (
                `ادفع الآن ${price} ${currency}`
              )}
            </Button>

            {/* رسالة أمان */}
            <p className="text-xs text-center text-muted-foreground">
              ✓ معاملتك آمنة وموثوقة
            </p>
          </form>
        </Card>

        {/* معلومات إضافية */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>هل لديك أسئلة؟</p>
          <a href="/contact" className="text-primary hover:underline">
            تواصل معنا
          </a>
        </div>
      </div>
    </div>
  );
}
