"use client";
import dynamic from "next/dynamic";

// Loaded after hydration so they stay out of the first-load bundle.
const Intro = dynamic(() => import("./Intro"), { ssr: false });
const Cursor = dynamic(() => import("./ui/Cursor"), { ssr: false });

export function ClientExtras() {
  return (
    <>
      <Intro />
      <Cursor />
    </>
  );
}
