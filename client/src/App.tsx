import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CookieConsent } from "./components/CookieConsent";
import { ChatWidget } from "./components/ChatWidget";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminLayout } from "./components/AdminLayout";

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
  </div>
);

// Lazy load pages - Public pages (loaded first)
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const AccountType = lazy(() => import("./pages/AccountType"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Auth pages
const SignupEmployee = lazy(() => import("./pages/SignupEmployee"));
const SignupConsultant = lazy(() => import("@/pages/SignupConsultant"));
const SignupCompany = lazy(() => import("./pages/SignupCompany"));
const ConsultantLogin = lazy(() => import("@/pages/ConsultantLogin"));
const ConsultantRegister = lazy(() => import("./pages/ConsultantRegister"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

// Dashboard pages (high priority - loaded on demand)
const CompanyDashboard = lazy(
  () => import("./pages/dashboard/CompanyDashboard")
);
const ConsultantDashboard = lazy(() => import("./pages/ConsultantDashboard"));
const AdminDashboard = lazy(() => import("./pages/dashboard/AdminDashboard"));
const AdminDashboardNew = lazy(() => import("./pages/admin/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));

// Document & Tools
const DocumentGenerator = lazy(() => import("./pages/DocumentGenerator"));
const MyDocuments = lazy(() => import("./pages/MyDocuments"));
const EndOfServiceCalculator = lazy(
  () => import("./pages/EndOfServiceCalculator")
);
const LeaveCalculator = lazy(() => import("./pages/LeaveCalculator"));
const LetterGenerator = lazy(() => import("./pages/LetterGenerator"));
const ToolsPage = lazy(() => import("./pages/Tools"));
const DashboardTools = lazy(() => import("./pages/dashboard/Tools"));

// Dashboard sub-pages
const Employees = lazy(() => import("./pages/dashboard/Employees"));
const ATS = lazy(() => import("./pages/dashboard/ATS"));
const Tickets = lazy(() => import("./pages/dashboard/Tickets"));
const Tasks = lazy(() => import("./pages/dashboard/Tasks"));
const Reports = lazy(() => import("@/pages/dashboard/Reports"));
const Settings = lazy(() => import("@/pages/dashboard/Settings"));
const Certificates = lazy(() => import("@/pages/dashboard/Certificates"));
const LegalCheck = lazy(() => import("@/pages/dashboard/LegalCheck"));
const Templates = lazy(() => import("./pages/dashboard/Templates"));
const Reminders = lazy(() => import("./pages/dashboard/Reminders"));
const Notifications = lazy(() => import("./pages/dashboard/Notifications"));

// Consulting pages
const Consulting = lazy(() => import("./pages/Consulting"));
const ConsultingBook = lazy(() => import("./pages/ConsultingBook"));
const ConsultantsList = lazy(() => import("./pages/ConsultantsList"));
const ConsultingServices = lazy(() => import("./pages/ConsultingServices"));
const HowToBook = lazy(() => import("./pages/HowToBook"));
const ConsultingExperts = lazy(() => import("./pages/ConsultingExperts"));
const ConsultingBookingNew = lazy(() => import("./pages/ConsultingBookingNew"));
const ConsultingExpertProfile = lazy(
  () => import("./pages/ConsultingExpertProfile")
);
const MyConsultations = lazy(() => import("./pages/MyConsultations"));
const ConsultationDetail = lazy(() => import("./pages/ConsultationDetail"));
const ConsultationChat = lazy(() => import("./pages/ConsultationChat"));

// Content pages
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const KnowledgeBase = lazy(() => import("./pages/KnowledgeBase"));
const KnowledgeBaseArticle = lazy(() => import("./pages/KnowledgeBaseArticle"));
const Knowledge = lazy(() => import("./pages/Knowledge"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));

// Legal & Policy pages
const Privacy = lazy(() => import("./pages/Privacy"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const CookiesPolicy = lazy(() => import("./pages/CookiesPolicy"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const MyData = lazy(() => import("./pages/MyData"));
const DataProtectionContact = lazy(
  () => import("./pages/DataProtectionContact")
);

// Admin pages
const AdminUsers = lazy(() => import("./pages/admin/Users"));
const AdminSubscriptions = lazy(() => import("./pages/admin/Subscriptions"));
const AdminBookings = lazy(() => import("./pages/admin/Bookings"));
const AdminAuditLogs = lazy(() => import("./pages/admin/AuditLogs"));
const AdminChat = lazy(() => import("./pages/admin/Chat"));
const AdminDiscountCodes = lazy(() => import("./pages/AdminDiscountCodes"));
const AdminDataRequests = lazy(() => import("./pages/admin/DataRequests"));
const AdminSecurityIncidents = lazy(
  () => import("./pages/admin/SecurityIncidents")
);

// Other pages
const Pricing = lazy(() => import("./pages/Pricing"));
const Services = lazy(() => import("./pages/Services"));
const BrandPreview = lazy(() => import("./pages/BrandPreview"));
const VerifyDecision = lazy(() => import("./pages/VerifyDecision"));
const Payment = lazy(() => import("./pages/Payment"));

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/signup"} component={AccountType} />
        <Route path={"/signup/employee"} component={SignupEmployee} />
        <Route path={"/signup/consultant"} component={SignupConsultant} />
        <Route path={"/signup/company"} component={SignupCompany} />
        <Route path={"/login"} component={Login} />
        <Route path={"/forgot-password"} component={ForgotPassword} />
        <Route path={"/reset-password/:token"} component={ResetPassword} />
        <Route path={"/consultant/login"} component={ConsultantLogin} />
        <Route
          path={"/employee/dashboard"}
          component={() => (
            <ProtectedRoute requiredRole="employee">
              <CompanyDashboard />
            </ProtectedRoute>
          )}
        />
        <Route
          path={"/payment"}
          component={() => (
            <ProtectedRoute>
              <Payment planName="اشتراك قياسي" price={500} />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profile"
          component={() => (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/document-generator"
          component={() => (
            <ProtectedRoute>
              <DocumentGenerator />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/my-documents"
          component={() => (
            <ProtectedRoute>
              <MyDocuments />
            </ProtectedRoute>
          )}
        />
        <Route path={"/admin/discount-codes"} component={AdminDiscountCodes} />
        <Route path={"/404"} component={NotFound} />
        <Route path="/contact" component={Contact} />
        <Route path="/faq" component={FAQ} />
        <Route path={"/about"} component={About} />
        <Route path={"/refund-policy"} component={RefundPolicy} />
        <Route path="/blog/:id" component={BlogPost} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/my-data" component={MyData} />
        <Route
          path="/data-protection-contact"
          component={DataProtectionContact}
        />
        <Route path="/admin/data-requests" component={AdminDataRequests} />
        <Route
          path="/admin/security-incidents"
          component={AdminSecurityIncidents}
        />
        <Route path="/terms" component={Terms} />
        <Route path="/cookies" component={Cookies} />
        <Route path="/cookies-policy" component={CookiesPolicy} />
        <Route path="/consultant/register" component={ConsultantRegister} />
        <Route path={"/case-studies"} component={CaseStudies} />
        <Route path="/consulting" component={Consulting} />
        <Route path="/consulting/book" component={ConsultingBook} />
        <Route path="/consulting/book-new" component={ConsultingBookingNew} />
        <Route path="/consultants" component={ConsultantsList} />
        <Route path="/consulting/services" component={ConsultingServices} />
        <Route path="/consulting/how-to-book" component={HowToBook} />
        <Route path="/consulting/experts" component={ConsultingExperts} />
        <Route
          path="/consulting/expert/:id"
          component={ConsultingExpertProfile}
        />
        <Route
          path="/my-consultations"
          component={() => (
            <ProtectedRoute>
              <MyConsultations />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/consultation/:id"
          component={() => (
            <ProtectedRoute>
              <ConsultationDetail />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/consultation/:id/chat"
          component={() => (
            <ProtectedRoute>
              <ConsultationChat />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/consultant-dashboard"
          component={() => (
            <ProtectedRoute requiredRole="consultant">
              <ConsultantDashboard />
            </ProtectedRoute>
          )}
        />
        <Route path={"/courses"} component={Courses} />
        <Route path={"/courses/:id"} component={CourseDetail} />
        <Route path={"/knowledge"} component={Knowledge} />
        <Route path={"/tools"} component={ToolsPage} />
        <Route path={"/knowledge-base"} component={KnowledgeBase} />
        <Route path={"/knowledge-base/:id"} component={KnowledgeBaseArticle} />
        <Route
          path={"/tools/end-of-service"}
          component={EndOfServiceCalculator}
        />
        <Route path={"/tools/leave-calculator"} component={LeaveCalculator} />
        <Route path={"/tools/letter-generator"} component={LetterGenerator} />
        <Route path="/pricing" component={Pricing} />
        <Route
          path="/dashboard"
          component={() => (
            <ProtectedRoute requiredRole="company">
              <CompanyDashboard />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/company/dashboard"
          component={() => (
            <ProtectedRoute requiredRole="company">
              <CompanyDashboard />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin"
          component={() => (
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminDashboardNew />
              </AdminLayout>
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin/users"
          component={() => (
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminUsers />
              </AdminLayout>
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin/subscriptions"
          component={() => (
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminSubscriptions />
              </AdminLayout>
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin/bookings"
          component={() => (
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminBookings />
              </AdminLayout>
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin/audit-logs"
          component={() => (
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminAuditLogs />
              </AdminLayout>
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin/chat"
          component={() => (
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminChat />
              </AdminLayout>
            </ProtectedRoute>
          )}
        />
        <Route
          path="/dashboard/employees"
          component={() => (
            <ProtectedRoute requiredRole="company">
              <Employees />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/dashboard/ats"
          component={() => (
            <ProtectedRoute requiredRole="company">
              <ATS />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/dashboard/tickets"
          component={() => (
            <ProtectedRoute requiredRole="company">
              <Tickets />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/dashboard/tasks"
          component={() => (
            <ProtectedRoute requiredRole="company">
              <Tasks />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/dashboard/reports"
          component={() => (
            <ProtectedRoute requiredRole="company">
              <Reports />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/dashboard/settings"
          component={() => (
            <ProtectedRoute requiredRole="company">
              <Settings />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/dashboard/certificates"
          component={() => (
            <ProtectedRoute requiredRole="company">
              <Certificates />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/dashboard/legal-check"
          component={() => (
            <ProtectedRoute requiredRole="company">
              <LegalCheck />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/dashboard/templates"
          component={() => (
            <ProtectedRoute requiredRole="company">
              <Templates />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/dashboard/reminders"
          component={() => (
            <ProtectedRoute requiredRole="company">
              <Reminders />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/dashboard/tools"
          component={() => (
            <ProtectedRoute requiredRole="company">
              <DashboardTools />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/dashboard/notifications"
          component={() => (
            <ProtectedRoute requiredRole="company">
              <Notifications />
            </ProtectedRoute>
          )}
        />
        <Route path="/verify-decision" component={VerifyDecision} />
        <Route path="/services" component={Services} />
        <Route path="/brand-preview" component={BrandPreview} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <ChatWidget />
          <CookieConsent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
