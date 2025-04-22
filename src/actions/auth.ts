"use server";

import { createSupabaseServer } from "@/lib/supabase/server";

export async function signup(email: string, password: string) {
  const supabase = createSupabaseServer();
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });
  
  if (error) {
    return { error };
  }
  
  return { data };
}

export async function login(email: string, password: string) {
  const supabase = createSupabaseServer();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    return { error };
  }
  
  return { data };
}

export const verifyOtp = async (data: {
	email: string;
	otp: string;
	type: string;
}) => {
	const supabase = createSupabaseServer();

	const res = await supabase.auth.verifyOtp({
		email: data.email,
		token: data.otp,
		type: "email",
	});
	return JSON.stringify(res);
};
