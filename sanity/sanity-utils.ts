import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";

type Project = {
  _id: string;
  createdAt: Date;
  name: string;
  slug: string;
  images: [
    image: {
      _id: string;
      url: string;
    }
  ];
};

export async function getProjects(): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project"]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "images": images[] {
        "_id": asset->_id,
        "url": asset->url,
      },
      url,
      content
    }`
  );
}

export async function getProject(slug: string): Promise<Project> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "images": images[] {
        "_id": asset->_id,
        "url": asset->url,
      },
      url,
      content
    }`,
    { slug }
  );
}
