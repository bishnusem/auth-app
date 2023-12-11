"use client";

import Link from "next/link";
import "./style.scss";
import { UserButton, useUser } from "@clerk/nextjs";
const adminId = process.env.ADMIN;

const Header = () => {
  const { user, isLoaded } = useUser();

  return (
    <header>
      <Link href="/">Auth</Link>
      {isLoaded && user && (
        <div className="account">
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </header>
  );
};

export default Header;
