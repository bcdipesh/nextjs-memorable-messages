import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { checkUser } from "@/lib/check-user";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default async function MainNav() {
  await checkUser();

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
