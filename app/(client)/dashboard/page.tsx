import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import { auth } from "@clerk/nextjs";
import React from "react";
import "./style.scss";
import NotAdmin from "@/components/notAdnim/NotAdmin";

const page = () => {
  const { userId } = auth();

  return (
    <section id="dashboard">
      {userId === process.env.ADMIN ? <AdminDashboard /> : <NotAdmin />}
    </section>
  );
};

export default page;
