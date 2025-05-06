
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';

// Use the provided publishable key directly
const PUBLISHABLE_KEY = "pk_test_Y2xvc2luZy1mbG91bmRlci03Mi5jbGVyay5hY2NvdW50cy5kZXYk";

// Check if the key is available
if (!PUBLISHABLE_KEY) {
  console.error("Missing Clerk Publishable Key. Set VITE_CLERK_PUBLISHABLE_KEY in your environment variables.");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY}
    afterSignInUrl="/dashboard"
    afterSignUpUrl="/dashboard"
    signInUrl="/login"
    signUpUrl="/login"
  >
    <App />
  </ClerkProvider>
);
