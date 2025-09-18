
# 🚀 Dev Work

Dev Work is a freelance marketplace platform inspired by Upwork, built with **Next.js 15 App Router**. It connects clients and developers, providing authentication, project postings, and AI-powered enhancements.

## 📌 Features

* 🔐 **Authentication** – JWT + NextAuth with Google & GitHub providers
* 🗄 **Database** – PostgreSQL with Prisma ORM
* 🎨 **UI/UX** – Tailwind CSS, Radix UI, shadcn components, Lucide Icons
* ⚡ **State Management** – Zustand
* 📤 **Email Services** – Nodemailer integration
* 🤖 **AI Integration** – Google Generative AI + Vercel AI SDK
* 📦 **Form Handling** – React Hook Form + Zod validation
* ☁️ **Supabase** – For storage and real-time features

## 🛠 Tech Stack

* **Framework**: Next.js 15 (App Router + Turbopack)
* **Database**: PostgreSQL (Neon + Prisma)
* **Auth**: NextAuth.js (Google, GitHub, JWT)
* **Styling**: Tailwind CSS 4, Radix UI, Motion
* **AI**: Vercel AI SDK, Google Generative AI
* **Other**: Zustand, Supabase, Nodemailer

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/devwork.git
cd devwork
```

### 2️⃣ Install dependencies

```bash
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
npm run dev
```

Visit 👉 https://devwork-two.vercel.app

## 🌐 Deployment

The easiest way to deploy Dev Work is on **Vercel**.

* Add all environment variables in your Vercel dashboard.
* Push your repo to GitHub/GitLab/Bitbucket.
* Connect it to Vercel and deploy.

## 📂 Project Scripts

* `npm run dev` – Start dev server with Turbopack
* `npm run build` – Build project
* `npm run start` – Start production server
* `npm run lint` – Run ESLint checks
* `postinstall` – Auto-generate Prisma client

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open a PR or submit an issue.
