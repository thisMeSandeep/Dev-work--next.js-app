
# 🚀 Dev Work

Dev Work is a modern freelance marketplace platform inspired by Upwork, built with **Next.js 15 App Router**. It connects clients and developers through a seamless, AI-powered platform that streamlines project management, proposal submissions, and talent discovery.

## ✨ Key Features

### 🔐 **Authentication & Authorization**
* Secure JWT-based authentication with NextAuth.js
* Social login with Google & GitHub providers
* Role-based access control (Client/Developer)
* Protected routes with middleware

### 👥 **User Management**
* **Client Dashboard** - Post jobs, manage proposals, track project status
* **Developer Dashboard** - Browse jobs, submit proposals, manage portfolio
* Profile management with file uploads (resumes, portfolios)


### 💼 **Job Management**
* Create and post detailed job listings
* Categorized job browsing (Web Development, Mobile Apps, etc.)
* Personalized job recommendations based on skills
* Job status tracking (Open, Ongoing, Completed)
* Proposal management and acceptance workflow

### 🤖 **AI-Powered Features**
* AI-enhanced job descriptions
* Intelligent proposal suggestions
* Smart job matching based on skills and preferences
* Automated content generation and optimization

### 📊 **Project Workflow**
* Proposal submission with cover letters and attachments
* Client request system for direct developer outreach
* Job status management and progress tracking
* Rating and feedback system

## 🛠 Tech Stack

### **Frontend**
* **Framework**: Next.js 15 (App Router + Turbopack)
* **Styling**: Tailwind CSS 4, Radix UI, shadcn/ui components
* **Animations**: Framer Motion
* **Icons**: Lucide React
* **State Management**: Zustand
* **Forms**: React Hook Form + Zod validation

### **Backend**
* **Database**: PostgreSQL (Neon) with Prisma ORM
* **Authentication**: NextAuth.js v5 (Google, GitHub, JWT)
* **File Storage**: Supabase Storage
* **AI Integration**: Vercel AI SDK + Google Generative AI
* **Email**: Nodemailer integration
* **Caching**: Next.js unstable_cache for performance

### **Development & Deployment**
* **Package Manager**: pnpm
* **Deployment**: Vercel
* **Type Safety**: TypeScript
* **Code Quality**: ESLint + Prettier

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/devwork.git
cd devwork
```

### 2️⃣ Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3️⃣ Set up environment variables

Create a `.env.local` file in the root directory and add:

```env
DATABASE_URL="YOUR_DATABASE_URL"

AUTH_SECRET="YOUR_AUTH_SECRET" 
AUTH_TRUST_HOST=true

AUTH_GOOGLE_ID="YOUR_GOOGLE_CLIENT_ID"
AUTH_GOOGLE_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

AUTH_GITHUB_ID="YOUR_GITHUB_CLIENT_ID"
AUTH_GITHUB_SECRET="YOUR_GITHUB_CLIENT_SECRET"

NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"

GOOGLE_GENERATIVE_AI_API_KEY="YOUR_GOOGLE_GENERATIVE_AI_KEY"
```


### 4️⃣ Run Prisma migrations

```bash
npx prisma generate
npx prisma migrate dev
```

### 5️⃣ Start the development server

```bash
pnpm dev
# or
npm run dev
```

Visit 👉 https://devwork-two.vercel.app

## 🎯 Project Structure

```
devwork/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (public)/          # Public pages
│   ├── api/               # API routes
│   ├── client/            # Client dashboard
│   ├── developer/         # Developer dashboard
│   └── job/               # Public job viewing
├── actions/               # Server actions
├── components/            # Reusable components
├── lib/                   # Utility functions
├── prisma/                # Database schema
├── public/                # Static assets
└── types/                 # TypeScript definitions
```

## 🔧 Available Scripts

* `pnpm dev` – Start development server with Turbopack
* `pnpm build` – Build production application
* `pnpm start` – Start production server
* `pnpm lint` – Run ESLint checks
* `pnpm db:generate` – Generate Prisma client
* `pnpm db:migrate` – Run database migrations
* `pnpm db:studio` – Open Prisma Studio

## 🌐 Deployment

The easiest way to deploy Dev Work is on **Vercel**.

### **Steps:**
1. Add all environment variables in your Vercel dashboard
2. Push your repo to GitHub/GitLab/Bitbucket
3. Connect it to Vercel and deploy
4. Configure your domain (optional)

### **Environment Variables for Production:**
Make sure to set all the environment variables listed in the setup section in your Vercel dashboard.

## 🚀 Performance Features

* **Server-Side Rendering** with Next.js App Router
* **Optimized Caching** with Next.js unstable_cache
* **Image Optimization** with Next.js Image component
* **Code Splitting** and lazy loading
* **Database Connection Pooling** with Prisma
* **CDN Integration** with Vercel Edge Network

## 🔒 Security Features

* **JWT Authentication** with secure token handling
* **Role-based Access Control** (RBAC)
* **Protected Routes** with middleware
* **Input Validation** with Zod schemas
* **File Upload Security** with type and size validation
* **SQL Injection Protection** with Prisma ORM

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 

### **How to Contribute:**
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

* Inspired by Upwork's marketplace model
* Built with modern web technologies
* Powered by AI for enhanced user experience
