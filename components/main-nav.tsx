import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function MainNav() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let jsxContent: React.JSX.Element;

  if (user) {
    // Check if the user is already in the database
    const loggedInUser = await db.user.findUnique({
      where: {
        kindeUserId: user.id,
      },
    });

    // If not in database, create new user
    if (!loggedInUser) {
      await db.user.create({
        data: {
          kindeUserId: user.id,
          name: `${user?.given_name} ${user?.family_name}`,
          imageUrl: user?.picture,
          email: user?.email as string,
        },
      });
    }

    jsxContent = (
      <div className="flex space-x-2 items-center">
        <Avatar>
          <AvatarImage src={user?.picture as string} />
          <AvatarFallback>{`${user?.given_name} ${user?.family_name}`}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold">{`${user?.given_name} ${user?.family_name}`}</p>
          <LogoutLink className="text-sm">Sign out</LogoutLink>
        </div>
      </div>
    );
  } else {
    jsxContent = (
      <div className="space-x-4">
        <Button variant="ghost" asChild>
          <LoginLink>Sign in</LoginLink>
        </Button>
        <Button asChild>
          <RegisterLink>Start for free</RegisterLink>
        </Button>
      </div>
    );
  }

  return (
    <header className="my-4 container">
      <nav className="flex flex-col md:flex-row justify-between">
        <Logo />

        <div className="flex items-center justify-between space-x-4 my-4 md:my-0">
          {jsxContent}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
