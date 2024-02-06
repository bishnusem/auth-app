import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";
import { visionTool } from "@sanity/vision";

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: "production",
  title: "auth xxx",
  apiVersion: "2023-12-10",

  basePath: "/studio",

  plugins: [deskTool(), visionTool()],
  schema: { types: schemas },
  useCdn: false,
});

export default config;
