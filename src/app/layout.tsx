import { ThemeProvider } from "@/providers/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MediStore - Your Trusted Online Pharmacy & Healthcare Store",
    template: "%s | MediStore",
  },
  description:
    "MediStore is your reliable online pharmacy offering prescription medicines, healthcare products, wellness supplements, and medical equipment. Shop safely with fast delivery and expert support.",
  keywords: [
    "online pharmacy",
    "medicine store",
    "prescription drugs",
    "healthcare products",
    "medical supplies",
    "wellness supplements",
    "online medicine",
    "pharmacy delivery",
    "health products",
  ],
  authors: [{ name: "MediStore Team" }],
  creator: "MediStore",
  publisher: "MediStore",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "MediStore - Your Trusted Online Pharmacy & Healthcare Store",
    description:
      "Shop prescription medicines, healthcare products, and wellness supplements with fast delivery and expert support.",
    url: "/",
    siteName: "MediStore",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MediStore - Your Trusted Online Pharmacy",
    description:
      "Shop prescription medicines, healthcare products, and wellness supplements with fast delivery.",
    creator: "@medistore",
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
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
