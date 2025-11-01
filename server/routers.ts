import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";
import * as db from "./db";

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

  // Smart Document Generator
  documentGenerator: router({
    // Get all templates
    getTemplates: publicProcedure.query(async () => {
      const templates = await db.getAllTemplates();
      return { templates };
    }),

    // Get template by code
    getTemplate: publicProcedure
      .input(z.object({ code: z.string() }))
      .query(async ({ input }) => {
        const template = await db.getTemplateByCode(input.code);
        return { template };
      }),

    // Generate document with AI
    generateDocument: protectedProcedure
      .input(z.object({
        templateCode: z.string(),
        inputData: z.record(z.string(), z.any()),
        lang: z.enum(["ar", "en", "both"]).default("ar"),
        style: z.enum(["formal", "semi-formal", "friendly"]).default("formal"),
        companyLogo: z.string().optional(),
        companyName: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { templateCode, inputData, lang, style, companyLogo, companyName } = input;
        
        // Get template
        const template = await db.getTemplateByCode(templateCode);
        if (!template) {
          throw new Error("Template not found");
        }

        // Build AI prompt
        const styleDescriptions = {
          formal: "رسمي جداً ومهني، يستخدم في المراسلات الحكومية والقانونية",
          "semi-formal": "شبه رسمي، يستخدم في المراسلات الداخلية للشركات",
          friendly: "ودي ومباشر، مع الحفاظ على الاحترافية",
        };

        const langDescriptions = {
          ar: "العربية الفصحى فقط",
          en: "English only",
          both: "نسخة عربية ونسخة إنجليزية منفصلتين",
        };

        const systemPrompt = `أنت مساعد ذكاء اصطناعي متخصص في كتابة المستندات والخطابات الرسمية للموارد البشرية.

مهمتك: إنشاء ${template.titleAr} بناءً على البيانات المقدمة.

الأسلوب المطلوب: ${styleDescriptions[style]}
اللغة المطلوبة: ${langDescriptions[lang]}

متطلبات الكتابة:
1. استخدم صيغة احترافية ومناسبة للسياق
2. تأكد من ذكر جميع التفاصيل المهمة
3. اتبع التنسيق القياسي للمستندات الرسمية
4. أضف التاريخ الهجري والميلادي
5. اجعل المستند جاهزاً للطباعة
6. إذا كانت اللغة "both"، اكتب النسخة العربية أولاً ثم الإنجليزية مع فاصل واضح

ملاحظة مهمة: هذا المستند يُولَّد بالذكاء الاصطناعي ويخضع للمراجعة البشرية قبل الاستخدام الرسمي.

${template.aiPrompt || ''}`;

        const userPrompt = `البيانات المطلوبة:
${JSON.stringify(inputData, null, 2)}

${companyName ? `اسم الشركة: ${companyName}\n` : ''}

الرجاء إنشاء المستند كاملاً بصيغة HTML جاهزة للطباعة.`;

        try {
          // Generate with AI
          const response = await invokeLLM({
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
          });

          let outputHtml = '';
          const content = response.choices[0]?.message?.content;
          if (typeof content === 'string') {
            outputHtml = content;
          } else if (Array.isArray(content)) {
            // Extract text from array content
            outputHtml = content
              .filter(item => 'text' in item)
              .map(item => ('text' in item ? item.text : ''))
              .join('');
          }
          
          const outputText = outputHtml.replace(/<[^>]*>/g, ''); // Strip HTML for text version

          // Save to database
          await db.createGeneratedDocument({
            userId: ctx.user.id,
            templateCode,
            outputHtml,
            outputText,
            lang,
            inputData: JSON.stringify(inputData),
            companyLogo,
            companyName,
            isSaved: false,
          });

          return { 
            success: true,
            outputHtml,
            outputText,
          };
        } catch (error) {
          console.error('Document generation error:', error);
          throw new Error('فشل في توليد المستند. يرجى المحاولة مرة أخرى.');
        }
      }),

    // Get user's documents
    getMyDocuments: protectedProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input, ctx }) => {
        const documents = await db.getUserDocuments(ctx.user.id, input.limit);
        return { documents };
      }),

    // Get saved documents only
    getMySavedDocuments: protectedProcedure
      .query(async ({ ctx }) => {
        const documents = await db.getUserSavedDocuments(ctx.user.id);
        return { documents };
      }),

    // Save/unsave document
    toggleSaveDocument: protectedProcedure
      .input(z.object({ 
        documentId: z.number(),
      }))
      .mutation(async ({ input }) => {
        const doc = await db.getDocumentById(input.documentId);
        if (!doc) throw new TRPCError({ code: 'NOT_FOUND', message: 'Document not found' });
        
        const newSavedStatus = !doc.isSaved;
        await db.updateDocumentSavedStatus(input.documentId, newSavedStatus);
        return { success: true, isSaved: newSavedStatus };
      }),

    // Delete document
    deleteDocument: protectedProcedure
      .input(z.object({ documentId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        await db.deleteGeneratedDocument(input.documentId, ctx.user.id);
        return { success: true };
      }),
  }),

  // Consulting System
  consulting: router({
    // Get all active packages
    getPackages: publicProcedure.query(async () => {
      const packages = await db.getActiveConsultingPackages();
      return { packages };
    }),

    // Get package by ID
    getPackage: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const package_ = await db.getConsultingPackageById(input.id);
        return { package: package_ };
      }),

    // Create consulting ticket (booking)
    createTicket: protectedProcedure
      .input(z.object({
        packageId: z.number(),
        subject: z.string(),
        description: z.string(),
        submittedFormJson: z.string().optional(),
        attachments: z.string().optional(),
        priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const result = await db.createConsultingTicket({
          userId: ctx.user.id,
          ...input,
        });
        return { success: true, ...result };
      }),

    // Get my tickets
    getMyTickets: protectedProcedure
      .query(async ({ ctx }) => {
        const tickets = await db.getUserConsultingTickets(ctx.user.id);
        return { tickets };
      }),

    // Get ticket by ID
    getTicket: protectedProcedure
      .input(z.object({ ticketId: z.number() }))
      .query(async ({ input }) => {
        const ticket = await db.getConsultingTicketById(input.ticketId);
        return { ticket };
      }),

    // Get ticket by number
    getTicketByNumber: protectedProcedure
      .input(z.object({ ticketNumber: z.string() }))
      .query(async ({ input }) => {
        const ticket = await db.getConsultingTicketByNumber(input.ticketNumber);
        return { ticket };
      }),

    // Get ticket responses
    getTicketResponses: protectedProcedure
      .input(z.object({ ticketId: z.number() }))
      .query(async ({ input }) => {
        const responses = await db.getConsultingTicketResponses(input.ticketId);
        return { responses };
      }),

    // Add response to ticket
    addResponse: protectedProcedure
      .input(z.object({
        ticketId: z.number(),
        message: z.string(),
        attachments: z.string().optional(),
        isInternal: z.boolean().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.addConsultingResponse({
          ticketId: input.ticketId,
          userId: ctx.user.id,
          message: input.message,
          attachments: input.attachments,
          isInternal: input.isInternal || false,
        });
        return { success: true };
      }),

    // Update ticket status
    updateTicketStatus: protectedProcedure
      .input(z.object({
        ticketId: z.number(),
        status: z.enum(["pending", "assigned", "in-progress", "completed", "cancelled"]),
      }))
      .mutation(async ({ input }) => {
        await db.updateConsultingTicketStatus(input.ticketId, input.status);
        return { success: true };
      }),

    // Assign ticket to consultant (admin only)
    assignTicket: protectedProcedure
      .input(z.object({
        ticketId: z.number(),
        consultantId: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        // TODO: Add admin check
        await db.assignConsultingTicket(input.ticketId, input.consultantId);
        return { success: true };
      }),

    // Rate ticket
    rateTicket: protectedProcedure
      .input(z.object({
        ticketId: z.number(),
        rating: z.number().min(1).max(5),
        feedback: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.rateConsultingTicket(input.ticketId, input.rating, input.feedback);
        return { success: true };
      }),

    // Get consultant's tickets (for consultant dashboard)
    getConsultantTickets: protectedProcedure
      .query(async ({ ctx }) => {
        const tickets = await db.getConsultantTickets(ctx.user.id);
        return { tickets };
      }),

    // Get pending tickets (for admin)
    getPendingTickets: protectedProcedure
      .query(async () => {
        // TODO: Add admin check
        const tickets = await db.getPendingConsultingTickets();
        return { tickets };
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

  // Discount Codes Router
  discountCodes: router({
    // Validate discount code (public)
    validate: publicProcedure
      .input(z.object({ code: z.string() }))
      .query(async ({ input }) => {
        const code = await db.getDiscountCodeByCode(input.code);
        
        if (!code) {
          return { valid: false, message: 'الكود غير صحيح' };
        }
        
        if (!code.isActive) {
          return { valid: false, message: 'الكود غير نشط' };
        }
        
        // Check max uses
        if (code.maxUses && code.usedCount >= code.maxUses) {
          return { valid: false, message: 'الكود وصل للحد الأقصى من الاستخدام' };
        }
        
        // Check valid dates
        const now = new Date();
        if (code.validFrom && now < new Date(code.validFrom)) {
          return { valid: false, message: 'الكود لم يبدأ بعد' };
        }
        if (code.validUntil && now > new Date(code.validUntil)) {
          return { valid: false, message: 'الكود منتهي الصلاحية' };
        }
        
        return {
          valid: true,
          code: {
            id: code.id,
            code: code.code,
            discountType: code.discountType,
            discountValue: code.discountValue,
          },
        };
      }),

    // Calculate discount
    calculateDiscount: publicProcedure
      .input(z.object({ 
        code: z.string(),
        originalAmount: z.number(),
      }))
      .query(async ({ input }) => {
        const code = await db.getDiscountCodeByCode(input.code);
        if (!code || !code.isActive) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid code' });
        }
        
        let discountAmount = 0;
        if (code.discountType === 'percentage') {
          discountAmount = Math.floor((input.originalAmount * code.discountValue) / 100);
        } else {
          discountAmount = code.discountValue;
        }
        
        const finalAmount = Math.max(0, input.originalAmount - discountAmount);
        
        return {
          originalAmount: input.originalAmount,
          discountAmount,
          finalAmount,
          discountType: code.discountType,
          discountValue: code.discountValue,
        };
      }),

    // Admin: Get all codes
    getAll: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }
        const codes = await db.getAllDiscountCodes();
        return { codes };
      }),

    // Admin: Create code
    create: protectedProcedure
      .input(z.object({
        code: z.string().min(3).max(50),
        description: z.string().optional(),
        discountType: z.enum(['percentage', 'fixed']),
        discountValue: z.number().min(1),
        maxUses: z.number().optional(),
        validFrom: z.date().optional(),
        validUntil: z.date().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }
        
        // Check if code already exists
        const existing = await db.getDiscountCodeByCode(input.code);
        if (existing) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Code already exists' });
        }
        
        await db.createDiscountCode({
          ...input,
          createdBy: ctx.user.id,
        });
        
        return { success: true };
      }),

    // Admin: Update code
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        description: z.string().optional(),
        discountType: z.enum(['percentage', 'fixed']).optional(),
        discountValue: z.number().min(1).optional(),
        maxUses: z.number().nullable().optional(),
        validFrom: z.date().nullable().optional(),
        validUntil: z.date().nullable().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }
        
        const { id, ...data } = input;
        await db.updateDiscountCode(id, data);
        
        return { success: true };
      }),

    // Admin: Delete code
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }
        
        await db.deleteDiscountCode(input.id);
        return { success: true };
      }),

    // Admin: Get usage history
    getUsageHistory: protectedProcedure
      .input(z.object({ codeId: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }
        
        const history = await db.getDiscountCodeUsageHistory(input.codeId);
        return { history };
      }),
  }),

  // Notifications Router
  notifications: router({
    // Get all notifications for current user
    getAll: protectedProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ ctx, input }) => {
        const notifications = await db.getUserNotifications(ctx.user.id, input?.limit);
        const unreadCount = await db.getUnreadNotificationsCount(ctx.user.id);
        return { notifications, unreadCount };
      }),

    // Get unread count
    getUnreadCount: protectedProcedure
      .query(async ({ ctx }) => {
        const count = await db.getUnreadNotificationsCount(ctx.user.id);
        return { count };
      }),

    // Mark as read
    markAsRead: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.markNotificationAsRead(input.id);
        return { success: true };
      }),

    // Mark all as read
    markAllAsRead: protectedProcedure
      .mutation(async ({ ctx }) => {
        await db.markAllNotificationsAsRead(ctx.user.id);
        return { success: true };
      }),

    // Delete notification
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteNotification(input.id);
        return { success: true };
      }),

    // Delete all notifications
    deleteAll: protectedProcedure
      .mutation(async ({ ctx }) => {
        await db.deleteAllNotifications(ctx.user.id);
        return { success: true };
      }),

    // Get preferences
    getPreferences: protectedProcedure
      .query(async ({ ctx }) => {
        const preferences = await db.getNotificationPreferences(ctx.user.id);
        return { preferences };
      }),

    // Update preferences
    updatePreferences: protectedProcedure
      .input(z.object({
        inAppEnabled: z.boolean().optional(),
        emailEnabled: z.boolean().optional(),
        pushEnabled: z.boolean().optional(),
        smsEnabled: z.boolean().optional(),
        notifyOnBooking: z.boolean().optional(),
        notifyOnResponse: z.boolean().optional(),
        notifyOnReminder: z.boolean().optional(),
        notifyOnPromotion: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updateNotificationPreferences(ctx.user.id, input);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
