import React from "react";

interface ProjectCardProps {
  name: string;
  description: string;
  languages: string[];
  image: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, languages, image, link }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden">
      {/* Project Image */}
      <div className="w-full md:w-1/4 p-8">
        <img
          src={image}
          alt={name}
          className="rounded-lg object-cover w-full h-full"
        />
      </div>

      {/* Project Details */}
      <div className="p-6 flex flex-col justify-between w-full">
        <div>
          <h2 className="text-4xl font-semibold mb-4">{name}</h2>
          <p className="text-xl text-gray-700 mb-4">{description}</p>
          <p className="text-lg text-gray-500">
            <strong>Languages/Technologies:</strong> {languages.join(", ")}
          </p>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-teal-500 hover:text-teal-700 font-semibold text-xl"
        >
          View on GitHub →
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;