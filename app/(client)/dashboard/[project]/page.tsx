import { getProject } from "@/sanity/sanity-utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

import "./style.scss";
import IndButton from "@/components/Dashboard/IndButton";

type Props = {
  params: {
    project: string;
  };
};

const Project = async ({ params }: Props) => {
  const slug = params.project;
  const project = await getProject(slug);
  const { userId } = auth();

  if (userId === process.env.ADMIN) {
    return (
      <section id="project">
        <div className="title">
          <h4>{project.name}</h4>
          <IndButton project={project} />
        </div>
        <div className="project-images">
          {project &&
            project.images.map((image) => (
              <div key={image._id} className="img-container">
                <Image
                  src={image.url}
                  alt={image._id}
                  fill
                  sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                />
              </div>
            ))}
        </div>
      </section>
    );
  } else {
    return <p>null</p>;
  }
};

export default Project;
