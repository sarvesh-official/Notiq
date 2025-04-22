"use client";

import { Note } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface NoteItemProps {
  note: Note;
  isSelected: boolean;
  onClick: () => void;
}

export default function NoteItem({ note, isSelected, onClick }: NoteItemProps) {
  // Adjust content preview length based on available space
  const contentPreview = note.content
    ? note.content.substring(0, 60) + (note.content.length > 60 ? "..." : "")
    : "No content";

  const formattedDate = formatDistanceToNow(new Date(note.updated_at), {
    addSuffix: true,
  });

  return (
    <div
      className={cn(
        "p-2 sm:p-3 rounded-md cursor-pointer transition-colors",
        isSelected
          ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800"
          : "hover:bg-gray-100 dark:hover:bg-gray-700/50 border border-transparent"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-sm truncate max-w-[80%]">{note.title}</h3>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 break-words">
        {contentPreview}
      </p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-500 dark:text-gray-400 truncate mr-2">
          {formattedDate}
        </span>
        {note.summary && (
          <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
            AI
          </span>
        )}
      </div>
    </div>
  );
}