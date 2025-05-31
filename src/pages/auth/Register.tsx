import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Eye,
  EyeOff,
  User,
  Users,
  GraduationCap,
  Shield,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";

/**
 * Registration page with role selection and form validation
 * Supports learner, parent, teacher, and admin roles
 */
const Register: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as "learner" | "parent" | "teacher" | "admin" | "",
    agreeToTerms: false,
    agreeToNewsletter: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthStore();
  const { addNotification } = useUIStore();
  const navigate = useNavigate();

  const roles = [
    {
      id: "learner",
      title: "Student/Learner",
      description: "Access interactive courses and track your progress",
      icon: User,
      color: "text-blue-600 bg-blue-100",
    },
    {
      id: "parent",
      title: "Parent/Guardian",
      description:
        "Monitor your child's learning progress and communicate with teachers",
      icon: Users,
      color: "text-green-600 bg-green-100",
    },
    {
      id: "teacher",
      title: "Teacher/Educator",
      description:
        "Create courses, manage students, and track learning analytics",
      icon: GraduationCap,
      color: "text-purple-600 bg-purple-100",
    },
    {
      id: "admin",
      title: "Administrator",
      description: "Manage platform users, courses, and system settings",
      icon: Shield,
      color: "text-red-600 bg-red-100",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRoleSelect = (role: typeof formData.role) => {
    setFormData((prev) => ({ ...prev, role }));
    setCurrentStep(2);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - replace with actual registration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock user data - replace with actual user data from API
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        name: formData.name,
        role: formData.role,
        avatar: "/api/placeholder/32/32",
        xp: formData.role === "learner" ? 0 : undefined,
        level: formData.role === "learner" ? 1 : undefined,
        badges: formData.role === "learner" ? [] : undefined,
      };

      const mockToken = "mock-jwt-token";

      login(newUser, mockToken);

      addNotification({
        type: "success",
        title: "Welcome to Maieutica!",
        message: "Your account has been created successfully.",
      });

      // Role-based redirect
      switch (newUser.role) {
        case "learner":
          navigate("/app");
          break;
        case "teacher":
          navigate("/teacher");
          break;
        case "parent":
          navigate("/parent");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/app");
      }
    } catch (error) {
      addNotification({
        type: "error",
        title: "Registration Failed",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 mb-6"
          >
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl text-primary-600">
              Maieutica
            </span>
          </Link>
          <h2 className="text-3xl font-extrabold text-foreground">
            {currentStep === 1 ? "Choose Your Role" : "Create Your Account"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {currentStep === 1
              ? "Select how you'll use the platform"
              : "Join thousands of learners worldwide"}
          </p>
        </div>

        {/* Step 1: Role Selection */}
        {currentStep === 1 && (
          <div className="space-y-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() =>
                  handleRoleSelect(role.id as typeof formData.role)
                }
                className="w-full p-4 border border-input rounded-lg hover:border-primary-600 hover:bg-muted/50 transition-all text-left group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${role.color}`}>
                    <role.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary-600 transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {role.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}

            <div className="text-center pt-4">
              <span className="text-muted-foreground">
                Already have an account?{" "}
              </span>
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-400 font-medium transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        )}

        {/* Step 2: Registration Form */}
        {currentStep === 2 && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Selected role display */}
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Registering as:</p>
              <p className="font-semibold text-primary-600 capitalize">
                {formData.role}
              </p>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs text-primary-600 hover:text-primary-400 mt-1"
              >
                Change role
              </button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${
                    errors.name ? "border-destructive" : "border-input"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${
                    errors.email ? "border-destructive" : "border-input"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 pr-12 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${
                      errors.password ? "border-destructive" : "border-input"
                    }`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 pr-12 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${
                      errors.confirmPassword
                        ? "border-destructive"
                        : "border-input"
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Terms and Newsletter */}
            <div className="space-y-3">
              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-ring border-input rounded mt-0.5"
                />
                <label
                  htmlFor="agreeToTerms"
                  className="ml-2 block text-sm text-muted-foreground"
                >
                  I agree to the{" "}
                  <Link
                    to="/legal/terms"
                    className="text-primary-600 hover:text-primary-400"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/legal/privacy"
                    className="text-primary-600 hover:text-primary-400"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-xs text-destructive">
                  {errors.agreeToTerms}
                </p>
              )}

              <div className="flex items-start">
                <input
                  id="agreeToNewsletter"
                  name="agreeToNewsletter"
                  type="checkbox"
                  checked={formData.agreeToNewsletter}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-ring border-input rounded mt-0.5"
                />
                <label
                  htmlFor="agreeToNewsletter"
                  className="ml-2 block text-sm text-muted-foreground"
                >
                  Send me educational tips and platform updates
                </label>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>

            {/* Sign in link */}
            <div className="text-center">
              <span className="text-muted-foreground">
                Already have an account?{" "}
              </span>
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-400 font-medium transition-colors"
              >
                Sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
