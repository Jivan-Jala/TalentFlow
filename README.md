# 🚀 TalentFlow - Modern Recruitment Platform

A comprehensive, modern recruitment management platform built with React, featuring advanced UI/UX, real-time analytics, and seamless candidate management.

![TalentFlow](https://img.shields.io/badge/TalentFlow-Recruitment%20Platform-orange?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=for-the-badge&logo=netlify)

## ✨ Features

### 🎯 **Core Functionality**
- **Job Management** - Create, edit, and track job postings with advanced filtering
- **Candidate Management** - Comprehensive candidate profiles with stage tracking
- **Assessment System** - Build and manage custom assessments for candidates
- **Analytics Dashboard** - Real-time insights and performance metrics
- **Settings & Preferences** - Customizable user experience

### 🎨 **Modern UI/UX**
- **Glass Morphism Design** - Modern, translucent interface elements
- **Parallax Effects** - Interactive background animations (disabled on mobile for performance)
- **3D Hover Animations** - Engaging micro-interactions
- **Fully Responsive Design** - Optimized for all device sizes with mobile-first approach
- **Mobile-Optimized** - Touch-friendly interfaces with performance optimizations
- **Dark/Light Theme** - Customizable appearance

### 📊 **Advanced Features**
- **Real-time Analytics** - Interactive charts and performance metrics
- **Drag & Drop Interface** - Intuitive candidate management
- **Virtual Scrolling** - Optimized for large datasets
- **Search & Filtering** - Advanced data discovery
- **Export Capabilities** - Data export and reporting
- **Mobile Performance** - Optimized animations and interactions for mobile devices
- **Touch-Friendly** - All interfaces designed for touch interactions

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router v6
- **Styling**: Tailwind CSS, Custom Components
- **State Management**: React Context, useReducer
- **Database**: IndexedDB (Dexie.js)
- **API Simulation**: MSW (Mock Service Worker)
- **Animations**: Framer Motion, CSS Transitions
- **Icons**: Lucide React
- **Build Tool**: Create React App

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Jivan-Jala/TalentFlow.git

# Navigate to project directory
cd TalentFlow

# Install dependencies
npm install

# Start development server
npm start
```

### Build for Production

```bash
# Create production build
npm run build

# The build folder contains optimized files for deployment
```


## 📱 Pages & Routes

### 🏠 **Home Page** (`/`) - Mobile Optimized ✅
- Modern landing page with hero section
- Feature highlights and testimonials
- Call-to-action buttons
- **Mobile**: Responsive text sizing, touch-friendly interactions

### 📊 **Dashboard** (`/dashboard`) - Mobile Optimized ✅
- Overview of key metrics
- Recent activities and statistics
- Interactive charts and visualizations
- **Mobile**: Single-column layout, optimized charts, touch-friendly navigation

### 💼 **Jobs Management** (`/dashboard/jobs`) - Mobile Optimized ✅
- Job posting creation and editing
- Advanced filtering and search
- Drag-and-drop job organization
- **Mobile**: Responsive forms, mobile-friendly filters, touch-optimized interactions

### 👥 **Candidates** (`/dashboard/candidates`) - Mobile Optimized ✅
- Candidate profile management
- Stage tracking and progression
- Kanban board view
- **Mobile**: Virtual scrolling, touch-friendly cards, responsive layouts

### 📝 **Assessments** (`/dashboard/assessments`) - Mobile Optimized ✅
- Custom assessment creation
- Question bank management
- Assessment analytics
- **Mobile**: Responsive forms, mobile-friendly question display, touch-optimized buttons

### 📈 **Analytics** (`/dashboard/analytics`) - Mobile Optimized ✅
- Performance metrics and KPIs
- Interactive charts and graphs
- Export capabilities
- **Mobile**: Single-column charts, responsive metrics, mobile-friendly controls

### ⚙️ **Settings** (`/dashboard/settings`) - Mobile Optimized ✅
- User preferences and configuration
- System settings and customization
- Data management options
- **Mobile**: Single-column forms, touch-friendly toggles, responsive navigation

## 🎨 Design System

### Color Palette
- **Primary**: Orange (#F97316)
- **Secondary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Headings**: Inter, system fonts
- **Body**: Inter, system fonts
- **Code**: JetBrains Mono

### Components
- **Cards**: Glass morphism with backdrop blur
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean, accessible input fields
- **Modals**: Overlay components with animations

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Sidebar)
│   └── ui/            # Base UI components
├── context/           # React Context providers
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # API services and utilities
├── utils/             # Utility functions
└── images/            # Static assets
```

### Key Features Implementation
- **State Management**: React Context with useReducer
- **Data Persistence**: IndexedDB with Dexie.js
- **API Simulation**: MSW for development
- **Routing**: React Router v6 with nested routes
- **Styling**: Tailwind CSS with custom components

## 📱 Mobile Optimization

### **Comprehensive Mobile Support**
- **Mobile-First Design**: All pages optimized for mobile devices
- **Touch-Friendly**: All interactive elements sized for touch
- **Performance Optimized**: Heavy animations disabled on mobile
- **Responsive Layouts**: Single-column layouts on mobile, multi-column on desktop
- **Mobile Navigation**: Optimized navigation tabs and menus
- **Form Optimization**: Mobile-friendly form layouts and inputs

### **Page-Specific Mobile Features**
- **Home**: Responsive hero sections, mobile-optimized animations
- **Dashboard**: Single-column metrics, touch-friendly charts
- **Jobs**: Mobile-friendly filters, responsive job cards
- **Candidates**: Virtual scrolling, touch-optimized candidate cards
- **Assessments**: Mobile-friendly question display, responsive forms
- **Analytics**: Single-column charts, mobile-optimized controls
- **Settings**: Single-column forms, touch-friendly toggles

### **Technical Implementation**
- **Mobile Detection**: Automatic viewport detection (< 768px)
- **Conditional Rendering**: Different layouts for mobile vs desktop
- **Performance**: Disabled parallax effects and complex animations on mobile
- **Touch Optimization**: All buttons and interactive elements properly sized
- **Responsive Typography**: Mobile-optimized text sizes and spacing

## 📊 Performance

- **Bundle Size**: Optimized for production
- **Loading Speed**: Fast initial load
- **Responsiveness**: Mobile-first design with comprehensive mobile optimization
- **Mobile Performance**: Disabled heavy animations on mobile for better performance
- **Touch Optimization**: All interfaces optimized for touch interactions
- **Accessibility**: WCAG compliant
- **Cross-Device**: Seamless experience across desktop, tablet, and mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


