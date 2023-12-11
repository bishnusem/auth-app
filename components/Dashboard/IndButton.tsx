"use client";

import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

type Image = {
  _id: string;
  url: string;
};

type Project = {
  name: string;
  images: Image[];
};

interface IndButtonProps {
  project: Project;
}

const IndButton: React.FC<IndButtonProps> = ({ project }) => {
  const handleDownload = async () => {
    const zip = new JSZip();

    await Promise.all(
      project.images.map(async (image) => {
        const imageUrl = image.url;
        const imageName = image._id;

        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();

          const contentType = response.headers.get("content-type");
          const fileExtension = contentType ? contentType.split("/")[1] : "jpg";

          const filename = `${project.name}/${imageName}.${fileExtension}`;

          zip.file(filename, blob, { binary: true });
        } catch (error) {
          console.error("Error downloading image:", error);
        }
      })
    );

    const blob = await zip.generateAsync({ type: "blob" });

    saveAs(blob, `auth_${project.name}.zip`);
  };

  return (
    <button onClick={handleDownload}>Download {project.name} (ZIP)</button>
  );
};

export default IndButton;
