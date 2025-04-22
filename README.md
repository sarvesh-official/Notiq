# Perfect Notes: AI-Powered Note Taking App

A modern note-taking application with AI summarization capabilities using Gemini AI, built with Next.js, TypeScript, TailwindCSS, Shadcn UI components, and Supabase.

## Features

- **User Authentication**
  - Email and Password login
  - Social login with Google
  - Secure authentication with Supabase

- **Note Management**
  - Create, update, and delete notes
  - Rich text editor for note content
  - Real-time updates

- **AI Summarization**
  - Automatically generate summaries of your notes using Google's Gemini AI
  - Quickly capture key points from longer notes

- **Modern UI/UX**
  - Responsive design that works on mobile and desktop
  - Dark mode support
  - Clean and intuitive user interface with Shadcn UI components

## Tech Stack

- **Frontend**
  - Next.js 15.3.1 with TypeScript
  - TailwindCSS for styling
  - Shadcn UI for components
  - React Query for state management and data fetching

- **Backend**
  - Supabase for authentication and database
  - Row-level security for data protection
  - Serverless functions

- **AI Integration**
  - Google's Gemini API for note summarization

## Setup Instructions

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- A Supabase account
- A Google API key for Gemini AI

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

### Supabase Setup

1. Create a new project in Supabase
2. Go to the SQL Editor and run the SQL commands from `supabase-schema.sql` to set up the database schema
3. Enable Google Auth in the Authentication settings (optional)
4. Copy your Supabase URL and anon key to your `.env.local` file

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/perfectnotes.git
   cd perfectnotes
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application

### Deployment on Vercel

This project includes a `vercel.json` configuration file for easy deployment on Vercel:

1. Push your code to a GitHub repository
2. Create a new project on [Vercel](https://vercel.com)
3. Connect your GitHub repository to Vercel
4. Configure the environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_GEMINI_API_KEY`
5. Click "Deploy"
6. Once deployment is complete, Vercel will provide you with a production URL

#### Vercel CLI Deployment (Alternative)

You can also deploy using the Vercel CLI:

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. Follow the prompts to configure your project and environment variables

## Project Structure

- `/src/app` - Next.js app router pages and API routes
- `/src/components` - React components
  - `/ui` - Shadcn UI components
  - `/notes` - Note-related components
  - `/supaauth` - Authentication components
- `/src/lib` - Utility functions and services
  - `/services` - API services for Gemini AI and Supabase
  - `/supabase` - Supabase client configuration
  - `/types` - TypeScript type definitions
- `/src/providers` - React context providers

## Usage

1. Register or login to your account
2. Create a new note using the "+" button in the sidebar
3. Write your note content
4. Click "Generate Summary" to use AI to summarize your note
5. Save your note
6. View, edit, or delete your notes from the sidebar

## License

MIT

## Author

Your Name
