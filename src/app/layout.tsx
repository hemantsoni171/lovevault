import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "LoveVault",
  description: "A private, romantic space for couples ❤️",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        {/* Basic Meta */}
        <meta name="description" content="A private, romantic space for couples ❤️" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="LoveVault" />
        <meta property="og:description" content="A private, romantic space for couples ❤️" />
        <meta property="og:image" content="/images/cover.png" />
        <meta property="og:url" content="https://your-site.vercel.app" />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
