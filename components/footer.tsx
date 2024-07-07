import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between">
          <Logo />
          <div className="my-4 md:my-0">
            <Button variant="link" asChild className="pl-0">
              <Link href="/terms-of-service">Terms of service</Link>
            </Button>
            <Button variant="link" asChild className="pr-0">
              <Link href="privacy-policy">Privacy notice</Link>
            </Button>
          </div>
        </div>
        <hr className="my-6 border-muted-foreground" />
        <p className="mt-10 text-xs text-muted-foreground">
          &copy; {currentYear} Memorable Messages. Made to create memories that
          will last a lifetime.
        </p>
      </div>
    </footer>
  );
}
