"use client";

import { SocialSignIn } from "@/components/supaauth/social";
import Image from "next/image";
import { Toaster } from "sonner";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Image
            src="/images/logo.svg"
            alt="Perfect Notes Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome to Perfect Notes
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Your personal space for ideas and thoughts
          </p>
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sign in to continue</h1>
            <p className="text-gray-500 dark:text-gray-400">Use your Google account to access Perfect Notes</p>
          </div>
          
          <SocialSignIn googleOnly={true} />
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}