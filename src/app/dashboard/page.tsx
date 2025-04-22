"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { getNotes } from "@/lib/services/supabase-db";
import { Note } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import NoteItem from "@/components/notes/note-item";
import NoteEditor from "@/components/notes/note-editor";
import AISummaryFeature from "@/components/notes/ai-summary-feature";
import { Plus, Menu, X, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";

export default function Dashboard() {
  const [user, setUser] = useState<import("@supabase/supabase-js").User | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseBrowser();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/login");
        return;
      }

      setUser(data.session.user);
    };

    checkUser();


    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };


    handleResize();


    window.addEventListener('resize', handleResize);


    return () => window.removeEventListener('resize', handleResize);
  }, [router, supabase.auth]);


  useEffect(() => {
    if (selectedNote && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [selectedNote]);

  const {
    data: notes = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    enabled: !!user,
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleNewNote = () => {
    const emptyNote: Note = {
      id: uuidv4(),
      title: "Untitled Note",
      content: "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: user?.id || "",
    };

    setSelectedNote(emptyNote);
    setIsCreatingNew(true);

    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleBackToNotesList = () => {
    setSelectedNote(null);
    setIsCreatingNew(false);

    if (window.innerWidth < 768) {
      setSidebarOpen(true);
    }
  };

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-xl font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 dark:bg-gray-900">

      <div className="md:hidden flex items-center justify-between p-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        {selectedNote ? (
          <>
            <Button
              onClick={handleBackToNotesList}
              variant="ghost"
              size="sm"
              className="flex items-center"
            >
              <ChevronLeft size={18} className="mr-1" />
              <span>Notes</span>
            </Button>
            <h1 className="text-sm font-medium text-blue-600 max-w-[60%] truncate">
              {selectedNote.title}
            </h1>
          </>
        ) : (
          <>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-bold text-blue-600">Perfect Notes</h1>
          </>
        )}
        <Button
          onClick={handleNewNote}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
        >
          <Plus size={18} />
        </Button>
      </div>


      <div
        className={`
    ${sidebarOpen ? 'fixed inset-0 z-40 block w-full md:w-72' : 'hidden'} 
    md:relative md:block md:w-72 lg:w-80 
    bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
    flex flex-col h-full md:h-screen
  `}
      >

        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-blue-600">Perfect Notes</h1>
          <Button
            onClick={toggleSidebar}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <X size={18} />
          </Button>
        </div>


        <div className="hidden md:flex md:items-center md:justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-blue-600">Perfect Notes</h1>
        </div>


        <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-medium">My Notes</h2>
          <Button
            onClick={handleNewNote}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Plus size={18} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          {isLoading ? (
            <div className="p-4 text-sm text-gray-500">Loading notes...</div>
          ) : isError ? (
            <div className="p-4 text-sm text-red-500">Error loading notes</div>
          ) : notes.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">No notes yet</div>
          ) : (
            <div className="space-y-1 p-2">
              {notes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  isSelected={selectedNote?.id === note.id}
                  onClick={() => {
                    setSelectedNote(note);
                    setIsCreatingNew(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium truncate max-w-[150px]">{user.email}</div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-xs"
            >
              Log out
            </Button>
          </div>
        </div>
      </div>


      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-30"
          onClick={toggleSidebar}
        ></div>
      )}


      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-grow overflow-y-auto p-2 sm:p-4">
          {!selectedNote && <AISummaryFeature />}

          {selectedNote ? (
            <NoteEditor
              note={selectedNote}
              isNew={isCreatingNew}
              onSave={() => {
                toast.success("Note saved successfully");
                refetch();
                setIsCreatingNew(false);
              }}
              onCancel={handleBackToNotesList}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p className="text-lg text-center">Select a note or create a new one</p>
              <Button
                onClick={handleNewNote}
                variant="outline"
                className="mt-4"
              >
                <Plus size={16} className="mr-2" /> Create new note
              </Button>
            </div>
          )}
        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}