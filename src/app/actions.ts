'use server'

import { redirect } from 'next/navigation'
import { auth } from 'firebase-admin'
import { getAuth } from 'firebase/auth';
import { initializeFirebase } from '@/firebase/index';

export async function searchAction(formData: FormData) {
  const query = formData.get('query') as string
  redirect(`/dashboard/search?q=${encodeURIComponent(query)}`)
}

export async function signOutAction() {
  // This is a server action, but sign-out is a client-side operation.
  // We'll handle the actual sign-out on the client and redirect from there.
  // For now, this just redirects to the login page.
  // In a real app, you might invalidate a server-side session here.
  redirect('/login');
}
