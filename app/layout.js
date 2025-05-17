import { Inter } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import "./prism.css";
import { ClerkProvider } from '@clerk/nextjs';
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

// Initialize the Inter font
=======
import { ClerkProvider } from '@clerk/nextjs';
import { AppContextProvider } from "@/context/AppContext";


>>>>>>> db45bc24f0c6e1e4e87e8cd73a48c6c017c80145
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Deepseek",
  description: "Full Stack Project",
};

<<<<<<< HEAD
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
=======
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppContextProvider>
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    </AppContextProvider>
    </ClerkProvider>
>>>>>>> db45bc24f0c6e1e4e87e8cd73a48c6c017c80145
  );
}
