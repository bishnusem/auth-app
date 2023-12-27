"use client";

import Link from "next/link";
import "./style.scss";
import { UserButton, useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const Header = () => {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();

  return (
    <header>
      <Link href="/">Auth</Link>
      {isLoaded && user ? (
        <div className="account">
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : pathname === "/auth" ? null : (
        <div className="sign-in">
          <Link href="/auth">Sign in</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
