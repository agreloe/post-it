import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Header from "@/components/Header";
import { Providers } from "@/app/providers";


const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Post it.",
  description: "Where people can share their ideas.",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <SessionProvider session={session}>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
        </body>
      </SessionProvider>
    </html>
  );
}
