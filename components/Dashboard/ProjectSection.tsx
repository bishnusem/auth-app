"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import IndButton from "@/components/Dashboard/IndButton";
import { getProject } from "@/sanity/sanity-utils";

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

type Props = {
  params: {
    project: string;
  };
};

const ProjectSection = ({ params }: Props) => {
  const [projectData, setProjectData] = useState<Project>();
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchproject = async () => {
      const project = await getProject(params.project);
      setProjectData(project);
      setTotalImages(project.images.length);
      setIsLoading(false);
    };
    fetchproject();
  }, [params.project]);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  const loadingPercentage = totalImages
    ? Math.round((imagesLoaded / totalImages) * 100)
    : 0;

  return (
    <section id="project">
      <div className="title">
        <h4>{projectData?.name}</h4>
        {projectData && <IndButton project={projectData} />}
      </div>
      {isLoading && (
        <div className="loading">
          <p>{loadingPercentage}%</p>
        </div>
      )}

      <div className="project-images">
        {projectData &&
          projectData.images.map((image) => (
            <div key={image._id} className="img-container">
              <img
                src={image.url}
                alt={image._id}
                loading="lazy"
                sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                onLoad={handleImageLoad}
              />
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProjectSection;
