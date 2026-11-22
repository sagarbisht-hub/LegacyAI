/**
 * demoData.js
 * All demo/mock data for the LegacyAI prototype.
 * Replace with real API calls when backend is connected.
 * NEVER put real passwords, API keys, or production credentials here.
 */

// ─────────────────────────────────────────────
// DEMO USERS  (passwords are hashed in real auth)
// ─────────────────────────────────────────────
export const DEMO_USERS = [
  {
    id: 'u001',
    name: 'Arjun Sharma',
    email: 'superadmin@legacyai.com',
    // DEMO ONLY – never store real passwords in frontend
    password: 'SuperAdmin@123',
    role: 'super-admin',
    company: 'LegacyAI Platform',
    department: 'Platform Administration',
    designation: 'Super Administrator',
    avatar: null,
    joinedDate: '2024-01-15',
    status: 'active',
  },
  {
    id: 'u002',
    name: 'Rahul Mehta',
    email: 'admin@techcorp.com',
    password: 'CompanyAdmin@123',
    role: 'company-admin',
    company: 'TechCorp Solutions',
    department: 'Human Resources',
    designation: 'Company Administrator',
    avatar: null,
    joinedDate: '2024-03-10',
    status: 'active',
  },
  {
    id: 'u003',
    name: 'Priya Verma',
    email: 'employee@techcorp.com',
    password: 'Employee@123',
    role: 'employee',
    company: 'TechCorp Solutions',
    department: 'Software Engineering',
    designation: 'Senior Software Engineer',
    avatar: null,
    joinedDate: '2024-05-20',
    status: 'active',
  },
]

// ─────────────────────────────────────────────
// SUPER ADMIN – PLATFORM STATS
// ─────────────────────────────────────────────
export const PLATFORM_STATS = {
  totalCompanies: 124,
  pendingApprovals: 8,
  totalUsers: 2486,
  activeCompanies: 97,
  knowledgeItems: 18420,
  aiQueries: 42850,
}

// ─────────────────────────────────────────────
// COMPANY REGISTRATION REQUESTS
// ─────────────────────────────────────────────
export const COMPANY_REQUESTS = [
  {
    id: 'cr001',
    companyName: 'TechCorp Solutions',
    industry: 'Technology & Software',
    adminName: 'Rahul Mehta',
    adminEmail: 'admin@techcorp.com',
    adminPhone: '+91 98765 43210',
    companyPhone: '+91 22 4567 8900',
    companyAddress: '14th Floor, Cyber Hub, Gurugram, Haryana 122002',
    companyWebsite: 'https://techcorpsolutions.com',
    employeeCount: '201–500',
    department: 'Human Resources',
    message: 'We want to digitize our engineering knowledge and accelerate onboarding for new developers.',
    submittedDate: '2026-09-20',
    status: 'approved',
  },
  {
    id: 'cr002',
    companyName: 'Innovate Systems',
    industry: 'IT Services',
    adminName: 'Neha Kapoor',
    adminEmail: 'admin@innovate.com',
    adminPhone: '+91 87654 32109',
    companyPhone: '+91 80 2345 6789',
    companyAddress: '3rd Floor, Embassy Tech Village, Bengaluru, Karnataka 560103',
    companyWebsite: 'https://innovatesystems.in',
    employeeCount: '51–200',
    department: 'Operations',
    message: 'Looking to preserve domain expertise as our senior consultants transition to advisory roles.',
    submittedDate: '2026-09-19',
    status: 'pending',
  },
  {
    id: 'cr003',
    companyName: 'FinEdge Analytics',
    industry: 'Financial Services & Banking',
    adminName: 'Suresh Iyer',
    adminEmail: 'admin@finedge.com',
    adminPhone: '+91 76543 21098',
    companyPhone: '+91 22 6789 0123',
    companyAddress: 'Bandra Kurla Complex, Mumbai, Maharashtra 400051',
    companyWebsite: 'https://finedgeanalytics.com',
    employeeCount: '501–1,000',
    department: 'Learning & Development',
    message: 'Our compliance and risk knowledge is critical and needs to be preserved and distributed securely.',
    submittedDate: '2026-09-18',
    status: 'pending',
  },
  {
    id: 'cr004',
    companyName: 'MediCore Health',
    industry: 'Healthcare & Life Sciences',
    adminName: 'Dr. Anita Rao',
    adminEmail: 'admin@medicore.com',
    adminPhone: '+91 65432 10987',
    companyPhone: '+91 40 3456 7890',
    companyAddress: 'Madhapur, Hyderabad, Telangana 500081',
    companyWebsite: 'https://medicorehealth.com',
    employeeCount: '1,001–5,000',
    department: 'Medical Education',
    message: 'Clinical protocols and procedures must be accessible to all medical staff instantly.',
    submittedDate: '2026-09-17',
    status: 'rejected',
  },
  {
    id: 'cr005',
    companyName: 'BuildRight Construction',
    industry: 'Construction & Real Estate',
    adminName: 'Vikram Nair',
    adminEmail: 'admin@buildright.com',
    adminPhone: '+91 54321 09876',
    companyPhone: '+91 20 4567 8901',
    companyAddress: 'Hinjewadi Phase 2, Pune, Maharashtra 411057',
    companyWebsite: 'https://buildrightconstruction.com',
    employeeCount: '201–500',
    department: 'Project Management',
    message: 'Safety procedures and site management SOPs are critical for our operations.',
    submittedDate: '2026-09-16',
    status: 'pending',
  },
]

