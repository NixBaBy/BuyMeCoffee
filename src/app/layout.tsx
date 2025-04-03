import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import UsersProvider from "./_context/UsersContext";
import ProfileProvider from "./_context/ProfileContext";
import BankCardProvider from "./_context/BankCardContext";
import DonationProvider from "./_context/DonationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <UsersProvider>
          <DonationProvider>
            <ProfileProvider>
              <BankCardProvider>
                <Header />
                {children}
              </BankCardProvider>
            </ProfileProvider>
          </DonationProvider>
        </UsersProvider>
      </body>
    </html>
  );
}
