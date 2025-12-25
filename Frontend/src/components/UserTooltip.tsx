"use client";
import { Button } from "./ui/button";
import { User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useAuthStore } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

export function UserToolTip() {
  const signOut = useAuthStore((state) => state.signOut);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <User2 size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href="/profile">
          <DropdownMenuItem className="hover:bg-none cursor-pointer">
            My Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button className="w-full" onClick={handleSignOut}>
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