// ─────────────────────────────────────────────
// REGISTERED COMPANIES
// ─────────────────────────────────────────────
export const REGISTERED_COMPANIES = [
  { id: 'c001', name: 'TechCorp Solutions', industry: 'Technology', employees: 248, knowledgeItems: 1842, activeUsers: 219, aiQueries: 8420, status: 'active', plan: 'Professional' },
  { id: 'c002', name: 'GlobalBank India', industry: 'Financial Services', employees: 1240, knowledgeItems: 5620, activeUsers: 980, aiQueries: 34200, status: 'active', plan: 'Enterprise' },
  { id: 'c003', name: 'CargoFleet Logistics', industry: 'Logistics', employees: 186, knowledgeItems: 720, activeUsers: 143, aiQueries: 3100, status: 'active', plan: 'Starter' },
  { id: 'c004', name: 'EduPrime Academy', industry: 'Education', employees: 92, knowledgeItems: 410, activeUsers: 78, aiQueries: 1800, status: 'suspended', plan: 'Starter' },
  { id: 'c005', name: 'PharmaCare Ltd', industry: 'Healthcare', employees: 560, knowledgeItems: 2100, activeUsers: 421, aiQueries: 12400, status: 'active', plan: 'Professional' },
]

// ─────────────────────────────────────────────
// ALL USERS (super admin view)
// ─────────────────────────────────────────────
export const ALL_USERS = [
  { id: 'u001', name: 'Arjun Sharma', email: 'superadmin@legacyai.com', company: 'LegacyAI Platform', role: 'super-admin', department: 'Platform Admin', status: 'active', lastActive: '2026-09-21' },
  { id: 'u002', name: 'Rahul Mehta', email: 'admin@techcorp.com', company: 'TechCorp Solutions', role: 'company-admin', department: 'Human Resources', status: 'active', lastActive: '2026-09-21' },
  { id: 'u003', name: 'Priya Verma', email: 'employee@techcorp.com', company: 'TechCorp Solutions', role: 'employee', department: 'Software Engineering', status: 'active', lastActive: '2026-09-21' },
  { id: 'u004', name: 'Rahul Singh', email: 'rsingh@techcorp.com', company: 'TechCorp Solutions', role: 'employee', department: 'DevOps', status: 'active', lastActive: '2026-09-20' },
  { id: 'u005', name: 'Ananya Sharma', email: 'asharma@techcorp.com', company: 'TechCorp Solutions', role: 'employee', department: 'QA Engineering', status: 'active', lastActive: '2026-09-19' },
  { id: 'u006', name: 'Vikram Patel', email: 'vpatel@techcorp.com', company: 'TechCorp Solutions', role: 'employee', department: 'Product Management', status: 'inactive', lastActive: '2026-09-10' },
  { id: 'u007', name: 'Amit Kapoor', email: 'akapoor@techcorp.com', company: 'TechCorp Solutions', role: 'employee', department: 'Software Engineering', status: 'active', lastActive: '2026-09-21' },
  { id: 'u008', name: 'Neha Sharma', email: 'nsharma@techcorp.com', company: 'TechCorp Solutions', role: 'employee', department: 'Human Resources', status: 'active', lastActive: '2026-09-18' },
]

