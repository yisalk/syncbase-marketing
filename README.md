# Syncbase Frontend

A modern, responsive React frontend for Syncbase SaaS with beautiful UI components, animations, and dark theme support.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (tested with Node 22.18.0)

### Installation & Development

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open your browser:**
The application will automatically open at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Run TypeScript type checking

## 🎨 Features

- **Modern React 18** with TypeScript
- **Responsive Design** - Mobile-first approach
- **Dark/Light Theme** - Automatic theme switching
- **Beautiful UI Components** - Radix UI primitives
- **Smooth Animations** - Framer Motion integration
- **Tailwind CSS** - Utility-first styling
- **Component Library** - Reusable UI components

## 🏗️ Project Structure

```
src/
├── components/
│   ├── sections/     # Page sections (Hero, Features, etc.)
│   ├── ui/          # Reusable UI components
│   └── theme-provider.tsx
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and helpers
└── index.css        # Global styles
index.html           # HTML template
```

## 🎯 Page Sections

- **Hero** - Main value proposition and CTA
- **Problem** - Pain points addressed
- **Solution** - How Syncbase solves problems
- **Features** - Key features and benefits
- **Competitive** - Comparison with competitors
- **Pricing** - Pricing tiers and plans
- **Team** - Team member profiles
- **Footer** - Links and contact information

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animations
- **Wouter** - Lightweight routing
- **Lucide React** - Icons
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## 🎨 Styling

The project uses Tailwind CSS with a custom design system:

- **CSS Variables** for theming
- **Responsive breakpoints** for mobile-first design
- **Custom animations** with Tailwind CSS Animate
- **Dark mode support** with next-themes

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized static files ready for deployment to any static hosting service like:

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any CDN

### Preview Production Build

```bash
npm run preview
```

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Mobile** (320px+)
- **Tablet** (768px+)
- **Desktop** (1024px+)
- **Large screens** (1440px+)

## 🌙 Theme Support

- **Light theme** (default)
- **Dark theme** with smooth transitions
- **System preference** detection
- **Persistent theme** selection

## 🔧 Development

The development server includes:

- **Hot Module Replacement** (HMR)
- **TypeScript checking**
- **ESLint integration**
- **Automatic browser refresh**

## 📄 License

MIT License - feel free to use this project for your own SaaS landing page!