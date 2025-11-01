import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";

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

  // End of Service Benefit Calculator
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
        const { salary, startDate, endDate, contractType, terminationReason, result } = input;
        
        const contractTypeLabels: Record<string, string> = {
          'fixed': 'محدد المدة',
          'unlimited': 'غير محدد المدة',
        };
        
        const terminationReasonLabels: Record<string, string> = {
          'resignation': 'استقالة العامل',
          'dismissal': 'فصل من صاحب العمل',
          'contract_end': 'انتهاء العقد',
          'mutual': 'اتفاق الطرفين',
          'retirement': 'التقاعد',
        };

        const pdfContent = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <title>تقرير حساب مكافأة نهاية الخدمة</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
    
    body {
      font-family: 'Cairo', sans-serif;
      direction: rtl;
      padding: 40px;
      background: #f8f9fa;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid #3B82F6;
    }
    
    .logo {
      width: 120px;
      margin-bottom: 20px;
    }
    
    h1 {
      color: #1e293b;
      font-size: 28px;
      margin: 0;
    }
    
    .section {
      margin: 30px 0;
      padding: 20px;
      background: #f8fafc;
      border-radius: 8px;
    }
    
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #3B82F6;
      margin-bottom: 15px;
    }
    
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .info-label {
      font-weight: 600;
      color: #64748b;
    }
    
    .info-value {
      font-weight: 700;
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
    
    .result-amount {
      font-size: 48px;
      font-weight: 700;
      margin: 10px 0;
    }
    
    .legal-note {
      background: #eff6ff;
      border-right: 4px solid #3B82F6;
      padding: 20px;
      margin: 30px 0;
      border-radius: 8px;
    }
    
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      color: #64748b;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>تقرير حساب مكافأة نهاية الخدمة</h1>
      <p style="color: #64748b; margin-top: 10px;">وفقاً للمادة 84 من نظام العمل السعودي</p>
    </div>

    <div class="section">
      <div class="section-title">البيانات المدخلة</div>
      <div class="info-row">
        <span class="info-label">الراتب الأساسي:</span>
        <span class="info-value">${salary.toLocaleString('ar-SA')} ﷼</span>
      </div>
      <div class="info-row">
        <span class="info-label">تاريخ المباشرة:</span>
        <span class="info-value">${new Date(startDate).toLocaleDateString('ar-SA')}</span>
      </div>
      <div class="info-row">
        <span class="info-label">آخر يوم عمل:</span>
        <span class="info-value">${new Date(endDate).toLocaleDateString('ar-SA')}</span>
      </div>
      <div class="info-row">
        <span class="info-label">نوع العقد:</span>
        <span class="info-value">${contractTypeLabels[contractType] || contractType}</span>
      </div>
      <div class="info-row">
        <span class="info-label">سبب انتهاء الخدمة:</span>
        <span class="info-value">${terminationReasonLabels[terminationReason] || terminationReason}</span>
      </div>
      <div class="info-row">
        <span class="info-label">مدة الخدمة:</span>
        <span class="info-value">${result.yearsCount} سنة، ${result.monthsCount} شهر، ${result.daysCount} يوم</span>
      </div>
    </div>

    <div class="result-box">
      <div style="font-size: 20px; opacity: 0.9;">إجمالي مكافأة نهاية الخدمة</div>
      <div class="result-amount">${result.totalAmount.toLocaleString('ar-SA')} ﷼</div>
      <div style="font-size: 16px; opacity: 0.9; margin-top: 10px;">
        (${result.percentage}% من الراتب × مدة الخدمة)
      </div>
    </div>

    <div class="section">
      <div class="section-title">تفاصيل الحساب</div>
      <div class="info-row">
        <span class="info-label">الخمس سنوات الأولى:</span>
        <span class="info-value">${result.firstFiveYears.toLocaleString('ar-SA')} ﷼</span>
      </div>
      <div class="info-row">
        <span class="info-label">ما بعد الخمس سنوات:</span>
        <span class="info-value">${result.afterFiveYears.toLocaleString('ar-SA')} ﷼</span>
      </div>
      <div class="info-row">
        <span class="info-label">النسبة المستحقة:</span>
        <span class="info-value">${result.percentage}%</span>
      </div>
    </div>

    <div class="legal-note">
      <strong>المادة 84 من نظام العمل السعودي:</strong><br/>
      إذا انتهت علاقة العمل وجب على صاحب العمل أن يدفع إلى العامل مكافأة عن مدة خدمته، تحسب على أساس أجر نصف شهر عن كل سنة من السنوات الخمس الأولى، وأجر شهر عن كل سنة من السنوات التالية، ويتخذ الأجر الأخير أساساً لحساب المكافأة.
    </div>

    <div class="footer">
      <p><strong>منصة رابِط</strong> - مساعد الموارد البشرية السعودي</p>
      <p>تاريخ الإصدار: ${new Date().toLocaleDateString('ar-SA')}</p>
      <p style="margin-top: 10px; font-size: 12px;">
        هذا التقرير للإشارة فقط ولا يعتبر مستنداً قانونياً ملزماً
      </p>
    </div>
  </div>
</body>
</html>
        `;

        return { pdfContent };
      }),
  }),

  // Leave Calculator with AI
  leave: router({
    askAI: publicProcedure
      .input(z.object({
        question: z.string(),
        context: z.object({
          employeeYears: z.number().optional(),
          leaveType: z.string().optional(),
        }).optional(),
      }))
      .mutation(async ({ input }) => {
        const { question, context } = input;
        
        const systemPrompt = `أنت مساعد ذكاء اصطناعي متخصص في نظام العمل السعودي والإجازات. 
مهمتك الإجابة على أسئلة الموظفين وأصحاب العمل حول أنواع الإجازات وحقوقهم.

معلومات مهمة عن الإجازات في نظام العمل السعودي:

1. الإجازة السنوية (المادة 109):
   - 21 يوماً للعامل الذي أمضى سنة واحدة على الأقل
   - 30 يوماً للعامل الذي أمضى 5 سنوات متصلة
   - بأجر كامل

2. الإجازة المرضية (المادة 117):
   - 30 يوماً بأجر كامل
   - 60 يوماً بـ 75% من الأجر
   - 30 يوماً بدون أجر
   - المجموع: 120 يوماً في السنة

3. إجازة الأمومة (المادة 151):
   - 10 أسابيع (70 يوماً) بأجر كامل
   - يمكن توزيعها قبل وبعد الولادة

4. إجازة الحج (المادة 113):
   - 10 أيام على الأقل
   - مرة واحدة طوال مدة الخدمة
   - بدون أجر (ما لم يتفق على غير ذلك)

5. إجازة الوفاة (المادة 114):
   - 5 أيام في حالة وفاة الزوج/الزوجة أو أحد الأصول أو الفروع
   - 3 أيام في حالة وفاة الأخ أو الأخت
   - بأجر كامل

6. إجازة الزواج:
   - 5 أيام بأجر كامل
   - مرة واحدة طوال مدة الخدمة

7. إجازة الامتحانات (المادة 115):
   - بأجر كامل للتعليم العام
   - بدون أجر للتعليم الجامعي

أجب بشكل واضح ومختصر ومفيد. استخدم اللغة العربية الفصحى.`;

        let userPrompt = question;
        if (context?.employeeYears) {
          userPrompt += `\n\nمعلومات إضافية: الموظف لديه ${context.employeeYears} سنوات خدمة.`;
        }

        try {
          const response = await invokeLLM({
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
          });

          const answer = response.choices[0]?.message?.content || 'عذراً، لم أتمكن من الإجابة على سؤالك. يرجى المحاولة مرة أخرى.';

          return { answer };
        } catch (error) {
          console.error('AI Error:', error);
          return { 
            answer: 'عذراً، حدث خطأ في الاتصال بالمساعد الذكي. يرجى المحاولة مرة أخرى لاحقاً.' 
          };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
