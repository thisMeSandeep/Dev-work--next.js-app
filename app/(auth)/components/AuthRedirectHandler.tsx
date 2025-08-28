"use client";

import { useEffect } from "react";
// import { useRouter } from "next/navigation";

export default function AuthRedirectHandler() {
//   const router = useRouter();

  useEffect(() => {
    // Check if this page was reached via an auth redirect
    const isAuthRedirect = document.referrer && 
      (document.referrer.includes('/client') || document.referrer.includes('/developer'));
    
    if (isAuthRedirect) {
      window.history.replaceState(null, '', '/');
    }
  }, []);

  return null; // This component doesn't render anything
}
