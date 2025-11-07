# دليل Responsive Design - RabitHR Platform

## نظرة عامة

تم تطبيق نظام responsive design شامل يدعم جميع أحجام الشاشات من الموبايل إلى سطح المكتب.

---

## 🎯 Breakpoints

نستخدم Tailwind CSS breakpoints الافتراضية:

```
xs:  < 640px   (Mobile portrait)
sm:  >= 640px  (Mobile landscape)
md:  >= 768px  (Tablet)
lg:  >= 1024px (Desktop)
xl:  >= 1280px (Large desktop)
2xl: >= 1536px (Extra large)
```

---

## 📱 Mobile-First Approach

التصميم يبدأ من الموبايل ثم يتوسع للشاشات الأكبر:

```tsx
// ❌ خطأ - Desktop first
<div className="w-full lg:w-1/2 md:w-2/3">

// ✅ صحيح - Mobile first
<div className="w-full md:w-2/3 lg:w-1/2">
```

---

## 🛠️ الأدوات المتاحة

### 1. useMediaQuery Hook

للتحقق من media queries:

```typescript
import { useMediaQuery } from "@/hooks/useMediaQuery";

function MyComponent() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return isMobile ? <MobileView /> : <DesktopView />;
}
```

### 2. useBreakpoint Hook

للحصول على معلومات شاملة عن الشاشة:

```typescript
import { useBreakpoint } from "@/hooks/useMediaQuery";

function MyComponent() {
  const { isMobile, isTablet, isDesktop, current } = useBreakpoint();

  console.log("Current breakpoint:", current); // "xs", "sm", "md", etc.

  return (
    <div>
      {isMobile && <MobileLayout />}
      {isTablet && <TabletLayout />}
      {isDesktop && <DesktopLayout />}
    </div>
  );
}
```

### 3. useTouchDevice Hook

للتحقق من أجهزة اللمس:

```typescript
import { useTouchDevice } from "@/hooks/useMediaQuery";

function MyComponent() {
  const isTouch = useTouchDevice();

  return (
    <Button
      size={isTouch ? "lg" : "default"} // Larger for touch
    >
      اضغط هنا
    </Button>
  );
}
```

---

## 📦 Responsive Components

### ResponsiveContainer

عرض محتوى بناءً على حجم الشاشة:

```tsx
import { ResponsiveContainer } from "@/components/ResponsiveContainer";

// Show only on mobile
<ResponsiveContainer mobile>
  <MobileMenu />
</ResponsiveContainer>

// Hide on mobile
<ResponsiveContainer hideMobile>
  <DesktopSidebar />
</ResponsiveContainer>

// Show only on desktop
<ResponsiveContainer desktop>
  <DesktopFeatures />
</ResponsiveContainer>
```

### Convenience Components

مكونات مختصرة للاستخدام السريع:

```tsx
import {
  MobileOnly,
  TabletOnly,
  DesktopOnly,
  HideMobile,
  HideDesktop,
} from "@/components/ResponsiveContainer";

<MobileOnly>
  <MobileNavigation />
</MobileOnly>

<DesktopOnly>
  <DesktopSidebar />
</DesktopOnly>

<HideMobile>
  <AdvancedFeatures />
</HideMobile>
```

---

## 📲 Mobile Navigation

### MobileNavigation

شريط تنقل سفلي للموبايل:

```tsx
import { MobileNavigation } from "@/components/MobileNavigation";

function Layout() {
  return (
    <>
      <main>{children}</main>
      <MobileNavigation />
    </>
  );
}
```

**المميزات:**

- ✅ Fixed bottom bar
- ✅ Active state indicators
- ✅ Badge notifications
- ✅ Icon + label
- ✅ Touch-optimized (48x48px targets)

### MobileTopBar

شريط علوي مع قائمة جانبية:

```tsx
import { MobileTopBar } from "@/components/MobileNavigation";

function Layout() {
  return (
    <>
      <MobileTopBar />
      <main>{children}</main>
    </>
  );
}
```

**المميزات:**

- ✅ Sticky top bar
- ✅ Logo + branding
- ✅ Search button
- ✅ Hamburger menu
- ✅ Slide-in drawer

### MobileSafeArea

مساحة آمنة للمحتوى:

```tsx
import { MobileSafeArea } from "@/components/MobileNavigation";

function Page() {
  return (
    <div>
      <Content />
      {/* Adds padding for bottom nav */}
      <MobileSafeArea />
    </div>
  );
}
```

---

## 🎨 Responsive Design Patterns

### 1. Touch-Friendly Buttons

```tsx
// ✅ Good - Minimum 44x44px
<Button size="lg" className="min-h-[44px] min-w-[44px]">
  اضغط
</Button>

// ❌ Bad - Too small for touch
<Button size="sm" className="h-6 w-6">
  X
</Button>
```

