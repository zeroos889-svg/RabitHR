export default function BrandPreview() {
  return (
    <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* الشعار */}
        <section className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">شعار رابِط</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* خلفية بيضاء */}
            <div className="text-center">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-12 mb-4">
                <img src="/rabit-logo.svg" alt="Rabit Logo" className="w-24 h-24 mx-auto" />
              </div>
              <p className="text-sm text-gray-600">على خلفية بيضاء</p>
            </div>
            
            {/* خلفية رمادية */}
            <div className="text-center">
              <div className="bg-gray-100 rounded-xl p-12 mb-4">
                <img src="/rabit-logo.svg" alt="Rabit Logo" className="w-24 h-24 mx-auto" />
              </div>
              <p className="text-sm text-gray-600">على خلفية رمادية</p>
            </div>
            
            {/* خلفية داكنة */}
            <div className="text-center">
              <div className="bg-gray-900 rounded-xl p-12 mb-4">
                <img src="/rabit-logo.svg" alt="Rabit Logo" className="w-24 h-24 mx-auto" />
              </div>
              <p className="text-sm text-gray-600">على خلفية داكنة</p>
            </div>
          </div>
          
          {/* أحجام مختلفة */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-semibold mb-6">الأحجام</h3>
            <div className="flex items-end justify-center gap-8">
              <div className="text-center">
                <img src="/rabit-logo.svg" alt="Small" className="w-8 h-8 mx-auto mb-2" />
                <p className="text-xs text-gray-500">صغير 32px</p>
              </div>
              <div className="text-center">
                <img src="/rabit-logo.svg" alt="Medium" className="w-12 h-12 mx-auto mb-2" />
                <p className="text-xs text-gray-500">متوسط 48px</p>
              </div>
              <div className="text-center">
                <img src="/rabit-logo.svg" alt="Large" className="w-16 h-16 mx-auto mb-2" />
                <p className="text-xs text-gray-500">كبير 64px</p>
              </div>
              <div className="text-center">
                <img src="/rabit-logo.svg" alt="XLarge" className="w-24 h-24 mx-auto mb-2" />
                <p className="text-xs text-gray-500">كبير جداً 96px</p>
              </div>
            </div>
          </div>
        </section>

        {/* نظام الألوان الرئيسي */}
        <section className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">نظام الألوان الرئيسي</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* اللون الأزرق */}
            <div className="space-y-4">
              <div className="h-32 rounded-xl flex items-center justify-center text-white font-bold text-xl" 
                   style={{ backgroundColor: '#3B82F6' }}>
                #3B82F6
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-800">الأزرق الأساسي</p>
                <p className="text-sm text-gray-600">Primary Blue</p>
              </div>
            </div>
            
            {/* اللون البنفسجي */}
            <div className="space-y-4">
              <div className="h-32 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                   style={{ backgroundColor: '#8B5CF6' }}>
                #8B5CF6
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-800">البنفسجي الأساسي</p>
                <p className="text-sm text-gray-600">Primary Purple</p>
              </div>
            </div>
          </div>
        </section>

        {/* التدرجات */}
        <section className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">التدرجات اللونية</h2>
          
          <div className="space-y-6">
            {/* التدرج الأساسي */}
            <div>
              <div className="h-32 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-xl mb-3">
                التدرج الأساسي
              </div>
              <p className="text-center text-gray-600">من #3B82F6 إلى #8B5CF6</p>
            </div>
            
            {/* التدرج الثانوي */}
            <div>
              <div className="h-32 rounded-xl gradient-secondary flex items-center justify-center text-white font-bold text-xl mb-3">
                التدرج الثانوي
              </div>
              <p className="text-center text-gray-600">من #8B5CF6 إلى #EC4899</p>
            </div>
          </div>
        </section>

        {/* ألوان الفئات */}
        <section className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">ألوان الفئات</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* الشركات */}
            <div>
              <div className="h-32 rounded-xl gradient-company flex items-center justify-center text-white font-bold text-xl mb-3">
                الشركات
              </div>
              <p className="text-center text-gray-600 text-sm">تدرج أزرق</p>
              <p className="text-center text-gray-500 text-xs">#3B82F6 → #2563EB</p>
            </div>
            
            {/* مستقل HR */}
            <div>
              <div className="h-32 rounded-xl gradient-individual flex items-center justify-center text-white font-bold text-xl mb-3">
                مستقل HR
              </div>
              <p className="text-center text-gray-600 text-sm">تدرج بنفسجي</p>
              <p className="text-center text-gray-500 text-xs">#8B5CF6 → #7C3AED</p>
            </div>
            
            {/* الموظفون */}
            <div>
              <div className="h-32 rounded-xl gradient-employee flex items-center justify-center text-white font-bold text-xl mb-3">
                الموظفون
              </div>
              <p className="text-center text-gray-600 text-sm">تدرج أخضر</p>
              <p className="text-center text-gray-500 text-xs">#10B981 → #059669</p>
            </div>
          </div>
        </section>

        {/* ألوان الحالات */}
        <section className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">ألوان الحالات</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="h-20 rounded-xl flex items-center justify-center text-white font-semibold"
                   style={{ backgroundColor: '#10B981' }}>
                نجاح
              </div>
              <p className="text-center text-gray-600 text-sm">#10B981</p>
            </div>
            
            <div className="space-y-3">
              <div className="h-20 rounded-xl flex items-center justify-center text-white font-semibold"
                   style={{ backgroundColor: '#F59E0B' }}>
                تحذير
              </div>
              <p className="text-center text-gray-600 text-sm">#F59E0B</p>
            </div>
            
            <div className="space-y-3">
              <div className="h-20 rounded-xl flex items-center justify-center text-white font-semibold"
                   style={{ backgroundColor: '#EF4444' }}>
                خطأ
              </div>
              <p className="text-center text-gray-600 text-sm">#EF4444</p>
            </div>
          </div>
        </section>

        {/* أمثلة على الاستخدام */}
        <section className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">أمثلة على الاستخدام</h2>
          
          <div className="space-y-6">
            {/* بطاقة بتدرج */}
            <div className="gradient-primary rounded-xl p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <img src="/rabit-logo.svg" alt="Logo" className="w-12 h-12" />
                <div>
                  <h3 className="text-2xl font-bold">رابِط</h3>
                  <p className="text-blue-100">مساعدك الذكي في إدارة الموارد البشرية</p>
                </div>
              </div>
              <p className="text-blue-50">
                منصة شاملة مدعومة بالذكاء الاصطناعي لإدارة الموارد البشرية، متوافقة 100% مع نظام العمل السعودي
              </p>
            </div>
            
            {/* أزرار */}
            <div className="flex flex-wrap gap-4">
              <button className="gradient-primary text-white px-6 py-3 rounded-lg font-semibold hover-lift">
                ابدأ مجاناً
              </button>
              <button className="gradient-company text-white px-6 py-3 rounded-lg font-semibold hover-lift">
                للشركات
              </button>
              <button className="gradient-individual text-white px-6 py-3 rounded-lg font-semibold hover-lift">
                لمستقلي HR
              </button>
              <button className="gradient-employee text-white px-6 py-3 rounded-lg font-semibold hover-lift">
                للموظفين
              </button>
            </div>
            
            {/* نص بتدرج */}
            <div className="text-center">
              <h3 className="text-4xl font-bold text-gradient-primary mb-2">
                رابِط
              </h3>
              <p className="text-gray-600">نص بتدرج لوني</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
