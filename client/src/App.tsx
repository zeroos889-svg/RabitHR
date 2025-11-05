import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CookieConsent } from "./components/CookieConsent";
import { ChatWidget } from "./components/ChatWidget";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SignupEmployee from "./pages/SignupEmployee";
import AccountType from "./pages/AccountType";
import SignupConsultant from "@/pages/SignupConsultant";
import ConsultantLogin from "@/pages/ConsultantLogin";
import DocumentGenerator from "./pages/DocumentGenerator";
import MyDocuments from "./pages/MyDocuments";
import AdminDiscountCodes from "./pages/AdminDiscountCodes";
import EndOfServiceCalculator from "./pages/EndOfServiceCalculator";
import LeaveCalculator from "./pages/LeaveCalculator";
import LetterGenerator from "./pages/LetterGenerator";
import Pricing from "./pages/Pricing";
import CompanyDashboard from "./pages/dashboard/CompanyDashboard";
import Employees from "./pages/dashboard/Employees";
import ATS from "./pages/dashboard/ATS";
import Tickets from "./pages/dashboard/Tickets";
import Tasks from "./pages/dashboard/Tasks";
import Reports from "@/pages/dashboard/Reports";
import Settings from "@/pages/dashboard/Settings";
import Certificates from "@/pages/dashboard/Certificates";
import LegalCheck from "@/pages/dashboard/LegalCheck";
import VerifyDecision from "./pages/VerifyDecision";
import Services from "./pages/Services";
import BrandPreview from "./pages/BrandPreview";
import Templates from "./pages/dashboard/Templates";
import Reminders from "./pages/dashboard/Reminders";
import DashboardTools from "./pages/dashboard/Tools";
import About from "./pages/About";
import RefundPolicy from "./pages/RefundPolicy";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Notifications from "./pages/dashboard/Notifications";
import BlogPost from "./pages/BlogPost";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import CaseStudies from "./pages/CaseStudies";
import Consulting from "./pages/Consulting";
import ConsultingBook from "./pages/ConsultingBook";
import ConsultantsList from "./pages/ConsultantsList";
import ConsultingServices from "./pages/ConsultingServices";
import HowToBook from "./pages/HowToBook";
import ConsultingExperts from "./pages/ConsultingExperts";
import ConsultingBookingNew from "./pages/ConsultingBookingNew";
import ConsultingExpertProfile from "./pages/ConsultingExpertProfile";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import KnowledgeBase from "./pages/KnowledgeBase";
import KnowledgeBaseArticle from "./pages/KnowledgeBaseArticle";
import Knowledge from "./pages/Knowledge";
import ToolsPage from "./pages/Tools";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminDashboardNew from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminSubscriptions from "./pages/admin/Subscriptions";
import AdminBookings from "./pages/admin/Bookings";
import AdminAuditLogs from "./pages/admin/AuditLogs";
import AdminChat from "./pages/admin/Chat";
import { AdminLayout } from "./components/AdminLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import MyConsultations from "./pages/MyConsultations";
import ConsultationDetail from "./pages/ConsultationDetail";
import ConsultantDashboard from "./pages/ConsultantDashboard";
import Profile from "./pages/Profile";
import ConsultationChat from "./pages/ConsultationChat";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import MyData from "./pages/MyData";
import DataProtectionContact from "./pages/DataProtectionContact";
import AdminDataRequests from "./pages/admin/DataRequests";
import AdminSecurityIncidents from "./pages/admin/SecurityIncidents";
import ConsultantRegister from "./pages/ConsultantRegister";
import CookiesPolicy from "./pages/CookiesPolicy";
import Payment from "./pages/Payment";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/signup"} component={AccountType} />
      <Route path={"/signup/employee"} component={SignupEmployee} />
      <Route path={"/signup/consultant"} component={SignupConsultant} />
      <Route path={"/login"} component={Login} />
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
            <Payment />
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