// Analytics chart data
export const ANALYTICS_DATA = {
  companyRegistrations: [
    { month: 'Apr', count: 8 }, { month: 'May', count: 14 }, { month: 'Jun', count: 19 },
    { month: 'Jul', count: 25 }, { month: 'Aug', count: 31 }, { month: 'Sep', count: 27 },
  ],
  activeUsers: [
    { month: 'Apr', count: 820 }, { month: 'May', count: 1240 }, { month: 'Jun', count: 1680 },
    { month: 'Jul', count: 1920 }, { month: 'Aug', count: 2210 }, { month: 'Sep', count: 2486 },
  ],
  knowledgeUploads: [
    { month: 'Apr', count: 1200 }, { month: 'May', count: 2800 }, { month: 'Jun', count: 4100 },
    { month: 'Jul', count: 7400 }, { month: 'Aug', count: 12300 }, { month: 'Sep', count: 18420 },
  ],
  aiQueries: [
    { month: 'Apr', count: 2400 }, { month: 'May', count: 6800 }, { month: 'Jun', count: 11200 },
    { month: 'Jul', count: 18600 }, { month: 'Aug', count: 32100 }, { month: 'Sep', count: 42850 },
  ],
}

// ─────────────────────────────────────────────
// SUBSCRIPTIONS
// ─────────────────────────────────────────────
export const SUBSCRIPTIONS = [
  { id: 's001', company: 'TechCorp Solutions', plan: 'Professional', users: 248, storage: '500 GB', status: 'active', renewal: '2027-03-10', amount: '₹24,000/mo' },
  { id: 's002', company: 'GlobalBank India', plan: 'Enterprise', users: 1240, storage: '5 TB', status: 'active', renewal: '2027-06-15', amount: '₹1,20,000/mo' },
  { id: 's003', company: 'CargoFleet Logistics', plan: 'Starter', users: 186, storage: '100 GB', status: 'active', renewal: '2026-12-01', amount: '₹6,000/mo' },
  { id: 's004', company: 'EduPrime Academy', plan: 'Starter', users: 92, storage: '100 GB', status: 'suspended', renewal: '2026-10-20', amount: '₹6,000/mo' },
  { id: 's005', company: 'PharmaCare Ltd', plan: 'Professional', users: 560, storage: '500 GB', status: 'active', renewal: '2027-01-08', amount: '₹24,000/mo' },
]

// ─────────────────────────────────────────────
// COMPANY ADMIN – STATS
// ─────────────────────────────────────────────
export const COMPANY_STATS = {
  totalEmployees: 248,
  activeEmployees: 219,
  experts: 18,
  knowledgeResources: 1842,
  videos: 486,
  documents: 1102,
  aiQuestions: 8420,
  unansweredQuestions: 37,
}

// ─────────────────────────────────────────────
// EMPLOYEES
// ─────────────────────────────────────────────
export const EMPLOYEES = [
  { id: 'e001', name: 'Priya Verma', email: 'employee@techcorp.com', department: 'Software Engineering', designation: 'Senior Software Engineer', role: 'employee', progress: 72, status: 'active', lastActive: '2026-09-21' },
  { id: 'e002', name: 'Rahul Singh', email: 'rsingh@techcorp.com', department: 'DevOps', designation: 'DevOps Engineer', role: 'employee', progress: 58, status: 'active', lastActive: '2026-09-20' },
  { id: 'e003', name: 'Ananya Sharma', email: 'asharma@techcorp.com', department: 'QA Engineering', designation: 'QA Lead', role: 'employee', progress: 85, status: 'active', lastActive: '2026-09-19' },
  { id: 'e004', name: 'Vikram Patel', email: 'vpatel@techcorp.com', department: 'Product Management', designation: 'Product Manager', role: 'employee', progress: 41, status: 'inactive', lastActive: '2026-09-10' },
  { id: 'e005', name: 'Sunita Rao', email: 'srao@techcorp.com', department: 'Human Resources', designation: 'HR Business Partner', role: 'employee', progress: 93, status: 'active', lastActive: '2026-09-21' },
  { id: 'e006', name: 'Karan Mehta', email: 'kmehta@techcorp.com', department: 'Finance', designation: 'Finance Analyst', role: 'employee', progress: 32, status: 'active', lastActive: '2026-09-18' },
  { id: 'e007', name: 'Divya Nair', email: 'dnair@techcorp.com', department: 'Operations', designation: 'Operations Manager', role: 'employee', progress: 67, status: 'active', lastActive: '2026-09-17' },
  { id: 'e008', name: 'Arun Kumar', email: 'akumar@techcorp.com', department: 'Software Engineering', designation: 'Backend Developer', role: 'employee', progress: 55, status: 'active', lastActive: '2026-09-21' },
]

