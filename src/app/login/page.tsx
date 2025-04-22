"use client";

import { SignInForm } from "@/components/supaauth/signin";
import { RegisterForm } from "@/components/supaauth/register";
import { SocialSignIn } from "@/components/supaauth/social";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Toaster } from "sonner";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const signupParam = searchParams.get("signup");
    if (signupParam === "true") {
      setActiveTab("signup");
    }
  }, [searchParams]);

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

        <div className="flex rounded-md bg-gray-200 dark:bg-gray-700 p-1">
          <button
            className={`w-1/2 py-2.5 text-sm font-medium rounded-md transition-all duration-200 
              ${activeTab === "signin" 
                ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow" 
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            onClick={() => setActiveTab("signin")}
          >
            Sign In
          </button>
          <button
            className={`w-1/2 py-2.5 text-sm font-medium rounded-md transition-all duration-200 
              ${activeTab === "signup" 
                ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow" 
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>
        
        <div className="mt-8">
          {activeTab === "signin" ? <SignInForm /> : <RegisterForm />}
          
          <div className="mt-6">
            <SocialSignIn />
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            {activeTab === "signin" ? (
              <p>
                Don&apos;t have an account yet?{" "}
                <button 
                  onClick={() => setActiveTab("signup")}
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
                >
                  Create an account
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button 
                  onClick={() => setActiveTab("signin")}
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}