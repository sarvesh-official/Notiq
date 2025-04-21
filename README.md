# 🧠 PerfectNotes – Your AI-Powered Second Brain

**PerfectNotes** is a minimalist, smart note-taking app built with **Next.js, Supabase, and DeepSeek AI**. Designed for speed and simplicity, Notiq helps users capture, organize, and summarize their thoughts — all in one intelligent workspace.

> Built as part of a Full Stack Intern assignment to demonstrate proficiency in modern web technologies and integration of AI into a real-world app.

---

## 🚀 Live Demo

- 🔗 **Deployed App**: [https://perfectnotes.vercel.app](https://perfectnotes.vercel.app)  
- 🔗 **GitHub Repo**: [https://github.com/sarvesh-official/perfectnotes](https://github.com/sarvesh-official/perfectnotes)

---

## 🛠 Tech Stack

| Frontend              | Backend               | AI & State Management        | Styling / UI        |
|------------------------|------------------------|-------------------------------|---------------------|
| Next.js (TypeScript)   | Supabase (Auth + DB)   | React Query, Gemini API     | TailwindCSS, Shadcn |

---

## ✨ Features

### ✅ Authentication (Supabase)
- Sign up & login with **Google**
- Sign up & login with **Email/Password**

### 📝 Notes CRUD
- Create, edit, and delete notes
- Real-time syncing with Supabase
- Optimistic UI updates with React Query

### 🤖 AI Summarization
- Highlight or select a note and click “Summarize”
- Uses **Gemini API** to generate a short summary
- Works for long-form or bullet-style notes

### 💾 State Management
- **React Query** handles all data fetching, caching, and mutation
- Smooth user experience with query invalidation and optimistic updates

### 🎨 UI & UX
- Fully responsive layout
- Built with **Shadcn UI components**
- (Optional) Dark mode toggle

---

## 📷 Screenshots


## 📦 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/perfectnotes
cd notiq

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create a .env.local file and add:

NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_anon_key>
DEEPSEEK_API_KEY=<your_deepseek_api_key>

# 4. Run the development server
npm run dev