// ─────────────────────────────────────────────
// EXPERTS
// ─────────────────────────────────────────────
export const EXPERTS = [
  { id: 'ex001', name: 'Amit Kapoor', email: 'akapoor@techcorp.com', department: 'Software Engineering', expertise: 'Backend Architecture & APIs', experience: 14, contributions: 42, videos: 18, documents: 24, status: 'active' },
  { id: 'ex002', name: 'Neha Sharma', email: 'nsharma@techcorp.com', department: 'Human Resources', expertise: 'Talent Development & L&D', experience: 11, contributions: 28, videos: 8, documents: 20, status: 'active' },
  { id: 'ex003', name: 'Rohit Mehta', email: 'rmehta@techcorp.com', department: 'DevOps', expertise: 'Cloud Infrastructure & CI/CD', experience: 9, contributions: 35, videos: 14, documents: 21, status: 'active' },
  { id: 'ex004', name: 'Sunita Agarwal', email: 'sagarwal@techcorp.com', department: 'Finance', expertise: 'Financial Controls & Compliance', experience: 16, contributions: 22, videos: 5, documents: 17, status: 'active' },
  { id: 'ex005', name: 'Deepak Joshi', email: 'djoshi@techcorp.com', department: 'IT', expertise: 'Network Security & Infrastructure', experience: 12, contributions: 31, videos: 11, documents: 20, status: 'inactive' },
]

// ─────────────────────────────────────────────
// KNOWLEDGE ITEMS
// ─────────────────────────────────────────────
export const KNOWLEDGE_ITEMS = [
  {
    id: 'k001', title: 'Production Server Troubleshooting Guide', type: 'Video', department: 'Software Engineering',
    expert: 'Amit Kapoor', skillLevel: 'Advanced', duration: '34 min', views: 284,
    description: 'Step-by-step walkthrough for diagnosing and resolving production server incidents including API failures, memory leaks, and database connectivity issues.',
    tags: ['production', 'troubleshooting', 'API', 'server'], uploadDate: '2026-08-15', category: 'Operations',
  },
  {
    id: 'k002', title: 'Employee Onboarding SOP', type: 'PDF', department: 'Human Resources',
    expert: 'Neha Sharma', skillLevel: 'Beginner', duration: '20 min read', views: 512,
    description: 'Complete onboarding checklist and procedure for new employees covering documentation, system access, team introductions and first 30-60-90 day expectations.',
    tags: ['onboarding', 'HR', 'new-employee', 'SOP'], uploadDate: '2026-07-10', category: 'HR',
  },
  {
    id: 'k003', title: 'Database Backup and Recovery Procedure', type: 'SOP', department: 'IT',
    expert: 'Amit Kapoor', skillLevel: 'Intermediate', duration: '15 min read', views: 198,
    description: 'Detailed procedures for scheduled database backups, integrity checks, and step-by-step recovery process for various failure scenarios.',
    tags: ['database', 'backup', 'recovery', 'IT'], uploadDate: '2026-08-01', category: 'IT Operations',
  },
  {
    id: 'k004', title: 'CI/CD Pipeline Setup with GitHub Actions', type: 'Video', department: 'DevOps',
    expert: 'Rohit Mehta', skillLevel: 'Intermediate', duration: '48 min', views: 341,
    description: 'Comprehensive walkthrough of setting up automated CI/CD pipelines using GitHub Actions, including testing, staging, and production deployment stages.',
    tags: ['CI/CD', 'DevOps', 'GitHub', 'automation'], uploadDate: '2026-09-01', category: 'DevOps',
  },
  {
    id: 'k005', title: 'Security Incident Response Playbook', type: 'Document', department: 'IT',
    expert: 'Deepak Joshi', skillLevel: 'Advanced', duration: '25 min read', views: 163,
    description: 'Incident classification, escalation matrix, containment steps and post-incident review procedures for security events.',
    tags: ['security', 'incident', 'response', 'compliance'], uploadDate: '2026-07-28', category: 'Security',
  },
  {
    id: 'k006', title: 'Cloud Deployment Best Practices on AWS', type: 'Tutorial', department: 'DevOps',
    expert: 'Rohit Mehta', skillLevel: 'Intermediate', duration: '55 min', views: 427,
    description: 'Best practices for deploying scalable applications on AWS covering EC2, RDS, S3, CloudFront, and IAM configuration with cost optimization tips.',
    tags: ['AWS', 'cloud', 'deployment', 'infrastructure'], uploadDate: '2026-08-20', category: 'Cloud',
  },
  {
    id: 'k007', title: 'Financial Month-End Closing Process', type: 'SOP', department: 'Finance',
    expert: 'Sunita Agarwal', skillLevel: 'Intermediate', duration: '18 min read', views: 89,
    description: 'Standardized procedure for month-end financial close including reconciliations, accruals, approval workflows, and reporting timelines.',
    tags: ['finance', 'month-end', 'accounting', 'SOP'], uploadDate: '2026-09-05', category: 'Finance',
  },
  {
    id: 'k008', title: 'Customer Support Escalation Framework', type: 'Document', department: 'Operations',
    expert: 'Neha Sharma', skillLevel: 'Beginner', duration: '12 min read', views: 234,
    description: 'Tier-based escalation guidelines covering Level 1-3 support, SLA adherence, communication templates, and customer satisfaction procedures.',
    tags: ['customer-support', 'escalation', 'SLA', 'operations'], uploadDate: '2026-08-25', category: 'Operations',
  },
  {
    id: 'k009', title: 'API Design and Documentation Standards', type: 'Tutorial', department: 'Software Engineering',
    expert: 'Amit Kapoor', skillLevel: 'Intermediate', duration: '40 min', views: 318,
    description: 'Internal API design conventions, versioning strategy, authentication patterns, error handling standards, and OpenAPI documentation requirements.',
    tags: ['API', 'documentation', 'standards', 'backend'], uploadDate: '2026-09-10', category: 'Engineering',
  },
  {
    id: 'k010', title: 'Performance Review and Career Growth Guide', type: 'PDF', department: 'Human Resources',
    expert: 'Neha Sharma', skillLevel: 'Beginner', duration: '22 min read', views: 445,
    description: 'Guide for employees and managers on the performance review cycle, goal setting, feedback conversations, and career path planning within TechCorp.',
    tags: ['performance', 'career', 'HR', 'growth'], uploadDate: '2026-08-12', category: 'HR',
  },
]

