import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  User,
  Settings,
  Bell,
  Search,
  Menu,
  LogOut,
  Trophy,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";
import { XPProgressBar } from "@/components/ui/XPProgressBar";
import "./HeroCard.css";
import logo from "./avatar.jpg";
import image from "./hh.jpg";

// Static user (default to learner)
const user = {
  name: "John Doe",
  role: "learner",
  avatar: "/api/placeholder/32/32",
  xp: 420,
  level: 3,
};

export const DashboardLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar, notifications } = useUIStore();
  const location = useLocation();
  const navigate = useNavigate();

  const getNavigationItems = () => {
    const baseItems = [
      { path: "/app", icon: Home, label: "Overview" },
      { path: "/app/courses", icon: BookOpen, label: "My Courses" },
    ];

    switch (user.role) {
      case "learner":
        return [
          ...baseItems,
          { path: "/app/leaderboard", icon: Trophy, label: "Leaderboard" },
          { path: "/app/profile", icon: User, label: "Profile" },
        ];
      case "teacher":
        return [
          { path: "/teacher", icon: Home, label: "Dashboard" },
          { path: "/teacher/courses", icon: BookOpen, label: "My Courses" },
          { path: "/teacher/students", icon: User, label: "Students" },
          { path: "/teacher/analytics", icon: Trophy, label: "Analytics" },
        ];
      case "parent":
        return [
          { path: "/parent", icon: Home, label: "Overview" },
          { path: "/parent/children", icon: User, label: "Children" },
          { path: "/parent/messages", icon: MessageCircle, label: "Messages" },
        ];
      case "admin":
        return [
          { path: "/admin", icon: Home, label: "Dashboard" },
          { path: "/admin/users", icon: User, label: "Users" },
          { path: "/admin/courses", icon: BookOpen, label: "Courses" },
          { path: "/admin/analytics", icon: Trophy, label: "Analytics" },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-card border-r transition-all duration-300 flex flex-col",
          sidebarOpen ? "w-64" : "w-16",
          "lg:relative absolute z-30",
          !sidebarOpen && "lg:block hidden"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <span className="font-extrabold text-lg text-primary-600">
                Maieutica
              </span>
            )}
          </div>
        </div>

        {/* XP Bar */}
        {user.role === "learner" && sidebarOpen && (
          <div className="p-4 border-b">
            <XPProgressBar
              currentXP={user.xp || 0}
              maxXP={1000}
              level={user.level || 1}
            />
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                      "hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring",
                      isActive &&
                        "bg-primary-600 text-white hover:bg-primary-600",
                      !isActive && "text-muted-foreground hover:text-foreground"
                    )}
                    aria-label={item.label}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3 mb-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user.role}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full",
              "hover:bg-destructive hover:text-destructive-foreground text-muted-foreground"
            )}
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-20"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-card border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-muted rounded-lg lg:hidden"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search courses, lessons..."
                  className="pl-10 pr-4 py-2 bg-muted rounded-lg border-0 focus:ring-2 focus:ring-ring w-64"
                  aria-label="Search"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="relative p-2 hover:bg-muted rounded-lg"
                aria-label={`Notifications (${notifications.length} new)`}
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              <Link
                to="/app/settings"
                className="p-2 hover:bg-muted rounded-lg"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="flex flex-wrap justify-center py-10">
            <div className="first hero">
              <img src={image} alt="" className="image" />
              <div className="text"></div>
              <div className="logo">
                <img src={logo} alt="Logo" />
              </div>
              <div className="main-text">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <div className="date">
                <p>30.11.2022</p>
              </div>
              <div className="hero-btn">
                <a href="#">Learn More</a>
              </div>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
