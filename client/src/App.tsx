import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
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
import Tools from "./pages/dashboard/Tools";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import CaseStudies from "./pages/CaseStudies";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={FAQ} />
      <Route path="/blog" component={Blog} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/cookies" component={Cookies} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path={"/tools/end-of-service"} component={EndOfServiceCalculator} />
      <Route path={"/tools/leave-calculator"} component={LeaveCalculator} />
      <Route path={"/tools/letter-generator"} component={LetterGenerator} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/dashboard" component={CompanyDashboard} />
      <Route path="/dashboard/employees" component={Employees} />
      <Route path="/dashboard/ats" component={ATS} />
      <Route path="/dashboard/tickets" component={Tickets} />
      <Route path="/dashboard/tasks" component={Tasks} />
      <Route path="/dashboard/reports" component={Reports} />
      <Route path="/dashboard/settings" component={Settings} />
      <Route path="/dashboard/certificates" component={Certificates} />
      <Route path="/dashboard/legal-check" component={LegalCheck} />
      <Route path="/dashboard/templates" component={Templates} />
      <Route path="/dashboard/reminders" component={Reminders} />
      <Route path="/dashboard/tools" component={Tools} />
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
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
