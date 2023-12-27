"use client";

import Link from "next/link";
import "./style.scss";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";

const Header = () => {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useLayoutEffect(() => {
    let prevScrollPos = window.scrollY || document.documentElement.scrollTop;
    const handleScroll = () => {
      const currentScrollPos =
        window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(currentScrollPos > 0 && currentScrollPos > prevScrollPos);

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled ? "scrollDown" : ""}`}>
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
