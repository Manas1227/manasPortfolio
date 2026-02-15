"use client";

import Navbar from "@/components/Navbar";
import AISearchBar from "@/components/AISearchBar";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [expandSearch, setExpandSearch] = useState(false as boolean | null);

  return (
    <>
        <Navbar setExpandSearch={setExpandSearch} />
        {children}
        <AISearchBar 
          externalSearch={expandSearch}
          onExternalHandled={() => setExpandSearch(null)}
        />
    </>
  );
}