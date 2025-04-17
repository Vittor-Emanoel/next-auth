"use client";

import { Button } from "@/components/ui/button";
import { signOutAction } from "../_actions/signOutAction";

export function AppBar() {
  return (
    <header className="h-[80px] flex justify-end border-b items-center px-6">
      <Button size="sm" onClick={signOutAction}>
        Sair
      </Button>
    </header>
  );
}