// ─────────────────────────────────────────────
// COMPANY ANALYTICS
// ─────────────────────────────────────────────
export const COMPANY_ANALYTICS = {
  learningActivity: [
    { week: 'Week 1', views: 120, questions: 34 }, { week: 'Week 2', views: 198, questions: 56 },
    { week: 'Week 3', views: 245, questions: 71 }, { week: 'Week 4', views: 310, questions: 89 },
  ],
  topResources: [
    { title: 'Employee Onboarding SOP', views: 512, dept: 'HR' },
    { title: 'Performance Review Guide', views: 445, dept: 'HR' },
    { title: 'CI/CD Pipeline Setup', views: 341, dept: 'DevOps' },
    { title: 'Production Troubleshooting', views: 284, dept: 'Engineering' },
    { title: 'Customer Support Escalation', views: 234, dept: 'Operations' },
  ],
  topQuestions: [
    { question: 'How to reset MFA for employee accounts?', count: 47 },
    { question: 'What is the leave approval process?', count: 38 },
    { question: 'How to request AWS access?', count: 34 },
    { question: 'What are the code review standards?', count: 29 },
    { question: 'How to handle production P1 incidents?', count: 26 },
  ],
  departmentProgress: [
    { dept: 'Software Engineering', progress: 68, employees: 64 },
    { dept: 'Human Resources', progress: 84, employees: 18 },
    { dept: 'DevOps', progress: 71, employees: 22 },
    { dept: 'Finance', progress: 45, employees: 15 },
    { dept: 'Operations', progress: 59, employees: 31 },
  ],
}

// ─────────────────────────────────────────────
// EMPLOYEE STATS
// ─────────────────────────────────────────────
export const EMPLOYEE_STATS = {
  learningProgress: 72,
  coursesCompleted: 8,
  resourcesViewed: 34,
  questionsAsked: 27,
  aiAnswers: 24,
  savedResources: 12,
  learningStreak: 7,
}

// ─────────────────────────────────────────────
// LEARNING CONTENT
// ─────────────────────────────────────────────
export const LEARNING_CONTENT = [
  { id: 'l001', title: 'Production Troubleshooting Fundamentals', progress: 72, duration: '2h 30min', difficulty: 'Advanced', expert: 'Amit Kapoor', department: 'Engineering', type: 'Video Series', status: 'in-progress' },
  { id: 'l002', title: 'Database Fundamentals and Best Practices', progress: 48, duration: '3h 15min', difficulty: 'Intermediate', expert: 'Amit Kapoor', department: 'Engineering', type: 'Video Series', status: 'in-progress' },
  { id: 'l003', title: 'Company Security Procedures', progress: 91, duration: '1h 45min', difficulty: 'Intermediate', expert: 'Deepak Joshi', department: 'IT', type: 'Mixed', status: 'in-progress' },
  { id: 'l004', title: 'Employee Onboarding Complete Guide', progress: 100, duration: '45min', difficulty: 'Beginner', expert: 'Neha Sharma', department: 'HR', type: 'Document', status: 'completed' },
  { id: 'l005', title: 'API Design Principles', progress: 100, duration: '2h 10min', difficulty: 'Intermediate', expert: 'Amit Kapoor', department: 'Engineering', type: 'Tutorial', status: 'completed' },
  { id: 'l006', title: 'Cloud Infrastructure Basics', progress: 0, duration: '4h 20min', difficulty: 'Intermediate', expert: 'Rohit Mehta', department: 'DevOps', type: 'Video Series', status: 'recommended' },
  { id: 'l007', title: 'Performance Review Process', progress: 0, duration: '30min', difficulty: 'Beginner', expert: 'Neha Sharma', department: 'HR', type: 'Document', status: 'recommended' },
]

