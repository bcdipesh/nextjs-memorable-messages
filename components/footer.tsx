import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f5f5f5] container py-16">
      <div className="flex flex-col md:flex-row justify-between">
        <Logo />
        <div className="my-4 md:my-0">
          <Button variant="link" asChild className="pl-0 font-light">
            <Link href="/terms-of-service">Terms of service</Link>
          </Button>
          <Button variant="link" asChild className="font-light">
            <Link href="privacy-policy">Privacy notice</Link>
          </Button>
        </div>
      </div>
      <hr className="my-6 border-t-1 border-[#dbdbdb]" />
      <p className="mt-10 text-xs font-light text-[#636363]">
        &copy; {currentYear} Memorable Messages. Made to create memories that
        will last a lifetime.
      </p>
    </footer>
  );
}
