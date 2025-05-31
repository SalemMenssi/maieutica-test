import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/learner/Dashboard";
import MyCourses from "./pages/learner/MyCourses";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Learner Pages (no auth required) */}
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="courses" element={<MyCourses />} />
              <Route
                path="course/:id/learn"
                element={
                  <div className="p-6">Learning Player - Coming Soon</div>
                }
              />
              <Route
                path="leaderboard"
                element={<div className="p-6">Leaderboard - Coming Soon</div>}
              />
              <Route
                path="profile"
                element={<div className="p-6">Profile - Coming Soon</div>}
              />
              <Route
                path="settings"
                element={<div className="p-6">Settings - Coming Soon</div>}
              />
            </Route>

            {/* Other Roles - Public Access for Now */}
            <Route
              path="/teacher/*"
              element={
                <div className="min-h-screen bg-background p-6">
                  <h1 className="text-3xl font-bold">
                    Teacher Dashboard - Coming Soon
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Course creation, student management, and analytics will be
                    available here.
                  </p>
                </div>
              }
            />
            <Route
              path="/parent/*"
              element={
                <div className="min-h-screen bg-background p-6">
                  <h1 className="text-3xl font-bold">
                    Parent Dashboard - Coming Soon
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Child progress tracking and teacher communication will be
                    available here.
                  </p>
                </div>
              }
            />
            <Route
              path="/admin/*"
              element={
                <div className="min-h-screen bg-background p-6">
                  <h1 className="text-3xl font-bold">
                    Admin Dashboard - Coming Soon
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    User management, course moderation, and system analytics
                    will be available here.
                  </p>
                </div>
              }
            />

            {/* Public Static Pages */}
            <Route
              path="/courses"
              element={
                <div className="min-h-screen bg-background p-6">
                  Course Catalog - Coming Soon
                </div>
              }
            />
            <Route
              path="/course/:id"
              element={
                <div className="min-h-screen bg-background p-6">
                  Course Details - Coming Soon
                </div>
              }
            />
            <Route
              path="/pricing"
              element={
                <div className="min-h-screen bg-background p-6">
                  Pricing - Coming Soon
                </div>
              }
            />
            <Route
              path="/about"
              element={
                <div className="min-h-screen bg-background p-6">
                  About - Coming Soon
                </div>
              }
            />
            <Route
              path="/contact"
              element={
                <div className="min-h-screen bg-background p-6">
                  Contact - Coming Soon
                </div>
              }
            />
            <Route
              path="/legal/privacy"
              element={
                <div className="min-h-screen bg-background p-6">
                  Privacy Policy - Coming Soon
                </div>
              }
            />
            <Route
              path="/legal/terms"
              element={
                <div className="min-h-screen bg-background p-6">
                  Terms of Service - Coming Soon
                </div>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
