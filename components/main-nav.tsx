import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function MainNav() {
  return (
    <header className="my-4">
      <nav className="flex flex-col md:flex-row justify-between">
        <Logo />

        <div className="flex justify-between space-x-4 my-4 md:my-0">
          <div>
            <SignedOut>
              <Button variant="ghost" asChild>
                <SignInButton />
              </Button>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonTrigger: "size-9",
                  },
                }}
              />
            </SignedIn>
          </div>

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