// ─────────────────────────────────────────────
// BOOKMARKS
// ─────────────────────────────────────────────
export const BOOKMARKS = [
  { id: 'k001', title: 'Production Server Troubleshooting Guide', type: 'Video', department: 'Engineering', expert: 'Amit Kapoor', bookmarkedDate: '2026-09-15' },
  { id: 'k004', title: 'CI/CD Pipeline Setup with GitHub Actions', type: 'Video', department: 'DevOps', expert: 'Rohit Mehta', bookmarkedDate: '2026-09-12' },
  { id: 'k003', title: 'Database Backup and Recovery Procedure', type: 'SOP', department: 'IT', expert: 'Amit Kapoor', bookmarkedDate: '2026-09-08' },
]

// ─────────────────────────────────────────────
// ASK AN EXPERT – QUESTIONS
// ─────────────────────────────────────────────
export const EXPERT_QUESTIONS = [
  {
    id: 'q001',
    question: 'How should we handle the legacy PostgreSQL migration to the new Aurora cluster without downtime?',
    department: 'Software Engineering', topic: 'Database Migration', priority: 'High',
    details: 'We have 2TB of data and need zero-downtime migration during business hours.',
    assignedExpert: 'Amit Kapoor', status: 'under-review', submittedDate: '2026-09-19',
    answer: null,
  },
  {
    id: 'q002',
    question: 'What is the process for applying for a sabbatical under the new HR policy?',
    department: 'Human Resources', topic: 'HR Policy', priority: 'Low',
    details: 'I have been with the company for 5 years and want to understand eligibility.',
    assignedExpert: 'Neha Sharma', status: 'answered', submittedDate: '2026-09-10',
    answer: 'Employees with 4+ years are eligible. Submit Form HR-22 to your manager and HR BP 60 days before the intended start date.',
  },
  {
    id: 'q003',
    question: 'Are there documented standards for API rate limiting in our microservices?',
    department: 'Software Engineering', topic: 'API Standards', priority: 'Medium',
    details: 'Looking to implement rate limiting consistently across all our public-facing APIs.',
    assignedExpert: null, status: 'submitted', submittedDate: '2026-09-20',
    answer: null,
  },
]

// ─────────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────────
export const NOTIFICATIONS = {
  'super-admin': [
    { id: 'n1', text: 'New company registration: Innovate Systems', time: '2 hours ago', read: false, type: 'registration' },
    { id: 'n2', text: 'New company registration: FinEdge Analytics', time: '1 day ago', read: false, type: 'registration' },
    { id: 'n3', text: 'BuildRight Construction request pending review', time: '2 days ago', read: true, type: 'registration' },
    { id: 'n4', text: 'Monthly platform report is ready', time: '3 days ago', read: true, type: 'report' },
  ],
  'company-admin': [
    { id: 'n1', text: '3 new employees joined this week', time: '1 hour ago', read: false, type: 'employee' },
    { id: 'n2', text: 'Amit Kapoor uploaded a new knowledge video', time: '4 hours ago', read: false, type: 'knowledge' },
    { id: 'n3', text: '37 AI questions remain unanswered', time: '1 day ago', read: false, type: 'ai' },
    { id: 'n4', text: 'Monthly knowledge report is ready', time: '2 days ago', read: true, type: 'report' },
  ],
  'employee': [
    { id: 'n1', text: 'New learning recommendation: Cloud Infrastructure Basics', time: '2 hours ago', read: false, type: 'learning' },
    { id: 'n2', text: 'Expert Neha Sharma answered your question', time: '1 day ago', read: false, type: 'answer' },
    { id: 'n3', text: 'New SOP uploaded: Customer Support Escalation Framework', time: '2 days ago', read: true, type: 'knowledge' },
    { id: 'n4', text: 'You\'re on a 7-day learning streak! Keep it up.', time: '3 days ago', read: true, type: 'streak' },
  ],
}

