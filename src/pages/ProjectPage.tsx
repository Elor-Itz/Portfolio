import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projects from "../data/projectsData";
import ImageViewer from "../components/ImageViewer";

const ProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const project = projects.find(
    (proj) => proj.name.toLowerCase().replace(/\s+/g, "-") === projectId
  );

  const [showImageViewer, setShowImageViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle the next image in the carousel
  const handleNextImage = useCallback(() => {
    if (project) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === project.screenshots.length - 1 ? 0 : prevIndex + 1
      );
    }
  }, [project]);

  // Handle the previous image in the carousel
  const handlePrevImage = useCallback(() => {
    if (project) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? project.screenshots.length - 1 : prevIndex - 1
      );
    }
  }, [project]);

  // Handle keyboard navigation for next and previous images
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevImage();
      } else if (event.key === "ArrowRight") {
        handleNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNextImage, handlePrevImage]);

  // Handle touch start event to detect swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // Handle touch end event to detect swipe gestures
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX !== null) {
      const touchEnd = e.changedTouches[0].clientX;
      const swipeDistance = touchStartX - touchEnd;

      if (swipeDistance > 50) {
        handleNextImage();
      } else if (swipeDistance < -50) {
        handlePrevImage();
      }
    }
    setTouchStartX(null);
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-semibold">Project not found</div>
      </div>
    );
  }

  // Open the image viewer when clicking on a screenshot
  const handleOpenImageViewer = (index: number) => {
    setCurrentImageIndex(index);
    setShowImageViewer(true);
  };

  // Close the image viewer when clicking outside of it
  const handleCloseImageViewer = () => {
    setShowImageViewer(false);
  };

  return (
    <div
      className="project-page"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Back to Projects Button */}
      <button
        onClick={() => navigate("/projects")}
        className="mb-8 text-black text-lg font-semibold rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
      >
        ← Back to Projects
      </button>

      {/* Project Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-6">
          <img
            src={project.image}
            alt={project.name}
            className="rounded-lg w-20 h-20 object-contain"
          />
          <h1 className="text-4xl font-bold">{project.name}</h1>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {/* Screenshots Carousel */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mb-12 relative">
            {/* Current Screenshot */}
            <div className="flex items-center justify-center">
              <img
                src={project.screenshots[currentImageIndex]}
                alt={`Screenshot ${currentImageIndex + 1}`}
                className="rounded-lg object-contain w-full max-h-[500px] cursor-pointer"
                onClick={() => handleOpenImageViewer(currentImageIndex)}
              />
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black bg-gray-800 hover:bg-gray-900 rounded-full p-8 text-6xl focus:outline-none"
            >
              ‹
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black bg-gray-800 hover:bg-gray-900 rounded-full p-8 text-6xl focus:outline-none"
            >
              ›
            </button>

            {/* Indicators */}
            <div className="carousel-indicators">
              {project.screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`carousel-indicator ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                ></button>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <h2 className="text-3xl font-semibold mb-6">Description</h2>
        <p className="text-xl text-gray-700 mb-6">{project.description}</p>

        {/* Tech Stack */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* My Involvement */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">My Involvement</h2>
          <ul className="list-disc list-inside text-xl text-gray-700">
            {(project.involvement ?? []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Links</h2>
          <ul className="list-disc list-inside text-xl text-gray-700">
            {Array.isArray(project.links)
              ? project.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-500 hover:text-teal-700"
                    >
                      {link.label}
                    </a>
                  </li>
                ))
              : project.links && (
                  <li>
                    <a
                      href={project.links.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-500 hover:text-teal-700"
                    >
                      {project.links.label}
                    </a>
                  </li>
                )}
          </ul>
        </div>
      </div>

      {/* Image Viewer Modal */}
      {project.screenshots && (
        <ImageViewer
          show={showImageViewer}
          images={project.screenshots}
          currentIndex={currentImageIndex}
          onClose={handleCloseImageViewer}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
        />
      )}
    </div>
  );
};

export default ProjectPage;
