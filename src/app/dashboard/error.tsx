"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {

    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h2 className="mb-4 text-2xl font-bold text-red-600">Something went wrong!</h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400 max-w-md">
        An error occurred while loading your notes. Please try again or contact support if the problem persists.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="default">
          Try again
        </Button>
        <Button onClick={() => window.location.href = "/"} variant="outline">
          Go to home page
        </Button>
      </div>
    </div>
  );
}