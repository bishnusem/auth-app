"use client";

import { getProjects } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const AdminDashboard = () => {
  const [projectData, setProjectData] = useState<Project[]>();

  useEffect(() => {
    const fetchProject = async () => {
      const projects = await getProjects();
      setProjectData(projects);
    };
    fetchProject();
  }, []);

  return (
    <section id="adminDashboard">
      <div className="all">
        {projectData?.map((project) => (
          <Link key={project._id} href={`/dashboard/${project.slug}`}>
            <h4>{project.name}</h4>
          </Link>
        ))}
      </div>
      <>
        {projectData &&
          projectData.map((project) => (
            <div key={project._id} className="projects">
              <div className="project-images">
                {project.images.map((image) => (
                  <div key={image._id} className="img-container">
                    <img
                      src={image.url}
                      alt={image._id}
                      loading="lazy"
                      sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </>
    </section>
  );
};

export default AdminDashboard;
