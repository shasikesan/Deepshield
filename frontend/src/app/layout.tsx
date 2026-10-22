import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeepShield — AI Verification",
  description: "Deepfake detection, support, growth — all in one window",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
