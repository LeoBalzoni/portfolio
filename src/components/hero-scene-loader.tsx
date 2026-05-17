"use client";

import dynamic from "next/dynamic";

function HeroSceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-32 w-32 animate-pulse rounded-full border border-border/60 bg-muted/30" />
        <p className="font-heading text-xs italic text-muted-foreground/70">
          summoning Da Vinci…
        </p>
      </div>
    </div>
  );
}

const HeroScene = dynamic(
  () => import("@/components/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false, loading: HeroSceneFallback }
);

export function HeroSceneLoader() {
  return <HeroScene />;
}