// ─────────────────────────────────────────────
// AI CHATBOT – SAMPLE CONVERSATIONS
// ─────────────────────────────────────────────
export const SUGGESTED_QUESTIONS = [
  'What is the procedure for handling a production API failure?',
  'How do I request database access?',
  'What are the steps for new employee onboarding?',
  'Show me the SOP for database backup.',
  'What did our engineering team recommend for API timeout issues?',
  'How do I set up CI/CD with GitHub Actions?',
  'What is the security incident response process?',
]

export const AI_KNOWLEDGE_SOURCES = [
  { id: 'ks1', label: 'Company SOPs', active: true },
  { id: 'ks2', label: 'Expert Videos', active: true },
  { id: 'ks3', label: 'Training Documents', active: true },
  { id: 'ks4', label: 'Project Lessons', active: true },
  { id: 'ks5', label: 'Department Knowledge', active: true },
]

// Simulated AI responses keyed by keyword matches
export const AI_RESPONSES = [
  {
    keywords: ['production', 'api', 'failure', '500', 'error', 'incident', 'troubleshoot'],
    answer: `According to the **Production Server Troubleshooting Guide**, follow these steps when production APIs start returning 500 errors:\n\n1. **Check application logs** – Review the last 15 minutes of logs in your observability platform for stack traces and error patterns.\n2. **Verify recent deployments** – Check if any code was deployed in the past 2 hours using the deployment dashboard.\n3. **Confirm database connectivity** – Run the database health check script to rule out connection pool exhaustion.\n4. **Check service dependencies** – Verify upstream/downstream service health in the service mesh dashboard.\n5. **Escalate if unresolved in 15 min** – Page the on-call engineer using PagerDuty if root cause is not identified.`,
    sources: [
      { type: 'SOP', title: 'Production Server Troubleshooting Guide', id: 'k001' },
      { type: 'Video', title: 'Production Incident Walkthrough', id: 'k001' },
    ],
    expert: 'Amit Kapoor',
    department: 'Software Engineering',
    related: ['Production Monitoring Guide', 'Database Connectivity Checklist', 'PagerDuty Escalation SOP'],
    confidence: 94,
  },
  {
    keywords: ['database', 'access', 'request', 'permission', 'db access'],
    answer: `Based on the **IT Access Management SOP**, to request database access:\n\n1. Submit a **DB Access Request** through the IT Service Desk portal under the "Access Management" category.\n2. Specify the database name, schema, and required permission level (read-only or read-write).\n3. Get your direct manager's approval via the automated workflow.\n4. The IT team will provision access within **1 business day** for standard requests.\n5. Production database access requires an additional security review – allow 3–5 business days.\n\n> Note: All access is logged and audited quarterly.`,
    sources: [
      { type: 'SOP', title: 'IT Access Management SOP', id: 'k003' },
      { type: 'Document', title: 'Security Access Policy v2.1', id: 'k005' },
    ],
    expert: 'Deepak Joshi',
    department: 'IT',
    related: ['IT Access Management SOP', 'Security Policy Document', 'Service Desk Guide'],
    confidence: 88,
  },
  {
    keywords: ['onboarding', 'new employee', 'joining', 'first day', 'checklist'],
    answer: `The **Employee Onboarding SOP** outlines the following process for new employees:\n\n**Before Day 1:**\n- IT sends laptop and system credentials 2 days prior\n- HR sends Welcome Kit and Company Handbook\n\n**Day 1:**\n- Report to HR for documentation and ID card\n- Complete system access setup\n- Meet your assigned buddy\n\n**Week 1:**\n- Complete all mandatory compliance training modules\n- Shadow your team lead for 3 days\n- Set up 1:1 cadence with your manager\n\n**First 30 Days:**\n- Complete department-specific knowledge modules on LegacyAI\n- Submit your 30-day plan to your manager`,
    sources: [
      { type: 'PDF', title: 'Employee Onboarding SOP', id: 'k002' },
      { type: 'Document', title: 'New Employee Handbook v3', id: 'k002' },
    ],
    expert: 'Neha Sharma',
    department: 'Human Resources',
    related: ['Company Culture Guide', 'IT Setup Checklist', 'Mandatory Training List'],
    confidence: 97,
  },
  {
    keywords: ['backup', 'database backup', 'recovery', 'restore'],
    answer: `The **Database Backup and Recovery Procedure** defines the following process:\n\n**Scheduled Backups:**\n- Full backup: Every Sunday 2:00 AM IST (automated via cron)\n- Incremental backup: Daily 11:30 PM IST\n- Transaction log backup: Every 4 hours\n\n**Manual Backup (before major deployments):**\n1. Run \`./scripts/manual-backup.sh --env production\`\n2. Verify backup integrity using the checksum script\n3. Log the backup in the IT Change Register\n\n**Recovery Steps:**\n1. Identify the restore point required\n2. Notify the Change Advisory Board\n3. Restore from the nearest clean backup using the Recovery Runbook`,
    sources: [
      { type: 'SOP', title: 'Database Backup and Recovery Procedure', id: 'k003' },
    ],
    expert: 'Amit Kapoor',
    department: 'IT',
    related: ['Database Health Check Guide', 'Disaster Recovery Plan', 'IT Change Management SOP'],
    confidence: 91,
  },
  {
    keywords: ['ci/cd', 'github actions', 'pipeline', 'deployment', 'deploy', 'continuous integration'],
    answer: `According to the **CI/CD Pipeline Setup Guide**, our standard GitHub Actions pipeline consists of:\n\n**Pipeline Stages:**\n1. **Test** – Unit and integration tests run on every PR\n2. **Lint & Security Scan** – ESLint, SonarQube, and Snyk checks\n3. **Build** – Docker image build and tagging\n4. **Deploy Staging** – Auto-deploy on merge to \`develop\`\n5. **Deploy Production** – Requires 2 approvals + manual trigger on \`main\`\n\n**Key Configuration:**\n- Secrets are stored in GitHub Secrets, never in code\n- Environment variables are injected at runtime\n- Rollback is automated if health check fails after deploy`,
    sources: [
      { type: 'Video', title: 'CI/CD Pipeline Setup with GitHub Actions', id: 'k004' },
      { type: 'Document', title: 'Deployment Standards v2.0', id: 'k004' },
    ],
    expert: 'Rohit Mehta',
    department: 'DevOps',
    related: ['GitHub Repository Standards', 'Docker Configuration Guide', 'Cloud Deployment Best Practices'],
    confidence: 96,
  },
]

