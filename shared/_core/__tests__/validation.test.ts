/**
 * Validation Tests
 * اختبارات شاملة لدوال التحقق من الصحة
 */

import { describe, it, expect } from 'vitest';
import { validateProjectName } from '../validation';

describe('validateProjectName', () => {
  describe('أسماء صحيحة', () => {
    it('يجب أن يقبل اسم مشروع صحيح بأحرف صغيرة وأرقام', () => {
      const result = validateProjectName('myproject123');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('يجب أن يقبل اسم مشروع مع نقاط', () => {
      const result = validateProjectName('my.project.name');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('يجب أن يقبل اسم مشروع مع شرطات سفلية', () => {
      const result = validateProjectName('my_project_name');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('يجب أن يقبل اسم مشروع مع شرطات', () => {
      const result = validateProjectName('my-project-name');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('يجب أن يقبل اسم مشروع مع جميع الرموز المسموحة', () => {
      const result = validateProjectName('my-project.name_123');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('يجب أن يقبل اسم مشروع بطول 100 حرف', () => {
      const longName = 'a'.repeat(100);
      const result = validateProjectName(longName);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('يجب أن يقبل اسم مشروع مع شرطتين متتاليتين', () => {
      const result = validateProjectName('my--project');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('أسماء غير صحيحة - الطول', () => {
    it('يجب أن يرفض اسم مشروع فارغ', () => {
      const result = validateProjectName('');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('اسم المشروع مطلوب');
    });

    it('يجب أن يرفض اسم مشروع أطول من 100 حرف', () => {
      const longName = 'a'.repeat(101);
      const result = validateProjectName(longName);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('اسم المشروع يجب أن يكون حتى 100 حرف');
    });
  });

  describe('أسماء غير صحيحة - الأحرف الكبيرة', () => {
    it('يجب أن يرفض اسم مشروع يحتوي على أحرف كبيرة', () => {
      const result = validateProjectName('MyProject');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('اسم المشروع يجب أن يحتوي على أحرف صغيرة فقط');
    });

    it('يجب أن يرفض اسم مشروع بأحرف كبيرة فقط', () => {
      const result = validateProjectName('MYPROJECT');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('اسم المشروع يجب أن يحتوي على أحرف صغيرة فقط');
    });

    it('يجب أن يرفض اسم مشروع مع حرف كبير واحد', () => {
      const result = validateProjectName('myProject');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('اسم المشروع يجب أن يحتوي على أحرف صغيرة فقط');
    });
  });

  describe('أسماء غير صحيحة - الرموز غير المسموحة', () => {
    it('يجب أن يرفض اسم مشروع يحتوي على مسافات', () => {
      const result = validateProjectName('my project');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('اسم المشروع يمكن أن يحتوي فقط على أحرف صغيرة، أرقام، والرموز: . _ -');
    });

    it('يجب أن يرفض اسم مشروع يحتوي على @', () => {
      const result = validateProjectName('my@project');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('اسم المشروع يمكن أن يحتوي فقط على أحرف صغيرة، أرقام، والرموز: . _ -');
    });

    it('يجب أن يرفض اسم مشروع يحتوي على #', () => {
      const result = validateProjectName('my#project');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('اسم المشروع يمكن أن يحتوي فقط على أحرف صغيرة، أرقام، والرموز: . _ -');
    });

    it('يجب أن يرفض اسم مشروع يحتوي على /', () => {
      const result = validateProjectName('my/project');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('اسم المشروع يمكن أن يحتوي فقط على أحرف صغيرة، أرقام، والرموز: . _ -');
    });

    it('يجب أن يرفض اسم مشروع يحتوي على رموز خاصة متعددة', () => {
      const result = validateProjectName('my!project$name%');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('اسم المشروع يمكن أن يحتوي فقط على أحرف صغيرة، أرقام، والرموز: . _ -');
    });
  });

  describe('أسماء غير صحيحة - التسلسل ---', () => {
    it('يجب أن يرفض اسم مشروع يحتوي على ---', () => {
      const result = validateProjectName('my---project');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('اسم المشروع لا يمكن أن يحتوي على التسلسل ---');
    });

    it('يجب أن يرفض اسم مشروع يبدأ بـ ---', () => {
      const result = validateProjectName('---myproject');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('اسم المشروع لا يمكن أن يحتوي على التسلسل ---');
    });

    it('يجب أن يرفض اسم مشروع ينتهي بـ ---', () => {
      const result = validateProjectName('myproject---');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('اسم المشروع لا يمكن أن يحتوي على التسلسل ---');
    });

    it('يجب أن يرفض اسم مشروع يحتوي على --- في المنتصف', () => {
      const result = validateProjectName('my---awesome---project');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('اسم المشروع لا يمكن أن يحتوي على التسلسل ---');
    });
  });

  describe('أخطاء متعددة', () => {
    it('يجب أن يُرجع جميع الأخطاء عند وجود أخطاء متعددة', () => {
      const result = validateProjectName('My Project---Name!');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
      expect(result.errors).toContain('اسم المشروع يجب أن يحتوي على أحرف صغيرة فقط');
      expect(result.errors).toContain('اسم المشروع يمكن أن يحتوي فقط على أحرف صغيرة، أرقام، والرموز: . _ -');
      expect(result.errors).toContain('اسم المشروع لا يمكن أن يحتوي على التسلسل ---');
    });
  });

  describe('حالات حدية', () => {
    it('يجب أن يقبل اسم مشروع بحرف واحد', () => {
      const result = validateProjectName('a');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('يجب أن يقبل اسم مشروع برقم واحد', () => {
      const result = validateProjectName('1');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('يجب أن يقبل اسم مشروع برمز واحد مسموح', () => {
      const result = validateProjectName('_');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('يجب أن يقبل اسم مشروع مع أربع شرطات متتالية', () => {
      const result = validateProjectName('my----project');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('اسم المشروع لا يمكن أن يحتوي على التسلسل ---');
    });
  });
});
