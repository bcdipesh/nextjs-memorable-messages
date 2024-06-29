import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function MainNav() {
  return (
    <header className="py-4">
      <nav className="flex flex-col md:flex-row justify-between">
        <Logo />

        <div className="flex justify-between space-x-4">
          <div>
            <SignedOut>
              <Button variant="ghost" asChild>
                <SignInButton />
              </Button>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
