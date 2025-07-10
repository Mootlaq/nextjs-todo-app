# 📁 Project Structure

## Overview
This Next.js to-do application follows the App Router pattern with a clean, organized structure that separates concerns and maintains scalability.

```
nextjs-todo-app/
├── .git/                      # Git repository
├── .next/                     # Next.js build output (auto-generated)
├── node_modules/              # npm dependencies
├── prisma/                    # Database schema and migrations
│   ├── schema.prisma          # Database schema definition
│   └── migrations/            # Database migration files
├── public/                    # Static assets
│   ├── favicon.ico           # Website favicon
│   └── images/               # Static images
├── src/                      # Source code
│   └── app/                  # App Router directory
│       ├── api/              # API routes
│       │   ├── auth/         # Authentication endpoints
│       │   └── todos/        # Todo CRUD endpoints
│       ├── components/       # Reusable React components
│       │   ├── ui/           # Base UI components
│       │   ├── TodoList.tsx  # Todo list component
│       │   ├── TodoItem.tsx  # Individual todo component
│       │   └── AuthButton.tsx # Authentication button
│       ├── lib/              # Utility functions and configurations
│       │   ├── prisma.ts     # Prisma client setup
│       │   ├── auth.ts       # NextAuth configuration
│       │   └── utils.ts      # General utilities
│       ├── types/            # TypeScript type definitions
│       │   └── index.ts      # Shared types
│       ├── globals.css       # Global CSS styles
│       ├── layout.tsx        # Root layout component
│       └── page.tsx          # Home page
├── .env.local                # Environment variables (not in git)
├── .gitignore               # Git ignore patterns
├── eslint.config.mjs        # ESLint configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Project dependencies and scripts
├── postcss.config.mjs       # PostCSS configuration for Tailwind
├── README.md                # Project documentation
├── setup.md                 # Setup instructions
├── structure.md             # This file - project structure
├── implementation-plan.md   # Development roadmap
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Directory Explanations

### `/src/app/` (App Router)
Next.js 13+ App Router structure. Each folder represents a route, and special files have specific purposes:
- `page.tsx` - Page component for that route
- `layout.tsx` - Layout wrapper for the route and its children
- `loading.tsx` - Loading UI component
- `error.tsx` - Error UI component
- `not-found.tsx` - 404 page component

### `/src/app/api/` (API Routes)
Server-side API endpoints following REST conventions:
- `api/auth/` - Authentication endpoints (NextAuth.js)
- `api/todos/` - Todo CRUD operations
  - `GET /api/todos` - Fetch all todos
  - `POST /api/todos` - Create new todo
  - `PUT /api/todos/[id]` - Update specific todo
  - `DELETE /api/todos/[id]` - Delete specific todo

### `/src/components/`
Reusable React components organized by feature:
- `ui/` - Base UI components (buttons, inputs, modals)
- Feature-specific components (TodoList, TodoItem, etc.)

### `/src/lib/`
Utility functions and configurations:
- `prisma.ts` - Database client setup and connection
- `auth.ts` - NextAuth.js configuration and providers
- `utils.ts` - Helper functions and utilities

### `/src/types/`
TypeScript type definitions for type safety across the application.

### `/prisma/`
Database-related files:
- `schema.prisma` - Database schema definition
- Generated migration files for database version control

## Key Files

### Configuration Files
- `next.config.ts` - Next.js framework configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.mjs` - Code linting rules

### Environment Files
- `.env.local` - Local environment variables (database URL, auth secrets)
- `.env.example` - Template for environment variables

## Naming Conventions

### Files
- Components: PascalCase (e.g., `TodoList.tsx`)
- Pages: lowercase (e.g., `page.tsx`)
- Utilities: camelCase (e.g., `utils.ts`)
- Types: PascalCase (e.g., `Todo.ts`)

### Folders
- Routes: lowercase with hyphens (e.g., `todo-list/`)
- Components: PascalCase (e.g., `TodoComponents/`)
- Utilities: lowercase (e.g., `lib/`, `utils/`)

## Architecture Benefits

1. **Separation of Concerns**: Clear distinction between UI, API, and data layers
2. **Scalability**: Modular structure allows easy addition of new features
3. **Type Safety**: TypeScript throughout ensures runtime reliability
4. **Performance**: Next.js optimizations with App Router
5. **Maintainability**: Consistent structure and naming conventions 