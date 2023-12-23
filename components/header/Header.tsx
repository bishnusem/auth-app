"use client";

import Link from "next/link";
import "./style.scss";
import { UserButton, useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";

const Header = () => {
  const { user, isLoaded } = useUser();

  return (
    <header>
      <Link href="/">Auth</Link>
      {isLoaded && user ? (
        <div className="account">
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <div className="sign-in">
          <SignInButton />
        </div>
      )}
    </header>
  );
};

export default Header;
