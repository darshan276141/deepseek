import { Inter } from "next/font/google";
import "./globals.css";
import "./prism.css";
import { ClerkProvider } from '@clerk/nextjs';
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

// Initialize the Inter font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Deepseek",
  description: "Full Stack Project",
};

// RootLayout component to wrap the entire application
export default function RootLayout({ children }) {
  return (
    // Wrap the entire layout in <html> and <body> tags as required by Next.js
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {/* Providers go inside the <body> tag to apply context to your app */}
        <ClerkProvider>
          <AppContextProvider>
            {/* Toast notifications */}
            <Toaster
              toastOptions={{
                success: {
                  style: { backgroundColor: "black", color: "white" },
                },
                error: {
                  style: { backgroundColor: "black", color: "white" },
                },
              }}
            />
            {/* The actual page content */}
            {children}
          </AppContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
