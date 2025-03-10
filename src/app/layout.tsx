import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DebDevify",
  description: "Debdevify, web development, Next.js, MERN stack, SEO, cloud solution and DevOps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Head>
        <title>Debdevify - Best Web Solutions</title>
        <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
        <meta name="description" content="Debdevify - The best web development platform for modern businesses." />
        <meta name="keywords" content="Debdevify, web development, Next.js, MERN stack, SEO, cloud solutions and DevOps" />
        <meta name="author" content="Debdevify Team" />
        <meta property="og:title" content="Debdevify - The Best Web Development Platform" />
        <meta property="og:description" content="Join Debdevify to get high-quality web solutions." />
        <meta property="og:url" content="https://debdevify.com" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
        {children}
      </body>
    </html>
  );
}
