import { createSupabaseBrowser } from "../supabase/client";
import { Note } from "../types";

const supabase = createSupabaseBrowser();

export async function getNotes() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return [];
    }
    
    const { data: notes, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", session.user.id)
      .order("updated_at", { ascending: false });

    if (error) {
      if (error.message.includes("does not exist")) {
        return [];
      }
      throw new Error(`Failed to fetch notes: ${error.message}`);
    }

    return notes as Note[] || [];
  } catch (error) {
    console.log("Error fetching notes:", error);
    return [];
  }
}

export async function getNoteById(id: string) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error("Authentication required");
    }
    
    const { data: note, error } = await supabase
      .from("notes")
      .select("*")
      .eq("id", id)
      .eq("user_id", session.user.id)
      .single();

    if (error) {
      throw new Error(`Failed to fetch note: ${error.message}`);
    }

    return note as Note;
  } catch (error) {
    throw error;
  }
}

export async function createNote(note: Partial<Note>) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error("Authentication required");
    }
    
    const noteWithUserId = {
      ...note,
      user_id: session.user.id
    };
    
    const { data, error } = await supabase
      .from("notes")
      .insert([noteWithUserId])
      .select("*")
      .single();

    if (error) {
      throw new Error(`Failed to create note: ${error.message}`);
    }

    return data as Note;
  } catch (error) {
    throw error;
  }
}

export async function updateNote(id: string, updates: Partial<Note>) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error("Authentication required");
    }
    
    const { data, error } = await supabase
      .from("notes")
      .update(updates)
      .eq("id", id)
      .eq("user_id", session.user.id)
      .select("*")
      .single();

    if (error) {
      throw new Error(`Failed to update note: ${error.message}`);
    }

    return data as Note;
  } catch (error) {
    throw error;
  }
}

export async function deleteNote(id: string) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error("Authentication required");
    }
    
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id)
      .eq("user_id", session.user.id);

    if (error) {
      throw new Error(`Failed to delete note: ${error.message}`);
    }

    return true;
  } catch (error) {
    throw error;
  }
}