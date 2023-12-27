import { getProjects } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";

const AdminDashboard = async () => {
  const projects = await getProjects();

  return (
    <section id="adminDashboard">
      <div className="all">
        {projects.map((project) => (
          <Link key={project._id} href={`/dashboard/${project.slug}`}>
            <h4>{project.name}</h4>
          </Link>
        ))}
      </div>
      <>
        {projects.map((project) => (
          <div key={project._id} className="projects">
            <div className="project-images">
              {project.images.map((image) => (
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
          </div>
        ))}
      </>
    </section>
  );
};

export default AdminDashboard;
