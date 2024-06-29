import Logo from "@/components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <hr className="my-4 border-t-2" />
      <div className="flex flex-col md:flex-row justify-between">
        <Logo />
        <div className="my-4 md:my-0">
          <Button variant="link" asChild className="pl-0">
            <Link href="/terms-of-service">Terms of Service</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="privacy-policy">Privacy Policy</Link>
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground my-6">
        &copy; {currentYear} Memorable Messages. Made to create memories that
        will last a lifetime.
      </p>
    </footer>
  );
}
