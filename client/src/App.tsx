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
import Reports from "./pages/dashboard/Reports";
import Settings from "./pages/dashboard/Settings";
import BrandPreview from "./pages/BrandPreview";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
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
