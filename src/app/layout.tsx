import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";
import AISearchBar from "@/components/AISearchBar";

export const metadata = {
  title: "Manas Portfolio",
  description: "Welcome to my personal portfolio website!",
};

// Exported seperate because Next.js 14+ requires it
export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AnimatedBackground />
        {children}
        <AISearchBar />
      </body>
    </html>
  );
}