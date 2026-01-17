import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import AISearchBar from "@/components/AISearchBar";

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
      <body>
        <AnimatedBackground />
        <Navbar />
        {children}
        <AISearchBar />
      </body>
    </html>
  );
}