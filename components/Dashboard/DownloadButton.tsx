"use client";

import { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

type Image = {
  _id: string;
  url: string;
};

type Project = {
  _id: string;
  createdAt: Date;
  name: string;
  slug: string;
  images: Image[];
};

interface DownloadButtonProps {
  projects: Project[];
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ projects }) => {
  const [isDownloading, setDownloading] = useState(false);

  const downloadImage = async (imageUrl: string, imageName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return { data: blob, name: `${imageName}.jpg` };
    } catch (error) {
      console.error("Error downloading image:", error);
      return null;
    }
  };

  const handleDownload = async () => {
    setDownloading(true);

    const zip = new JSZip();

    for (const project of projects) {
      for (const image of project.images) {
        const imageUrl = image.url;
        const imageName = image._id;

        const imageData = await downloadImage(imageUrl, imageName);
        if (imageData) {
          zip.file(`${project.name}/${imageData.name}`, imageData.data, {
            binary: true,
          });
        }
      }
    }
    const blob = await zip.generateAsync({ type: "blob" });

    saveAs(blob, "auth_all_images.zip");

    setDownloading(false);
  };

  return (
    <button onClick={handleDownload} disabled={isDownloading}>
      {isDownloading ? "Downloading..." : "Download Images (ZIP)"}
    </button>
  );
};

export default DownloadButton;
