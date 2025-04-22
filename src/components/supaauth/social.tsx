"use client";

import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export function SocialSignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<string | null>(null);
  
  const supabase = createClient();

  const handleSocialSignIn = async (providerName: "github" | "google") => {
    try {
      setIsLoading(true);
      setProvider(providerName);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: providerName,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(`Error signing in with ${providerName}: ${error.message}`);
      }
    } catch (error) {
      console.error(`Error signing in with ${providerName}:`, error);
      toast.error(`Failed to sign in with ${providerName}`);
    } finally {
      setIsLoading(false);
      setProvider(null);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={() => handleSocialSignIn("github")}
          disabled={isLoading}
        >
          <FaGithub className="h-5 w-5" />
          <span>GitHub</span>
          {isLoading && provider === "github" && (
            <span className="ml-2 animate-spin">⏳</span>
          )}
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={() => handleSocialSignIn("google")}
          disabled={isLoading}
        >
          <FaGoogle className="h-5 w-5 text-red-500" />
          <span>Google</span>
          {isLoading && provider === "google" && (
            <span className="ml-2 animate-spin">⏳</span>
          )}
        </Button>
      </div>
    </div>
  );
}