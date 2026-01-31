// User types
export type UserRole = 'freelancer' | 'client' | 'team_member' | 'client_sub_user';
export type FreelanceCategory = 'design' | 'development' | 'writing' | 'consulting' | 'marketing' | 'other';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  businessName?: string;
  freelanceCategory?: FreelanceCategory;
  createdAt: string;
  lastLoginAt?: string;
}

export interface FreelancerProfile extends User {
  role: 'freelancer';
  subscription: SubscriptionTier;
  brandColor?: string;
  logo?: string;
  portalSubdomain?: string;
}

export interface ClientProfile extends User {
  role: 'client';
  company?: string;
  freelancerId: string;
}

// Subscription
export type SubscriptionTier = 'free' | 'pro' | 'agency';

export interface Subscription {
  tier: SubscriptionTier;
  status: 'active' | 'cancelled' | 'past_due';
  currentPeriodEnd?: string;
  maxClients: number;
  maxTeamMembers: number;
}

// Project types
export type ProjectStatus = 'not_started' | 'in_progress' | 'in_review' | 'approved' | 'delivered';

export interface Project {
  id: string;
  name: string;
  description?: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  freelancerId: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
  totalValue: number;
  paidAmount: number;
  deliverableCount: number;
  pendingApprovals: number;
}

// Deliverable types
export type DeliverableStatus = 'pending_review' | 'approved' | 'changes_requested';
export type FileType = 'image' | 'document' | 'video' | 'audio' | 'archive' | 'design' | 'other';

export interface Deliverable {
  id: string;
  projectId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: FileType;
  thumbnailUrl?: string;
  note?: string;
  status: DeliverableStatus;
  uploadedAt: string;
  reviewedAt?: string;
  feedback?: string;
  version: number;
}

// Invoice/Payment types
export type PaymentStatus = 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  projectName: string;
  clientId: string;
  clientName: string;
  description: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  createdAt: string;
  sentAt?: string;
  viewedAt?: string;
  paidAt?: string;
}

export interface PaymentMilestone {
  id: string;
  projectId: string;
  description: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  invoiceId?: string;
}

// Client type
export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  avatar?: string;
  phone?: string;
  activeProjects: number;
  totalPaid: number;
  createdAt: string;
  lastActivityAt?: string;
}

// Activity/Timeline types
export type ActivityType =
  | 'project_created'
  | 'deliverable_uploaded'
  | 'deliverable_approved'
  | 'changes_requested'
  | 'invoice_sent'
  | 'invoice_paid'
  | 'comment_added'
  | 'project_delivered'
  | 'feedback_submitted';

export interface Activity {
  id: string;
  type: ActivityType;
  projectId: string;
  description: string;
  actorName: string;
  actorAvatar?: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

// Notification types
export interface Notification {
  id: string;
  type: ActivityType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  projectId?: string;
  actionUrl?: string;
}

// Testimonial types
export interface Testimonial {
  id: string;
  projectId: string;
  clientName: string;
  clientCompany?: string;
  clientAvatar?: string;
  rating: number;
  text: string;
  canDisplay: boolean;
  createdAt: string;
}

// Settings types
export interface NotificationSettings {
  emailOnApproval: boolean;
  emailOnPaymentViewed: boolean;
  emailOnChangesRequested: boolean;
  weeklySummary: boolean;
}

export interface BrandingSettings {
  logo?: string;
  brandColor: string;
  portalUrl: string;
}

// Form schemas (for Zod validation)
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  freelanceCategory: FreelanceCategory;
  agreeToTerms: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ProjectFormData {
  name: string;
  description?: string;
  clientEmail: string;
  clientName: string;
}

export interface DeliverableFormData {
  file: File;
  note?: string;
}

export interface InvoiceFormData {
  description: string;
  amount: number;
  dueDate: string;
}

export interface ClientFeedbackFormData {
  feedback: string;
}

export interface ProfileFormData {
  fullName: string;
  email: string;
  phone?: string;
  businessName?: string;
}

// Dashboard stats
export interface DashboardStats {
  activeProjects: number;
  pendingApprovals: number;
  unpaidInvoices: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

// Status helpers
export const projectStatusConfig: Record<ProjectStatus, { label: string; color: 'default' | 'warning' | 'info' | 'success' | 'primary' }> = {
  not_started: { label: 'Not Started', color: 'default' },
  in_progress: { label: 'In Progress', color: 'info' },
  in_review: { label: 'In Review', color: 'warning' },
  approved: { label: 'Approved', color: 'success' },
  delivered: { label: 'Delivered', color: 'primary' },
};

export const deliverableStatusConfig: Record<DeliverableStatus, { label: string; color: 'warning' | 'success' | 'error'; icon: string }> = {
  pending_review: { label: 'Pending Review', color: 'warning', icon: '🟡' },
  approved: { label: 'Approved', color: 'success', icon: '🟢' },
  changes_requested: { label: 'Changes Requested', color: 'error', icon: '🔴' },
};

export const paymentStatusConfig: Record<PaymentStatus, { label: string; color: 'default' | 'info' | 'warning' | 'success' | 'error' }> = {
  draft: { label: 'Draft', color: 'default' },
  sent: { label: 'Sent', color: 'info' },
  viewed: { label: 'Viewed', color: 'warning' },
  paid: { label: 'Paid', color: 'success' },
  overdue: { label: 'Overdue', color: 'error' },
};
