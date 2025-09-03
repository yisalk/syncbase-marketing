# Syncbase - Private AI Platform

## Overview

Syncbase is a comprehensive full-stack application that serves as a private AI platform for businesses. The project is designed as a marketing website and product platform that emphasizes data privacy, local AI deployment, and business intelligence. It features a React-based frontend with a complete component library, Express.js backend infrastructure, and is built to support local AI models with enterprise-grade security features.

The application is structured as a monorepo with client-side React components, server-side Express APIs, and shared TypeScript schemas. It's designed to showcase and eventually deliver a product that allows businesses to run AI analytics on their own infrastructure without compromising data privacy.

**Recent Update (2025-08-01)**: Added comprehensive production deployment configuration with database support, environment variable validation, session management, and production-ready error handling.

**Critical Fix (2025-08-01)**: Resolved deployment timeout issues by implementing non-blocking database validation and improved Supabase compatibility.

## Production Deployment Configuration

### Implemented Fixes for Deployment Issues

1. **Database Configuration**
   - Created `server/db.ts` with PostgreSQL connection management using Drizzle ORM
   - Implemented database connection validation for production startup
   - Added fallback to in-memory storage for development environment

2. **Environment Variable Management**
   - Created `server/env.ts` with Zod-based validation
   - Required `DATABASE_URL` and `SESSION_SECRET` in production
   - Optional database configuration in development with secure defaults

3. **Session Management**
   - Configured express-session with secure cookie settings
   - Production-ready session configuration with proper security flags
   - Development fallback session secret for testing

4. **Static File Serving**
   - Fixed production build path issues with post-build script
   - Proper static file copying from `dist/public` to `server/public`
   - Build process now compatible with production deployment

5. **Database Migration System**
   - Created `server/migrate.ts` for running database migrations
   - Automated migration setup in deployment scripts
   - Production database schema initialization

6. **Deployment Scripts**
   - `scripts/deploy-setup.js` - Comprehensive deployment preparation
   - `scripts/post-build.js` - Static file management
   - `README.md` - Complete deployment documentation

### Critical Deployment Timeout Fixes (2025-08-01)

**Problem**: Database connection timeout preventing server from starting on port 5000 during deployment.

**Root Cause**: Synchronous database validation blocking server startup process.

**Implemented Solutions**:

1. **Non-blocking Database Validation**
   - Moved database validation from startup sequence to background process
   - Server now starts immediately and validates database connection after port binding
   - Added `validateDatabaseConnectionInBackground()` function for post-startup validation

2. **Improved Supabase Compatibility** 
   - Enhanced PostgreSQL client configuration with proper timeout settings:
     - `connect_timeout: 10` seconds
     - `idle_timeout: 20` seconds  
     - `max_lifetime: 60 * 30` (30 minutes)
     - `max: 10` connection pool size
   - Added connection transformation for snake_case to camelCase conversion
   - Disabled PostgreSQL notices to reduce connection noise

3. **Resilient Database Validation**
   - Implemented 30-second timeout wrapper for validation queries
   - Changed from table-specific query to simple `SELECT 1` test
   - Enhanced error handling with proper TypeScript error typing
   - Non-blocking error logging that doesn't crash the application

**Result**: Server can now start immediately on port 5000 while database validation runs safely in the background, preventing deployment timeouts while maintaining database connectivity verification.

### Environment Variables for Production

Required for production deployment:
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secure random string (minimum 32 characters)
- `NODE_ENV`: Set to 'production'
- `PORT`: Server port (defaults to 5000)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: Comprehensive shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system and CSS variables
- **Build Tool**: Vite with custom configuration for development and production
- **Component Structure**: Modular section-based components (Hero, Problem, Solution, Features, etc.)

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js with middleware for JSON parsing and request logging
- **Architecture Pattern**: RESTful API design with modular route registration
- **Development Setup**: Custom Vite integration for hot module replacement during development
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Storage Interface**: Abstracted storage layer with both in-memory and database implementations
- **Session Management**: Express-session with secure cookie configuration
- **Environment Validation**: Zod-based environment variable validation with development/production modes
- **Production Ready**: Comprehensive error handling, database connection validation, and deployment scripts

### Database and Data Management
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Management**: Centralized schema definitions in shared directory
- **Validation**: Zod schemas for runtime type validation
- **Migration Strategy**: Drizzle Kit for database migrations and schema changes
- **Connection**: Neon Database serverless PostgreSQL connection with automatic fallback to in-memory storage
- **Environment Configuration**: Conditional database requirements (required in production, optional in development)
- **Migration Management**: Automated migration generation and deployment scripts

### Component and Design System
- **Design Tokens**: CSS custom properties for consistent theming
- **Component Library**: Complete set of reusable UI components (buttons, cards, forms, navigation, etc.)
- **Animation**: Framer Motion for smooth transitions and interactions
- **Responsive Design**: Mobile-first approach with breakpoint-based responsive design
- **Accessibility**: Radix UI primitives ensure ARIA compliance and keyboard navigation

### Development and Build Process
- **Package Management**: npm with lock file for dependency consistency
- **TypeScript Configuration**: Strict type checking with module path mapping
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation
- **Development Server**: Integrated development setup with hot reloading for both frontend and backend
- **Production Build**: Optimized build process with static file management and deployment preparation
- **Deployment Scripts**: Automated setup scripts for production deployment configuration

## External Dependencies

### Core Framework Dependencies
- **React**: Frontend framework with hooks and modern patterns
- **Express.js**: Backend web framework for API development
- **TypeScript**: Type safety across the entire application stack

### UI and Component Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **shadcn/ui**: Pre-built component library built on Radix UI
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth user interactions
- **Lucide React**: Icon library for consistent iconography

### Data and State Management
- **TanStack React Query**: Server state management and caching
- **Drizzle ORM**: Type-safe ORM for database operations
- **Zod**: Runtime type validation and schema definition
- **React Hook Form**: Form state management and validation

### Database and Infrastructure
- **Neon Database**: Serverless PostgreSQL database service
- **Drizzle Kit**: Database migration and schema management tools

### Development Tools
- **Vite**: Build tool and development server
- **esbuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration
- **tsx**: TypeScript execution for development

### Routing and Navigation
- **Wouter**: Lightweight client-side routing library

The application is designed to be deployment-ready with both development and production build configurations, comprehensive error handling, and a scalable architecture that can support the addition of AI features and database integrations as the product evolves.