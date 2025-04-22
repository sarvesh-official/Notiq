"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function AISummaryFeature() {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const dismissed = localStorage.getItem('ai-summary-feature-dismissed');
    if (dismissed) {
      setIsVisible(false);
    }
  }, []);
  
  const handleDismiss = () => {
    localStorage.setItem('ai-summary-feature-dismissed', 'true');
    setIsVisible(false);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
          <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="font-medium text-blue-800 dark:text-blue-200">AI-Powered Summaries</h3>
          <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
            Perfect Notes uses Google&apos;s Gemini AI to automatically summarize your notes.
            Click &quot;Generate Summary&quot; when editing a note to create a concise overview of your content.
          </p>
          <div className="mt-3 flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/50"
              onClick={handleDismiss}
            >
              Dismiss
            </Button>
            <span className="text-xs text-blue-600 dark:text-blue-400">
              We&apos;ll remember your preference
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}