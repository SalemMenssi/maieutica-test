import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Play,
  Star,
  Users,
  Award,
  Gamepad2,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

/**
 * Landing Page - Hero section with value proposition and course preview
 * Features responsive design and conversion-focused layout
 */
const Index: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  // Redirect authenticated users to their dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {
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
    }
  }, [isAuthenticated, user, navigate]);

  // Sample courses for preview
  const featuredCourses = [
    {
      id: "1",
      title: "Interactive Mathematics",
      description: "Learn math through games and visual exercises",
      level: "Beginner",
      duration: "8 weeks",
      students: 1234,
      rating: 4.8,
      thumbnail: "/api/placeholder/300/200",
      instructor: "Dr. Sarah Chen",
    },
    {
      id: "2",
      title: "Creative Writing Workshop",
      description: "Express yourself through stories and poems",
      level: "Intermediate",
      duration: "6 weeks",
      students: 856,
      rating: 4.9,
      thumbnail: "/api/placeholder/300/200",
      instructor: "Prof. Michael Torres",
    },
    {
      id: "3",
      title: "Science Experiments",
      description: "Hands-on learning with fun experiments",
      level: "Beginner",
      duration: "10 weeks",
      students: 2341,
      rating: 4.7,
      thumbnail: "/api/placeholder/300/200",
      instructor: "Dr. Emma Wilson",
    },
  ];

  const testimonials = [
    {
      name: "Lisa Chen",
      role: "Parent",
      content:
        "My daughter loves the interactive lessons. Her math skills have improved dramatically!",
      avatar: "/api/placeholder/50/50",
    },
    {
      name: "Teacher Rodriguez",
      role: "Educator",
      content:
        "The platform makes it easy to track student progress and adapt teaching methods.",
      avatar: "/api/placeholder/50/50",
    },
    {
      name: "Alex Kim",
      role: "Student",
      content:
        "Learning feels like playing games. I never thought education could be this fun!",
      avatar: "/api/placeholder/50/50",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-primary-600">
                Maieutica
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/courses"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Courses
              </Link>
              <Link
                to="/pricing"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-light-tint/20 to-accent-300/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-extrabold text-balance">
                  Learn Through
                  <span className="text-primary-600"> Interactive </span>
                  Experiences
                </h1>
                <p className="text-xl text-muted-foreground text-balance">
                  Gamified learning platform that adapts to different learning
                  styles. Support for visual, auditory, and kinesthetic learners
                  with comics, mini-games, and interactive content.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>Start Learning Today</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="btn-secondary inline-flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="flex items-center space-x-3">
                  <Gamepad2 className="w-6 h-6 text-accent-500" />
                  <span className="font-semibold">Gamified Learning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6 text-accent-500" />
                  <span className="font-semibold">XP & Badges</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-accent-500" />
                  <span className="font-semibold">Parent Dashboard</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-accent-500" />
                  <span className="font-semibold">WCAG 2.2 AA</span>
                </div>
              </div>
            </div>

            {/* Hero image/video placeholder */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-400 to-accent-500 rounded-2xl aspect-video flex items-center justify-center">
                <Play className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">4.8/5</span>
                  <span className="text-muted-foreground text-sm">
                    from 2,500+ students
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">Popular Courses</h2>
            <p className="text-xl text-muted-foreground">
              Discover our most loved interactive learning experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="badge">{course.level}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">
                          {course.rating}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{course.duration}</span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {course.instructor}
                    </span>
                    <Link
                      to={`/course/${course.id}`}
                      className="text-primary-600 hover:text-primary-400 font-semibold text-sm"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses" className="btn-primary">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of learners, teachers, and parents
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm">
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Ready to Transform Learning?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join our community and start your interactive learning journey today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="font-extrabold text-lg text-primary-600">
                  Maieutica
                </span>
              </div>
              <p className="text-muted-foreground">
                Interactive learning platform designed for all learning styles.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link to="/courses" className="hover:text-foreground">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link to="/help" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link to="/legal/privacy" className="hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/legal/terms" className="hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal/accessibility"
                    className="hover:text-foreground"
                  >
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Maieutica. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
