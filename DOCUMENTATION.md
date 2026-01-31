# FlowLance - Freelance Client Portal Platform

## Complete Documentation

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [User Roles & Permissions](#user-roles--permissions)
5. [Authentication System](#authentication-system)
6. [Core Features](#core-features)
7. [Page-by-Page Breakdown](#page-by-page-breakdown)
8. [Component Library](#component-library)
9. [Theme & Design System](#theme--design-system)
10. [Form Validation](#form-validation)
11. [Demo Credentials](#demo-credentials)
12. [Future Backend Integration](#future-backend-integration)

---

## Overview

FlowLance is a comprehensive freelance client portal platform designed to streamline the workflow between freelancers and their clients. The platform provides:

- **Smart Project Hub**: Centralized project management with deliverable tracking
- **Visual Approval Workflow**: One-click approval system for client deliverables
- **Payment Tracker**: Invoice management with payment status tracking
- **Client Testimonial Collector**: Built-in feedback and testimonial system

### Key UX Priorities

- Simple, intuitive client experience
- Mobile-first responsive design
- WhatsApp-style instant notifications
- Professional UI inspired by Notion, Linear, and other modern SaaS platforms

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend framework |
| **TypeScript** | Type safety and developer experience |
| **Vite** | Build tool and dev server |
| **Material UI v7** | Component library |
| **React Router v6** | Client-side routing |
| **Formik** | Form state management |
| **Zod** | Schema validation |
| **Context API** | State management (Auth, App) |
| **notistack** | Toast notifications |
| **dayjs** | Date manipulation |

---

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── EmptyState.tsx
│   │   ├── FileUploadZone.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── Logo.tsx
│   │   ├── SearchInput.tsx
│   │   ├── StatCard.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── UserAvatar.tsx
│   │   └── index.ts
│   ├── landing/          # Landing page sections
│   │   ├── CTASection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── PricingSection.tsx
│   │   ├── ProblemSection.tsx
│   │   └── index.ts
│   └── layout/           # Layout components
│       ├── AuthLayout.tsx
│       ├── DashboardLayout.tsx
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── index.ts
├── context/
│   ├── AppContext.tsx    # Application state (sidebar, theme)
│   └── AuthContext.tsx   # Authentication state & demo users
├── data/
│   └── mockData.ts       # Mock data for all entities
├── pages/
│   ├── auth/
│   │   ├── ForgotPasswordPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── SignupPage.tsx
│   ├── client-portal/
│   │   └── ClientPortalPage.tsx
│   ├── clients/
│   │   └── ClientsPage.tsx
│   ├── dashboard/
│   │   └── DashboardPage.tsx
│   ├── error/
│   │   └── NotFoundPage.tsx
│   ├── invoices/
│   │   └── InvoicesPage.tsx
│   ├── landing/
│   │   └── LandingPage.tsx
│   ├── legal/
│   │   ├── PrivacyPage.tsx
│   │   └── TermsPage.tsx
│   ├── projects/
│   │   ├── ProjectDetailPage.tsx
│   │   └── ProjectsPage.tsx
│   └── settings/
│       └── SettingsPage.tsx
├── theme/
│   └── theme.ts          # MUI theme configuration
├── types/
│   └── index.ts          # TypeScript interfaces
├── utils/
│   ├── helpers.ts        # Utility functions
│   └── validationSchemas.ts  # Zod schemas
├── App.tsx               # Main app with routing
├── main.tsx              # Entry point
└── index.css             # Global styles
```

---

## User Roles & Permissions

### Role Definitions

| Role | Description |
|------|-------------|
| **Freelancer** | Platform owner with full access to all features |
| **Client** | External client who reviews work and pays invoices |
| **Team Member** | Freelancer's team with limited access |
| **Client Sub User** | Client's team member with view-only access |

### Permission Matrix

| Feature | Freelancer | Client | Team Member | Client Reviewer |
|---------|:----------:|:------:|:-----------:|:---------------:|
| **Dashboard** |
| View full stats | ✅ | ❌ | ❌ | ❌ |
| View revenue data | ✅ | ❌ | ❌ | ❌ |
| View pending approvals | ✅ | ✅ | ✅ | ✅ |
| Quick actions | ✅ | ❌ | ❌ | ❌ |
| **Projects** |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Edit project | ✅ | ❌ | ✅ | ❌ |
| Delete project | ✅ | ❌ | ❌ | ❌ |
| Archive project | ✅ | ❌ | ❌ | ❌ |
| Approve deliverables | ❌ | ✅ | ❌ | ❌ |
| Request changes | ❌ | ✅ | ❌ | ❌ |
| Add comments | ✅ | ✅ | ✅ | ✅ |
| Upload deliverables | ✅ | ❌ | ✅ | ❌ |
| **Clients** |
| View clients | ✅ | ❌ | ✅ | ❌ |
| Add client | ✅ | ❌ | ❌ | ❌ |
| Edit client | ✅ | ❌ | ❌ | ❌ |
| Delete client | ✅ | ❌ | ❌ | ❌ |
| View revenue | ✅ | ❌ | ❌ | ❌ |
| **Invoices** |
| Create invoice | ✅ | ❌ | ❌ | ❌ |
| Edit invoice | ✅ | ❌ | ❌ | ❌ |
| Delete invoice | ✅ | ❌ | ❌ | ❌ |
| Send reminder | ✅ | ❌ | ❌ | ❌ |
| Mark as paid | ✅ | ❌ | ❌ | ❌ |
| Pay invoice | ❌ | ✅ | ❌ | ❌ |
| Download PDF | ✅ | ✅ | ✅ | ✅ |
| View summary | ✅ | ✅ | ❌ | ❌ |
| **Settings** |
| Profile tab | ✅ | ✅ | ✅ | 👁️ |
| Branding tab | ✅ | ❌ | ❌ | ❌ |
| Notifications tab | ✅ | ✅ | ✅ | ❌ |
| Billing tab | ✅ | ❌ | ❌ | ❌ |

*Legend: ✅ = Full Access, ❌ = No Access, 👁️ = View Only*

---

## Authentication System

### Demo Users Configuration

```typescript
const DEMO_USERS = {
  freelancer: {
    id: 'user-freelancer-001',
    email: 'freelancer@flowlance.com',
    password: 'Demo1234',
    fullName: 'Alex Morgan',
    role: 'freelancer',
    businessName: 'Morgan Design Studio',
  },
  client: {
    id: 'user-client-001',
    email: 'client@company.com',
    password: 'Demo1234',
    fullName: 'Sarah Johnson',
    role: 'client',
    company: 'TechCorp Inc.',
  },
  team_member: {
    id: 'user-team-001',
    email: 'team@flowlance.com',
    password: 'Demo1234',
    fullName: 'Jordan Lee',
    role: 'team_member',
    businessName: 'Morgan Design Studio',
  },
  client_sub_user: {
    id: 'user-client-sub-001',
    email: 'reviewer@company.com',
    password: 'Demo1234',
    fullName: 'Mike Chen',
    role: 'client_sub_user',
    company: 'TechCorp Inc.',
  },
};
```

### Auth Context Features

- `user` - Current authenticated user
- `isAuthenticated` - Boolean auth status
- `isLoading` - Loading state during auth operations
- `login(email, password)` - Authenticate user
- `logout()` - Clear user session
- `signup(data)` - Create new account (demo mode)

### Session Persistence

User session is stored in `localStorage` and automatically restored on app load.

---

## Core Features

### 1. Smart Project Hub

**Purpose**: Centralized project management for freelancers and clients.

**Features**:
- Project creation with client assignment
- Multiple project statuses: `not_started`, `in_progress`, `in_review`, `approved`, `delivered`
- Deliverable management with file uploads
- Version tracking for deliverables
- Payment progress tracking per project

**Status Filters**:
- Freelancer: All, In Progress, In Review, Approved, Delivered
- Client: All, Needs Review, In Progress, Approved, Delivered

### 2. Visual Approval Workflow

**Purpose**: Streamline the client review and approval process.

**Features**:
- One-click approval for deliverables
- Request changes with feedback
- Deliverable statuses: `pending_review`, `approved`, `changes_requested`
- Activity timeline tracking all actions
- WhatsApp-style notification system

**Client Actions**:
- Approve deliverable
- Request changes with comment
- Download deliverable

**Freelancer Actions**:
- Upload new deliverable
- Upload new version
- View feedback

### 3. Payment Tracker

**Purpose**: Complete invoice and payment management.

**Features**:
- Invoice creation linked to projects
- Multiple payment statuses: `draft`, `sent`, `viewed`, `paid`, `overdue`
- Payment reminders
- PDF download
- Summary cards showing totals

**Status Filters**:
- Freelancer: All, Paid, Sent, Viewed, Overdue
- Client: All, Unpaid, Overdue, Paid

### 4. Client Portal

**Purpose**: Branded external access for clients.

**Features**:
- Custom subdomain (e.g., `flowlance.com/clientname`)
- Custom branding (logo, colors)
- Project overview
- Deliverable review
- Invoice payments
- Testimonial submission

---

## Page-by-Page Breakdown

### Landing Page (`/`)

**Sections**:
1. **Hero Section**: Main value proposition with email capture
2. **Problem Section**: Pain points addressed
3. **Features Section**: Three core features showcase
4. **Pricing Section**: Three pricing tiers
5. **FAQ Section**: Common questions accordion
6. **CTA Section**: Final conversion call-to-action
7. **Footer**: Navigation links and social

### Login Page (`/login`)

**Features**:
- Email/password form with validation
- Social login buttons (Google, Apple - UI only)
- Demo credential cards for all 4 roles
- One-click login for demo roles
- Copy credentials button
- Link to signup and forgot password

### Dashboard (`/dashboard`)

**Role-Specific Views**:

**Freelancer Dashboard**:
- Stats: Active Projects, Pending Approvals, Unpaid Invoices, Monthly Revenue
- Recent Projects table with payment progress
- Pending Payments sidebar
- Quick Actions: New Project, Add Client, Create Invoice

**Client Dashboard**:
- Stats: Your Projects, Pending Review, Unpaid Invoices, Total Paid
- Alert banner for pending approvals
- Pending Approvals table with Review buttons
- Outstanding Invoices with Pay Now buttons

**Team Member Dashboard**:
- Stats: Assigned Projects, Pending Approvals, Completed This Week, Due Today
- Warning about restricted features
- Assigned Projects table with Upload buttons
- Recent Activity feed

**Client Reviewer Dashboard**:
- Stats: Projects to Review, New Deliverables, Pending Invoices
- Info alert about view-only access
- Shared Projects table with View buttons

### Projects Page (`/projects`)

**Features**:
- Grid layout with project cards
- Status filters with counts
- Search functionality
- Role-specific actions in context menu

**Project Card Displays**:
- Project name and status badge
- Client/Freelancer avatar and name (role-dependent)
- Deliverable count and pending approvals
- Payment progress bar (freelancer/client only)
- Last updated timestamp

### Project Detail Page (`/projects/:id`)

**Tabs**:
1. **Deliverables**: File list with preview, status, actions
2. **Payments**: Invoice list with status and amounts
3. **Activity**: Timeline of all project events

**Role-Specific Actions**:
- Freelancer: Upload, Edit, Delete, Create Invoice
- Client: Approve, Request Changes, Pay Invoice
- Team Member: Upload, View
- Client Reviewer: View, Comment

### Clients Page (`/clients`)

**Access**: Freelancer and Team Member only

**Features**:
- Client cards with avatar, contact info, stats
- Search by name, company, or email
- Add client dialog
- Context menu: View Projects, Edit, Delete

**Displayed Info**:
- Name and company
- Email and phone
- Active projects count
- Total paid (freelancer only)
- Last activity timestamp

### Invoices Page (`/invoices`)

**Features**:
- Summary cards: Total Paid, Pending, Overdue, Count
- Status filter tabs
- Searchable invoice table
- Role-specific actions

**Table Columns**:
- Invoice number and description
- Client/From (role-dependent)
- Project name
- Amount
- Due date
- Status badge
- Action buttons

**Role-Specific Actions**:
- Freelancer: Send Reminder, Mark as Paid, Delete
- Client: Pay Now button
- All: Download PDF

### Settings Page (`/settings`)

**Tabs by Role**:

| Role | Available Tabs |
|------|---------------|
| Freelancer | Profile, Branding, Notifications, Billing |
| Client | Profile, Notifications |
| Team Member | Profile, Notifications |
| Client Reviewer | Profile (view-only) |

**Profile Tab**:
- Avatar upload
- Name, email, phone
- Business name (freelancer/team) or Company (client)

**Branding Tab** (Freelancer only):
- Logo upload
- Brand color picker
- Portal URL customization

**Notifications Tab**:
- Email notification toggles
- Role-specific options

**Billing Tab** (Freelancer only):
- Current plan display
- Subscription management
- Payment method

---

## Component Library

### Common Components

| Component | Description | Props |
|-----------|-------------|-------|
| `Logo` | Brand logo display | `size?: 'small' \| 'medium' \| 'large'` |
| `StatusBadge` | Status chip display | `status, type: 'project' \| 'payment' \| 'deliverable'` |
| `EmptyState` | Empty content placeholder | `title, description, action?` |
| `StatCard` | Dashboard stat display | `title, value, icon, color, trend?, subtitle?` |
| `LoadingScreen` | Full-screen loader | - |
| `UserAvatar` | User avatar with initials | `name, size?, src?` |
| `SearchInput` | Styled search field | Standard TextField props |
| `FileUploadZone` | Drag-drop file upload | `onUpload, accept?, maxSize?` |

### Layout Components

| Component | Description |
|-----------|-------------|
| `DashboardLayout` | Main app layout with sidebar and header |
| `AuthLayout` | Centered card layout for auth pages |
| `Sidebar` | Role-based navigation sidebar |
| `Header` | Top bar with search, notifications, profile |

---

## Theme & Design System

### Color Palette

```typescript
const colors = {
  primary: {
    main: '#4F46E5',    // Indigo
    light: '#818CF8',
    dark: '#3730A3',
  },
  secondary: {
    main: '#0EA5E9',    // Sky blue
    light: '#38BDF8',
    dark: '#0369A1',
  },
  success: {
    main: '#10B981',    // Emerald
  },
  warning: {
    main: '#F59E0B',    // Amber
  },
  error: {
    main: '#EF4444',    // Red
  },
  grey: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    // ... full scale
  },
};
```

### Typography

- Font Family: `Inter, -apple-system, sans-serif`
- Headings: Weight 600-700
- Body: Weight 400-500
- All text uses antialiased rendering

### Spacing

Using MUI's 8px grid system:
- `1` = 8px
- `2` = 16px
- `3` = 24px
- `4` = 32px

### Shadows

Custom shadow scale for depth:
- Cards: `shadow[1]` - subtle elevation
- Dropdowns: `shadow[4]` - medium elevation
- Modals: `shadow[8]` - high elevation

### Border Radius

- Small: 8px (buttons, inputs)
- Medium: 12px (cards)
- Large: 16px (modals)
- XL: 24px (feature cards)

---

## Form Validation

### Zod Schemas

All forms use Zod for validation with Formik integration via `zod-formik-adapter`.

**Login Schema**:
```typescript
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
```

**Signup Schema**:
```typescript
const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[0-9]/, 'Must contain number'),
  confirmPassword: z.string(),
  freelanceCategory: z.enum([...]),
  agreeToTerms: z.boolean().refine(val => val === true),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
```

---

## Demo Credentials

### Quick Access Cards

The login page features beautiful role cards for instant demo access:

| Role | Email | Password | Color |
|------|-------|----------|-------|
| **Freelancer** | freelancer@flowlance.com | Demo1234 | Indigo |
| **Client** | client@company.com | Demo1234 | Emerald |
| **Team Member** | team@flowlance.com | Demo1234 | Amber |
| **Client Reviewer** | reviewer@company.com | Demo1234 | Purple |

### Features per Card

- One-click instant login
- Copy credentials button
- Role description
- Feature preview chips
- Hover animation

---

## Future Backend Integration

### API Endpoints to Implement

**Authentication**:
```
POST /api/auth/login
POST /api/auth/signup
POST /api/auth/logout
POST /api/auth/forgot-password
GET  /api/auth/me
```

**Projects**:
```
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
POST   /api/projects/:id/deliverables
PUT    /api/deliverables/:id/approve
PUT    /api/deliverables/:id/request-changes
```

**Clients**:
```
GET    /api/clients
POST   /api/clients
GET    /api/clients/:id
PUT    /api/clients/:id
DELETE /api/clients/:id
```

**Invoices**:
```
GET    /api/invoices
POST   /api/invoices
GET    /api/invoices/:id
PUT    /api/invoices/:id
DELETE /api/invoices/:id
POST   /api/invoices/:id/send
PUT    /api/invoices/:id/mark-paid
```

**Settings**:
```
GET  /api/settings/profile
PUT  /api/settings/profile
GET  /api/settings/branding
PUT  /api/settings/branding
GET  /api/settings/notifications
PUT  /api/settings/notifications
GET  /api/settings/billing
```

### Data Models

All TypeScript interfaces are defined in `src/types/index.ts` and ready for backend integration:

- `User` / `FreelancerProfile` / `ClientProfile`
- `Project`
- `Deliverable`
- `Invoice` / `PaymentMilestone`
- `Client`
- `Activity`
- `Notification`
- `Testimonial`

### State Management Upgrade

For backend integration, consider:
- **React Query** for server state management
- **Zustand** or **Redux Toolkit** for complex client state
- Keep Context API for auth and simple global state

---

## Pricing Tiers

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0/mo | 3 clients, 5 projects, Basic features |
| **Pro** | $15/mo | Unlimited clients, Custom branding, Priority support |
| **Agency** | $39/mo | Team members, White-label, API access, Dedicated support |

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint
```

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Responsive breakpoints:
- `xs`: 0px
- `sm`: 600px
- `md`: 900px
- `lg`: 1200px
- `xl`: 1536px

---

## License

This is an MVP design implementation for FlowLance. All rights reserved.

---

*Documentation generated for FlowLance v1.0.0*
*Last updated: January 2026*
