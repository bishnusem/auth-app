import ProjectSection from "@/components/Dashboard/ProjectSection";
import { auth } from "@clerk/nextjs";
import "./style.scss";

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

const Project = ({ params }: Props) => {
  const { userId } = auth();

  if (userId === process.env.ADMIN) {
    return <ProjectSection params={params} />;
  } else {
    return <p>null</p>;
  }
};

export default Project;
