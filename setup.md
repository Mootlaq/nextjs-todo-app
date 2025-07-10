# 🚀 Project Setup Guide

## Prerequisites

- Node.js (v18+ recommended)
- npm (comes with Node.js)
- VS Code (recommended IDE)
- Git (for version control)
- Vercel account (for deployment)

## Initial Setup

### 1. Project Creation
```bash
npx create-next-app@latest nextjs-todo-app --typescript --tailwind --eslint --app --src-dir --import-alias="@/*" --yes
cd nextjs-todo-app
```

### 2. Install Additional Dependencies
```bash
# Authentication
npm install next-auth
npm install @auth/prisma-adapter

# Database & ORM
npm install prisma @prisma/client
npm install @types/sqlite3

# UI Components (optional, for enhanced styling)
npm install lucide-react
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu

# Development dependencies
npm install -D prisma
```

### 3. Environment Variables Setup
Create a `.env.local` file in the root directory:
```bash
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Tools Setup

### VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prisma
- GitLens
- Auto Rename Tag
- Bracket Pair Colorizer

### Useful Commands
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes to database
npx prisma studio    # Open Prisma Studio (database GUI)

# Deployment
vercel               # Deploy to Vercel
```

## Project Structure Overview
See `structure.md` for detailed folder structure explanation.

## Implementation Plan
See `implementation-plan.md` for development roadmap and feature checklist. 