### 2. Responsive Typography

```tsx
// Mobile first, then scale up
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  العنوان الرئيسي
</h1>

<p className="text-sm md:text-base lg:text-lg">
  النص الأساسي
</p>
```

### 3. Responsive Spacing

```tsx
// Adjust padding/margin for screen size
<div className="p-4 md:p-6 lg:p-8">
  {content}
</div>

<section className="my-8 md:my-12 lg:my-16">
  {content}
</section>
```

### 4. Responsive Grids

```tsx
// 1 column on mobile, 2 on tablet, 3 on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

### 5. Responsive Tables

```tsx
// Stack on mobile, table on desktop
<div className="block md:table w-full">
  <div className="md:table-row">
    <div className="block md:table-cell p-2">{data}</div>
  </div>
</div>
```

### 6. Responsive Modals

```tsx
// Full screen on mobile, centered on desktop
<Dialog>
  <DialogContent className="w-full h-full md:h-auto md:max-w-md md:rounded-lg">
    {content}
  </DialogContent>
</Dialog>
```

---

## 📐 Layout Patterns

### Mobile Layout

```tsx
function MobileLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <MobileTopBar />
      <main className="flex-1 p-4 pb-20">{children}</main>
      <MobileNavigation />
    </div>
  );
}
```

### Desktop Layout

```tsx
function DesktopLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r">
        <Sidebar />
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
```

### Adaptive Layout

```tsx
function AdaptiveLayout() {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <div className="min-h-screen">
      {isMobile && <MobileTopBar />}
      <div className={cn("flex", isMobile ? "flex-col" : "flex-row")}>
        {isDesktop && <Sidebar />}
        <main className={cn("flex-1", isMobile ? "p-4 pb-20" : "p-8")}>
          {children}
        </main>
      </div>
      {isMobile && <MobileNavigation />}
    </div>
  );
}
```

---

## ✅ Best Practices

### 1. Touch Targets

- ✅ Minimum 44x44px for touch elements
- ✅ Add padding around clickable areas
- ✅ Sufficient spacing between elements (min 8px)

### 2. Typography

- ✅ Readable font sizes (min 16px on mobile)
- ✅ Proper line height (1.5 - 1.7)
- ✅ Sufficient contrast (WCAG AA: 4.5:1)

### 3. Forms

- ✅ Large input fields on mobile
- ✅ Proper input types (email, tel, number)
- ✅ Clear labels and placeholders
- ✅ Error messages below inputs

### 4. Images

- ✅ Use ImageOptimized component
- ✅ Proper aspect ratios
- ✅ Lazy loading
- ✅ Responsive srcset when needed

### 5. Navigation

- ✅ Bottom nav on mobile (thumb-friendly)
- ✅ Top nav on desktop
- ✅ Clear active states
- ✅ Accessible via keyboard

### 6. Content Priority

- ✅ Show critical content first on mobile
- ✅ Progressive disclosure
- ✅ Collapsible sections
- ✅ Infinite scroll or pagination

---

## 🧪 Testing

### Manual Testing

```bash
# Test on different viewports
- Mobile: 375x667 (iPhone)
- Mobile: 360x740 (Android)
- Tablet: 768x1024 (iPad)
- Desktop: 1920x1080
- Desktop: 1440x900
```

### Browser DevTools

1. Open DevTools (F12)
2. Click device toggle (Ctrl+Shift+M)
3. Select device or enter custom dimensions
4. Test touch simulation
5. Check responsive breakpoints

### Real Device Testing

- ✅ Test on actual mobile devices
- ✅ Test on tablets
- ✅ Test landscape orientation
- ✅ Test with keyboard (tablets)
- ✅ Test touch gestures

---

## 📊 Performance Considerations

- ✅ Lazy load off-screen content
- ✅ Use CSS media queries in JS sparingly
- ✅ Debounce resize handlers
- ✅ Avoid layout thrashing
- ✅ Use CSS Grid and Flexbox
- ✅ Minimize re-renders on resize

---

## 🚀 Migration Guide

### Convert existing components:

```tsx
// Before
function OldComponent() {
  return <div className="w-1/2">{content}</div>;
}

// After - Responsive
function NewComponent() {
  return <div className="w-full md:w-2/3 lg:w-1/2">{content}</div>;
}

// After - With hooks
function SmartComponent() {
  const { isMobile } = useBreakpoint();

  return <div className={isMobile ? "w-full" : "w-1/2"}>{content}</div>;
}
```

---

## 📚 Resources

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [MDN Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)
- [Web.dev Responsive Design](https://web.dev/responsive-web-design-basics/)
- [Touch Target Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)

---

**المشروع الآن متجاوب بالكامل على جميع الأجهزة! 📱💻**
