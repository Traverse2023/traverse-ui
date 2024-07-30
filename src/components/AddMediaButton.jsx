import React, { useState, useEffect, useRef } from "react";

const mediaOptions = [
  {
    name: "Code",
    image: "path/to/code-image.png", // Add the appropriate image path
    value: "code",
    function: () => console.log("code"),
  },
  {
    name: "Hyperlink",
    image: "path/to/hyperlink-image.png",
    value: "hyperlink",
    function: () => console.log("hyperlink"),
  },
  {
    name: "Photo/Video",
    image: "path/to/photo-video-image.png",
    value: "photo-video",
    function: () => console.log("photo-video"),
  },
  {
    name: "Audio",
    image: "path/to/audio-image.png",
    value: "audio",
    function: () => console.log("audio"),
  },
];

const AddMediaButton = () => {
  const [open, setOpen] = useState(false);
  const optionsRef = useRef(null);
  const buttonRef = useRef(null);

  const openOptions = (event) => {
    event.stopPropagation();
    setOpen(!open);
  };

  const selectOption = (option) => {
    if (option && typeof option.function === "function") {
      option.function();
    }
    setOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="add-media">
      <button
        onClick={openOptions}
        ref={buttonRef}
        className="add-media-button"
      >
        +
      </button>
      {open && (
        <div
          className="add-media-options"
          ref={optionsRef}
        >
          {mediaOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => selectOption(option)}
            >

              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddMediaButton;
