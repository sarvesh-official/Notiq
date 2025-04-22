"use client";

import { useState, useEffect } from "react";
import { Note } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { createNote, updateNote, deleteNote } from "@/lib/services/supabase-db";
import { summarizeNote } from "@/lib/services/gemini";
import { toast } from "sonner";
import { Loader2, Save, Trash, Sparkles, ChevronLeft } from "lucide-react";

interface NoteEditorProps {
  note: Note;
  isNew?: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export default function NoteEditor({ 
  note, 
  isNew = false, 
  onSave, 
  onCancel 
}: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [summary, setSummary] = useState(note.summary || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);

  // Update state when the note prop changes
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setSummary(note.summary || "");
  }, [note]);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title for your note");
      return;
    }
    
    try {
      setIsSaving(true);
      
      const updatedNote = {
        ...note,
        title,
        content,
        summary,
        updated_at: new Date().toISOString(),
      };
      
      if (isNew) {
        await createNote(updatedNote);
      } else {
        await updateNote(note.id, updatedNote);
      }
      
      onSave();
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (isNew) {
      onCancel();
      return;
    }
    
    try {
      setIsDeleting(true);
      await deleteNote(note.id);
      toast.success("Note deleted successfully");
      onCancel();
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    } finally {
      setIsDeleting(false);
    }
  };

  const generateSummary = async () => {
    if (!content.trim()) {
      toast.error("Please enter some content before generating a summary");
      return;
    }
    
    try {
      setIsGeneratingSummary(true);
      const generatedSummary = await summarizeNote(content);
      setSummary(generatedSummary);
      toast.success("Summary generated successfully");
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary");
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-2 sm:p-4 bg-white dark:bg-gray-800 rounded-md">
      {/* Mobile back button (for smaller screens) */}
      <div className="md:hidden mb-2">
        <Button
          variant="ghost"
          size="sm"
          className="pl-0"
          onClick={onCancel}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>
      </div>

      {/* Header with title and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="text-xl font-medium bg-transparent border-none shadow-none focus-visible:ring-0 px-0 h-auto w-full"
        />
        
        {/* Desktop actions */}
        <div className="hidden sm:flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={generateSummary}
            disabled={isGeneratingSummary || !content.trim()}
          >
            {isGeneratingSummary ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 mr-1" />
            )}
            Summarize
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Trash className="h-4 w-4 mr-1" />
            )}
            Delete
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-1" />
            )}
            Save
          </Button>
        </div>
        
        {/* Mobile actions - simplified */}
        <div className="flex sm:hidden items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMoreActions(!showMoreActions)}
          >
            Actions
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile action menu */}
      {showMoreActions && (
        <div className="sm:hidden flex mb-3 space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={generateSummary}
            disabled={isGeneratingSummary || !content.trim()}
          >
            {isGeneratingSummary ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 mr-1" />
            )}
            Summarize
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Trash className="h-4 w-4 mr-1" />
            )}
            Delete
          </Button>
        </div>
      )}

      {/* Content area */}
      <div className="flex-grow flex flex-col space-y-4">
        <div className="flex-grow">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            className="h-full min-h-[200px] resize-none bg-gray-50 dark:bg-gray-900 p-3"
          />
        </div>
        
        <div>
          <div className="font-medium text-sm mb-1">AI Summary</div>
          <Textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Generate an AI summary or write your own..."
            className="h-24 resize-none bg-gray-50 dark:bg-gray-900 p-3"
          />
        </div>
      </div>
    </div>
  );
}