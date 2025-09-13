import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "DevWork - Platform for Freelancers & Clients",
  description: "DevWork is a modern platform connecting freelancers and clients, helping you find work or hire talent easily.",
  keywords: ["freelancers", "clients", "hire freelancers", "freelance work", "DevWork platform"],
  authors: [{ name: "DevWork Team", url: "https://yourwebsite.com" }],
  creator: "DevWork Team",
  publisher: "DevWork",
  metadataBase: new URL("https://yourwebsite.com"),
  openGraph: {
    title: "DevWork - Platform for Freelancers & Clients",
    description: "DevWork connects freelancers with clients efficiently.",
    url: "https://yourwebsite.com",
    siteName: "DevWork",
    images: [
      {
        url: "/assets/devwork.png",
        width: 1200,
        height: 630,
        alt: "DevWork Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
