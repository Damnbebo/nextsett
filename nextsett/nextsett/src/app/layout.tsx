import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/language-context";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://nextsett.com'),
  title: "next.sett - Your Next Set Awaits",
  description: "Modern custom press-on nails, Gel-X extensions, and structured manicures by Nicole, a licensed cosmetologist in Wharton, NJ. Professional nail artistry tailored to your style.",
  keywords: "custom press on nails NJ, Gel-X nails, structured manicure, press-on nails, nail art, Wharton NJ, licensed cosmetologist",
  authors: [{ name: "Nicole", url: "https://www.instagram.com/next.sett" }],
  openGraph: {
    title: "next.sett - Your Next Set Awaits",
    description: "Modern custom press-on nails, Gel-X extensions, and structured manicures by Nicole, a licensed cosmetologist in Wharton, NJ.",
    url: "https://nextsett.com",
    siteName: "next.sett",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "next.sett - Professional Nail Artistry",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "next.sett - Your Next Set Awaits",
    description: "Modern custom press-on nails, Gel-X extensions, and structured manicures by Nicole, a licensed cosmetologist in Wharton, NJ.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
