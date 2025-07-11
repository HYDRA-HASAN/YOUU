# React 3D Compliments Application

## Overview

This is a full-stack React application that creates an interactive 3D experience for displaying compliments and positive affirmations. The application features a Three.js-powered 3D scene with floating hearts, particles, and a beautiful sky background, combined with an Express.js backend for potential future API functionality. The frontend is built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server code:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **3D Graphics**: Three.js with React Three Fiber ecosystem (@react-three/fiber, @react-three/drei, @react-three/postprocessing)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: Zustand stores for different application concerns
- **Build Tool**: Vite with React plugin and custom configurations

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (currently using in-memory storage)
- **Session Management**: Configured for connect-pg-simple (not currently active)
- **Development**: Hot reloading with Vite middleware integration

## Key Components

### 3D Scene Components
- **Scene3D**: Main 3D scene coordinator with lighting setup
- **FloatingHearts**: Animated heart shapes that float through the scene
- **ParticleSystem**: Dynamic particle effects with pastel colors
- **BackgroundSky**: Sky with clouds and twinkling stars

### UI Components
- **ComplimentSection**: Interactive compliment display with rotation functionality
- **SmileButton**: Interactive button for positive feedback (referenced but not fully implemented)
- **MusicControls**: Audio control interface for background music
- **CursorFollower**: Custom cursor with trailing particle effects

### State Management Stores
- **useCompliments**: Manages compliment rotation and selection
- **useMusic**: Controls background music playback and muting
- **useAudio**: Handles sound effects (hit sounds, success sounds)
- **useGame**: Game state management (ready/playing/ended phases)

## Data Flow

1. **Initialization**: App component initializes music and renders 3D scene
2. **3D Rendering**: Canvas renders Scene3D with floating elements and particle systems
3. **User Interaction**: Click events trigger compliment rotation and audio feedback
4. **State Updates**: Zustand stores manage application state with subscriptions
5. **Audio Management**: Music and sound effects controlled through dedicated stores

## External Dependencies

### Core Libraries
- **React Three Fiber**: 3D scene management and rendering
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **Zustand**: Lightweight state management
- **Drizzle ORM**: Type-safe database operations
- **Vite**: Build tool and development server

### Database
- **Neon Database**: Serverless PostgreSQL (configured but not actively used)
- **Current Storage**: In-memory implementation for user management

### UI Enhancement
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant management
- **CLSX**: Conditional className utility

## Deployment Strategy

### Development
- Vite dev server for frontend with HMR
- Express server with TypeScript execution via tsx
- Integrated development setup with Vite middleware

### Production Build
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Assets**: Support for 3D models (.gltf, .glb) and audio files (.mp3, .ogg, .wav)
- **Database**: Drizzle migrations ready for PostgreSQL deployment

### Configuration Files
- **TypeScript**: Shared config for client, server, and shared modules
- **Tailwind**: Custom theming with CSS variables
- **PostCSS**: Tailwind and Autoprefixer processing
- **Drizzle**: PostgreSQL dialect with migration support

The application is designed to be easily deployable to platforms like Replit, Vercel, or similar services with minimal configuration changes needed for the database connection.