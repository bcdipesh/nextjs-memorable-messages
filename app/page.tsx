import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="container flex-grow grid grid-cols-3 place-content-center my-4">
      {user ? (
        <div className="col-span-full md:col-end-3 md:row-start-1">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome back, {`${user?.given_name} ${user?.family_name}`}
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            So excited to see you again, ! We&apos;re here to help you make
            every celebration unforgettable.
          </p>
        </div>
      ) : (
        <div className="col-span-full md:col-end-3 md:row-start-1">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Capture life&apos;s precious moments with heartfelt messages that
            last
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Create personalized messages for birthdays, anniversaries, holidays,
            or any special occasion. Set them to deliver automatically and
            cherish memories forever.
          </p>
        </div>
      )}

      <Image
        className="col-span-full md:col-start-3 md:col-end-4 md:row-start-1"
        src="/hero.svg"
        alt="Women sending heartfelt messages"
        width={720}
        height={520}
        priority
      />

      {user ? (
        <>
          <p className="col-span-full leading-7 [&:not(:first-child)]:mt-6">
            Create a new message and bring joy to someone&apos;s day!
          </p>
          <Button asChild className="w-fit mt-2">
            <Link href="/occasions">Create</Link>
          </Button>
        </>
      ) : (
        <>
          <p className="col-span-full leading-7 [&:not(:first-child)]:mt-6">
            Click on the Start now button to start sending memorable messages
            today!
          </p>
          <Button asChild className="w-fit mt-2">
            <Link href="/occasions">Start now</Link>
          </Button>
        </>
      )}
    </div>
  );
}
