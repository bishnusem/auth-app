import { SignOutButton } from "@clerk/nextjs";
import "./style.scss";
import Link from "next/link";

const NotAdmin = () => {
  return (
    <section id="notAdmin">
      <h3>You ar not an Admin</h3>
      <p>Please Sign Out</p>
      <Link href="/">
        <SignOutButton />
      </Link>
    </section>
  );
};

export default NotAdmin;
