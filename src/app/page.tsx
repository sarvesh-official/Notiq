"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function Home() {
  const supabase = createSupabaseBrowser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
      setIsLoading(false);
    };
    
    checkSession();
  }, [supabase.auth]);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Perfect Notes</span>
            </div>
            <div className="flex items-center">
              {isLoading ? (
                <div className="px-4 py-2 rounded-md text-sm font-medium text-gray-400 bg-gray-100">
                  Loading...
                </div>
              ) : isLoggedIn ? (
                <Link href="/dashboard" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                  Go to Dashboard
                </Link>
              ) : (
                <Link href="/login" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">Take better notes</span>
                <span className="block text-blue-600">with Perfect Notes</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg">
                A beautiful and intuitive note-taking application designed to help you capture your thoughts, organize ideas, and boost productivity.
              </p>
              <div className="mt-8 flex gap-4">
                {isLoggedIn ? (
                  <Link href="/dashboard" className="px-6 py-3 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link href="/login?signup=true" className="px-6 py-3 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                    Get started - It&apos;s free
                  </Link>
                )}
                <a href="#features" className="px-6 py-3 rounded-md text-base font-medium text-blue-600 bg-transparent border border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700">
                  Learn more
                </a>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 flex justify-center">
              <div className="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg shadow-lg transform rotate-3 w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-sm mb-4">
                  <div className="h-4 w-1/3 bg-blue-200 dark:bg-blue-900 rounded mb-2"></div>
                  <div className="h-3 w-full bg-gray-100 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-sm mb-4">
                  <div className="h-4 w-1/2 bg-green-200 dark:bg-green-900 rounded mb-2"></div>
                  <div className="h-3 w-full bg-gray-100 dark:bg-gray-600 rounded mb-1"></div>
                  <div className="h-3 w-4/5 bg-gray-100 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-sm">
                  <div className="h-4 w-2/5 bg-purple-200 dark:bg-purple-900 rounded mb-2"></div>
                  <div className="h-3 w-full bg-gray-100 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="features" className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
              Features designed for your productivity
            </h2>
            <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Organized Notes</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Keep your thoughts organized with folders, tags, and powerful search capabilities.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Rich Text Editor</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Format your notes with a powerful and intuitive rich text editor.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Secure Sync</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Your notes securely synced across all your devices, available whenever you need them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Perfect Notes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
