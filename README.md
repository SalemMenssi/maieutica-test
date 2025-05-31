# Maieutica - Interactive Learning Platform

A comprehensive, gamified e-learning platform built with React 18, featuring multi-role support and accessibility-first design.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 📋 Demo Credentials

You can log in with any email and password to explore the platform:

- **Learner**: Experience gamified learning with XP tracking, badges, and interactive courses
- **Teacher**: Course creation and student management tools (coming soon)
- **Parent**: Child progress monitoring and teacher communication (coming soon)
- **Admin**: Platform administration and analytics (coming soon)

## 🎯 Key Features

### ✨ Gamified Learning Experience

- **XP System**: Earn experience points for completing lessons and activities
- **Leveling**: Progress through levels with animated level-up celebrations
- **Badges & Achievements**: Unlock rewards for various learning milestones
- **Study Streaks**: Track consecutive days of learning
- **Leaderboards**: Compete with friends and global learners

### 🎨 Design System

- **Modern UI**: Clean, accessible interface following WCAG 2.2 AA standards
- **Custom Color Palette**:
  - Primary: `#2E9780` (brand header, primary buttons)
  - Accent: `#68DCA3` (links, progress bars)
  - Light Tint: `#B0EC99` (backgrounds, cards)
- **Typography**: Inter font family (400/600/800 weights)
- **Responsive**: Mobile-first design with breakpoints at 640px, 768px, 1024px, 1280px

### 🏗️ Architecture

#### Frontend Stack

- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Router v6** for navigation

#### State Management

```typescript
// Authentication Store
AuthStore: user, token, role-based permissions

// UI Store
UIStore: theme, sidebar state, notifications

// Courses Store
CoursesStore: course data, progress tracking, filters
```

#### Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Core UI atoms (buttons, cards, etc.)
│   └── layout/        # Layout components (dashboard, navigation)
├── pages/             # Route-based page components
│   ├── auth/          # Login, register, password reset
│   ├── learner/       # Student dashboard and courses
│   ├── teacher/       # Instructor tools (placeholder)
│   ├── parent/        # Parent dashboard (placeholder)
│   └── admin/         # Administrative interface (placeholder)
├── store/             # Zustand state management
├── utils/             # Helper functions and utilities
└── styles/            # Global styles and theme
```

## 🔐 Multi-Role Authentication

The platform supports four distinct user roles:

### 👨‍🎓 Learner Dashboard

- Personal progress tracking with XP and levels
- Course enrollment and progress management
- Interactive lesson player with video and exercises
- Achievement system with badges
- Study streak tracking
- Weekly goal setting

### 👩‍🏫 Teacher Interface (Planned)

- Course creation wizard
- Student analytics and progress monitoring
- Live session scheduling
- Assignment and quiz creation
- Grade book management

### 👨‍👩‍👧‍👦 Parent Portal (Planned)

- Child progress overview
- Teacher communication channel
- Subscription and billing management
- Learning goal setting

### ⚙️ Admin Panel (Planned)

- User management (CRUD operations)
- Course moderation and approval
- Platform analytics and reporting
- System configuration

## 🎮 Gamification Features

### Experience Points (XP)

- Gain XP for completing lessons, exercises, and achievements
- Animated progress bars show XP gain in real-time
- Level-up celebrations with visual effects

### Badge System

- Unlock badges for various accomplishments:
  - 🔥 Week Warrior: 7-day study streak
  - ⚡ Quick Learner: Complete 3 lessons in one day
  - 🧮 Subject Master: Finish a complete course

### Progress Tracking

- Visual progress indicators for all courses
- Completion percentage tracking
- Time-based goals and achievements

## ♿ Accessibility Features

- **WCAG 2.2 AA Compliance**: Full keyboard navigation support
- **Focus Management**: Visible focus rings and logical tab order
- **Screen Reader Support**: Comprehensive ARIA labels and descriptions
- **Color Contrast**: All text meets AA contrast requirements
- **Responsive Design**: Fully functional on all device sizes

## 🎯 Development Guidelines

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Airbnb configuration with React hooks support
- **Prettier**: Consistent code formatting
- **Testing**: Jest + React Testing Library (≥80% coverage target)

### Performance

- **Code Splitting**: Route-based lazy loading
- **Bundle Analysis**: Webpack bundle analyzer integration
- **Lighthouse Optimization**: Target scores ≥90 for all metrics

### Accessibility Testing

```bash
# Run accessibility tests
npm run test:a11y

# Lighthouse CI for accessibility scoring
npm run lighthouse:a11y
```

## 🔧 Configuration

### Environment Variables

```env
# Development
VITE_APP_ENV=development
VITE_API_URL=http://localhost:3001

# Production (example)
VITE_APP_ENV=production
VITE_API_URL=https://api.Maieutica.com
```

### Theme Customization

The design system can be customized in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        600: '#2E9780',  // Main brand color
        400: '#3E8B70',  // Hover states
      },
      accent: {
        500: '#68DCA3',  // Links and progress
        300: '#81DC9C',  // Badges and passive states
      },
      'light-tint': '#B0EC99',  // Backgrounds
    }
  }
}
```

## 🚧 Roadmap

### Phase 1: Core Learning Platform ✅

- [x] Multi-role authentication
- [x] Learner dashboard with gamification
- [x] Course enrollment and progress tracking
- [x] Responsive design and accessibility

### Phase 2: Interactive Content (In Progress)

- [ ] Video player with transcripts and captions
- [ ] Interactive exercises (MCQ, drag-drop, typing)
- [ ] Whiteboard for live sessions
- [ ] File upload and resource management

### Phase 3: Social Learning

- [ ] Live video sessions with instructors
- [ ] Peer-to-peer chat and collaboration
- [ ] Discussion forums and Q&A
- [ ] Study groups and challenges

### Phase 4: Advanced Features

- [ ] AI-powered learning recommendations
- [ ] Adaptive learning paths
- [ ] Advanced analytics and reporting
- [ ] Mobile app (React Native)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Workflow

```bash
# Start development with hot reload
npm run dev

# Run tests in watch mode
npm run test:watch

# Type checking
npm run type-check

# Lint and format
npm run lint
npm run format
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Inter Font Family** by Google Fonts
- **Lucide Icons** for the comprehensive icon set
- **Tailwind CSS** for the utility-first styling approach
- **React Team** for the amazing framework

---

Built with ❤️ for learners everywhere. Start your interactive learning journey today!
