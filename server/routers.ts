import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // End of Service Calculator
  eosb: router({
    generatePDF: publicProcedure
      .input(z.object({
        salary: z.number(),
        startDate: z.string(),
        endDate: z.string(),
        contractType: z.string(),
        terminationReason: z.string(),
        result: z.object({
          totalAmount: z.number(),
          firstFiveYears: z.number(),
          afterFiveYears: z.number(),
          percentage: z.number(),
          yearsCount: z.number(),
          monthsCount: z.number(),
          daysCount: z.number(),
        }),
      }))
      .mutation(async ({ input }) => {
        // Generate PDF using a library
        // For now, return a mock URL
        const pdfContent = generateEOSBPDF(input);
        return {
          success: true,
          pdfUrl: '/api/download/eosb-report.pdf',
          pdfContent,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;

// Helper function to generate PDF content
function generateEOSBPDF(data: any): string {
  const contractTypeAr = data.contractType === 'unlimited' ? 'عقد غير محدد المدة' : 'عقد محدد المدة';
  
  const terminationReasonMap: Record<string, string> = {
    'contract_end': 'انتهاء مدة العقد',
    'resignation': 'استقالة العامل',
    'resignation_before_end': 'استقالة قبل انتهاء العقد',
    'employer_termination': 'إنهاء من صاحب العمل',
    'retirement': 'بلوغ سن التقاعد',
    'disability': 'العجز الكلي/الجزئي',
    'death': 'الوفاة',
    'force_majeure': 'القوة القاهرة',
    'marriage': 'زواج (للمرأة)',
    'maternity': 'ولادة (للمرأة)',
    'disciplinary': 'فصل تأديبي',
    'disciplinary_severe': 'فصل تأديبي جسيم',
  };
  
  const terminationReasonAr = terminationReasonMap[data.terminationReason] || data.terminationReason;
  
  return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Cairo', sans-serif;
      line-height: 1.6;
      color: #333;
      background: #fff;
      padding: 40px;
    }
    
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid #3B82F6;
    }
    
    .logo {
      font-size: 32px;
      font-weight: 700;
      background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    
    .title {
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 5px;
    }
    
    .subtitle {
      font-size: 14px;
      color: #64748b;
    }
    
    .section {
      margin-bottom: 30px;
    }
    
    .section-title {
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e2e8f0;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-bottom: 20px;
    }
    
    .info-item {
      background: #f8fafc;
      padding: 15px;
      border-radius: 8px;
      border-right: 4px solid #3B82F6;
    }
    
    .info-label {
      font-size: 12px;
      color: #64748b;
      margin-bottom: 5px;
    }
    
    .info-value {
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
    }
    
    .result-box {
      background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      margin: 30px 0;
    }
    
    .result-label {
      font-size: 14px;
      opacity: 0.9;
      margin-bottom: 10px;
    }
    
    .result-amount {
      font-size: 42px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    
    .result-percentage {
      font-size: 14px;
      background: rgba(255,255,255,0.2);
      display: inline-block;
      padding: 5px 15px;
      border-radius: 20px;
    }
    
    .breakdown {
      background: #f8fafc;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    
    .breakdown-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .breakdown-item:last-child {
      border-bottom: none;
      font-weight: 700;
      color: #3B82F6;
    }
    
    .legal-note {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-right: 4px solid #3B82F6;
      padding: 20px;
      border-radius: 8px;
      margin: 30px 0;
    }
    
    .legal-note-title {
      font-weight: 700;
      color: #1e40af;
      margin-bottom: 10px;
    }
    
    .legal-note-text {
      font-size: 13px;
      color: #1e40af;
      line-height: 1.8;
    }
    
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 12px;
    }
    
    .footer-logo {
      font-size: 18px;
      font-weight: 700;
      background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    
    @media print {
      body {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">رابِط</div>
    <div class="title">تقرير حساب مكافأة نهاية الخدمة</div>
    <div class="subtitle">وفقاً للمادة 84 من نظام العمل السعودي</div>
  </div>

  <div class="section">
    <div class="section-title">معلومات الموظف</div>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">الراتب الأساسي الأخير</div>
        <div class="info-value">${data.salary.toLocaleString('ar-SA')} ﷼</div>
      </div>
      <div class="info-item">
        <div class="info-label">نوع العقد</div>
        <div class="info-value">${contractTypeAr}</div>
      </div>
      <div class="info-item">
        <div class="info-label">تاريخ المباشرة</div>
        <div class="info-value">${new Date(data.startDate).toLocaleDateString('ar-SA')}</div>
      </div>
      <div class="info-item">
        <div class="info-label">آخر يوم عمل</div>
        <div class="info-value">${new Date(data.endDate).toLocaleDateString('ar-SA')}</div>
      </div>
      <div class="info-item">
        <div class="info-label">مدة الخدمة</div>
        <div class="info-value">${data.result.yearsCount} سنة، ${data.result.monthsCount} شهر، ${data.result.daysCount} يوم</div>
      </div>
      <div class="info-item">
        <div class="info-label">سبب انتهاء الخدمة</div>
        <div class="info-value">${terminationReasonAr}</div>
      </div>
    </div>
  </div>

  <div class="result-box">
    <div class="result-label">المبلغ الإجمالي المستحق</div>
    <div class="result-amount">${data.result.totalAmount.toLocaleString('ar-SA')} ﷼</div>
    ${data.result.percentage < 100 ? `<div class="result-percentage">${data.result.percentage}% من المكافأة الكاملة</div>` : ''}
  </div>

  <div class="section">
    <div class="section-title">تفاصيل الحساب</div>
    <div class="breakdown">
      <div class="breakdown-item">
        <span>السنوات الخمس الأولى (نصف شهر لكل سنة)</span>
        <span>${data.result.firstFiveYears.toLocaleString('ar-SA')} ﷼</span>
      </div>
      ${data.result.afterFiveYears > 0 ? `
      <div class="breakdown-item">
        <span>ما بعد السنوات الخمس (شهر كامل لكل سنة)</span>
        <span>${data.result.afterFiveYears.toLocaleString('ar-SA')} ﷼</span>
      </div>
      ` : ''}
      <div class="breakdown-item">
        <span>المجموع النهائي</span>
        <span>${data.result.totalAmount.toLocaleString('ar-SA')} ﷼</span>
      </div>
    </div>
  </div>

  <div class="legal-note">
    <div class="legal-note-title">المرجع القانوني - المادة 84 من نظام العمل السعودي</div>
    <div class="legal-note-text">
      "إذا انتهت علاقة العمل وجب على صاحب العمل أن يدفع إلى العامل مكافأة عن مدة خدمته تحسب على أساس أجر نصف شهر عن كل سنة من السنوات الخمس الأولى، وأجر شهر عن كل سنة من السنوات التالية، ويتخذ الأجر الأخير أساساً لحساب المكافأة."
    </div>
  </div>

  <div class="legal-note">
    <div class="legal-note-title">ملاحظة مهمة</div>
    <div class="legal-note-text">
      هذا التقرير تم إنشاؤه تلقائياً بواسطة منصة رابِط وفقاً للمادة 84 من نظام العمل السعودي. النتائج تقريبية ويُنصح بمراجعة قسم الموارد البشرية أو مستشار قانوني للتأكيد النهائي. تاريخ الإصدار: ${new Date().toLocaleDateString('ar-SA')}
    </div>
  </div>

  <div class="footer">
    <div class="footer-logo">رابِط - مساعد الموارد البشرية السعودي</div>
    <div>مدعوم بالذكاء الاصطناعي | متوافق 100% مع نظام العمل السعودي</div>
    <div style="margin-top: 10px;">للمزيد من المعلومات: rabit.sa | الدعم الفني: support@rabit.sa</div>
  </div>
</body>
</html>
  `;
}