// AI Analysis for knowledge items
export const AI_ANALYSES = {
  k001: {
    summary: 'A comprehensive step-by-step procedure for diagnosing and resolving production server incidents including API failures, memory leaks, database connectivity issues, and service dependency failures.',
    keySteps: [
      'Check application logs for error patterns and stack traces',
      'Verify recent deployment history for potential causes',
      'Confirm database connection pool health and connectivity',
      'Validate upstream service dependencies using service mesh dashboard',
      'Execute rollback procedure if root cause is a recent deployment',
      'Escalate to on-call engineer if unresolved within 15 minutes',
    ],
    warnings: [
      'Never restart services without first checking application logs',
      'Do not rollback production without CAB notification',
      'Always verify database connectivity before assuming application code failure',
    ],
    commonMistakes: [
      'Restarting services without diagnosing root cause – masks the actual issue',
      'Ignoring recent deployment changes as potential cause',
      'Skipping the escalation step, leading to prolonged downtime',
    ],
    requiredSkills: ['Linux administration', 'Log analysis', 'Database fundamentals', 'Incident management'],
    relatedDocuments: ['Production Monitoring Guide', 'Database Connectivity Checklist', 'PagerDuty Escalation SOP', 'Rollback Procedure'],
    recommendedLearning: ['Production Monitoring Fundamentals', 'Incident Management Basics', 'Database Health Monitoring'],
    expert: 'Amit Kapoor',
  },
  k002: {
    summary: 'A complete structured onboarding process for new employees covering pre-joining documentation, Day 1 activities, first-week orientation, and 30-60-90 day expectations.',
    keySteps: [
      'Complete pre-joining documentation and background verification',
      'Collect IT equipment and configure system access on Day 1',
      'Complete mandatory compliance and security training in Week 1',
      'Shadow team lead and complete buddy program in first two weeks',
      'Complete department knowledge modules on LegacyAI within 30 days',
      'Submit 30-day plan and schedule regular 1:1s with manager',
    ],
    warnings: [
      'System access must be set up before starting any work tasks',
      'Compliance training is mandatory – non-completion triggers HR flag',
      'All NDAs and IP agreements must be signed on Day 1',
    ],
    commonMistakes: [
      'Skipping mandatory compliance modules assuming they are not important',
      'Not setting up 1:1 cadence with manager early enough',
      'Ignoring the buddy program which accelerates integration significantly',
    ],
    requiredSkills: ['None – beginner-friendly', 'Basic computer literacy', 'Email and communication tools'],
    relatedDocuments: ['Company Culture Guide', 'IT Setup Checklist', 'Mandatory Training List', 'Benefits Guide'],
    recommendedLearning: ['Company Policies Overview', 'Security Awareness Training', 'Department-specific onboarding modules'],
    expert: 'Neha Sharma',
  },
}
