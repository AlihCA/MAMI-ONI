import { ClerkProvider } from '@clerk/clerk-react';

// Clerk configuration
export const clerkConfig = {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  appearance: {
    theme: {
      primaryColor: '#000000',
      primaryColorText: '#ffffff',
    },
    elements: {
      formButtonPrimary: 'bg-black hover:bg-gray-800 text-white',
      card: 'shadow-lg',
      headerTitle: 'text-2xl font-bold',
      headerSubtitle: 'text-gray-600',
    },
  },
};

// Check if Clerk is properly configured
export const isClerkConfigured = () => {
  return !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
};