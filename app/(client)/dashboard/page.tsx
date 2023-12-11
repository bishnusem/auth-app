import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import { auth } from "@clerk/nextjs";
import React from "react";
import "./style.scss";

const page = () => {
  const { userId } = auth();

  return (
    <section id="dashboard">
      {userId === process.env.ADMIN ? <AdminDashboard /> : <>Not Admin</>}
    </section>
  );
};

export default page;
