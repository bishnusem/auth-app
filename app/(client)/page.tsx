import Hero from "@/components/home/Hero";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId === process.env.ADMIN) {
    redirect("/dashboard");
  } else if (userId) return <Hero />;
}
