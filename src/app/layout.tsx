import { view } from "framer-motion/client";
import "./globals.css";

export const metadata = {
  viewport: "width=device-width, initial-scale=1",
  title: "Manas Portfolio",
  description: "Welcome to my personal portfolio website!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}