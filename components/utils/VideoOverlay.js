export default function VideoOverlay({
  videoSrc,
  videoTitle,
  videoDescription,
  videoImage,
  isYouTube,
  isOpen,
  setIsOpen,
}) {
  if (isYouTube) {
    return (
      <div className="video-overlay">
        <style jsx>{`
          .video-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            background-color: rgba(0, 0, 0, 0.5);
            z-index: 3;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            transition: all 0.3s ease-in-out;
            opacity: ${isOpen ? 1 : 0};
            pointer-events: ${isOpen ? "all" : "none"};
          }
          .video-overlay-video {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            transition: all 0.3s ease-in-out;
            opacity: ${isOpen ? 1 : 0};
            pointer-events: ${isOpen ? "all" : "none"};
          }

          .video-overlay > .video-overlay-video > iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .close-button {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 4;
            cursor: pointer;
            background-color: #fefefe55;
            transition: all 0.3s ease-in-out;
            opacity: ${isOpen ? 1 : 0};
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.5rem;
            pointer-events: ${isOpen ? "all" : "none"};
          }
          .close-button svg path {
            fill: var(--clr-warn);
            transition: all 0.3s ease-in-out;
          }
          .close-button:hover {
            background-color: #fefefe;
          }
        `}</style>
        <div className="video-overlay-video">
          <div className="close-button" onClick={() => setIsOpen(false)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                fill="currentColor"
              />
            </svg>
          </div>
          <iframe
            width={isYouTube ? "100%" : "100%"}
            height={isYouTube ? "100%" : "100%"}
            src="https://www.youtube.com/embed/rEOuQxf_MJM"
            title="EZTitles tutorial"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    );
  }
}
