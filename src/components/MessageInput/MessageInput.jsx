import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "./message-input.module.css";
import { ArrowUpCircleIcon, EllipsisHorizontalCircleIcon } from "@heroicons/react/24/solid";

const ChatEditor = ({ onSubmit }) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const adjustEditorHeight = () => {
      if (editorRef.current) {
        const editorBody = editorRef.current
          .getContentAreaContainer()
          .getElementsByTagName("iframe")[0].contentDocument.body;
        const minHeight = 40;
        const maxHeight = window.innerHeight * 0.5; // 50% of the view height

        // Reset height
        editorBody.style.height = "auto";

        // Get the scroll height and apply it as the height, with constraints
        const newHeight = Math.min(
          Math.max(editorBody.scrollHeight, minHeight),
          maxHeight
        );
        editorBody.style.height = `${newHeight}px`;

        // Adjust the editor container height
        const editorContainer = editorRef.current.getElement();
        editorContainer.style.height = `${newHeight + 20}px`; // Adding some padding

        // Enable scrolling if the height exceeds max-height
        editorContainer.style.overflowY = newHeight >= maxHeight ? "auto" : "hidden";
      }
    };

    if (editorRef.current) {
      editorRef.current.on("input", adjustEditorHeight);
      editorRef.current.on("setcontent", adjustEditorHeight);
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.off("input", adjustEditorHeight);
        editorRef.current.off("setcontent", adjustEditorHeight);
      }
    };
  }, [editorRef]);

  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  const handleActionSelect = (action) => {
    setIsDropdownOpen(false);

    if (editorRef.current) {
      const editor = editorRef.current;

      switch (action) {
        case "bold":
          editor.execCommand("Bold");
          break;
        case "italic":
          editor.execCommand("Italic");
          break;
        case "underline":
          editor.execCommand("Underline");
          break;
        case "code":
          editor.execCommand("codesample");
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(content);
    }
    setContent("");
    editorRef.current.setContent(""); // Clear the editor content
  };

  return (
    <div className={styles.editorContainer}>
      <button
        className={styles.selectButton}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <EllipsisHorizontalCircleIcon width={32} height={32} />
      </button>
      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          <button onClick={() => handleActionSelect("bold")}>Bold</button>
          <button onClick={() => handleActionSelect("italic")}>Italic</button>
          <button onClick={() => handleActionSelect("underline")}>Underline</button>
          <button onClick={() => handleActionSelect("code")}>Attach Code Snippet</button>
        </div>
      )}
      <div className={styles.textarea}>
        <Editor
          apiKey={import.meta.env.VITE_APP_TINYMCE_API_KEY}
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 40,
            menubar: false,
            plugins: "codesample",
            toolbar: false,
            statusbar: false,
            inline: true,
            fixed_toolbar_container: "#toolbar-container",
            content_style: `
              .mce-content-body { padding-right: 20px; word-break: break-word; overflow-wrap: break-word; } /* Add padding inside the editor */
              .mce-content-body.mce-edit-focus { outline: none !important; box-shadow: none !important; }
              .mce-content-body:focus, .mce-content-body:focus-visible, .mce-content-body[data-mce-focus="1"] { outline: none !important; box-shadow: none !important; }
              .tox-tinymce-inline[aria-hidden="true"], .tox-throbber { visibility: hidden !important; opacity: 0 !important; display: none !important; }
              .tox-tinymce-inline .tox-editor-header, .tox-tinymce-inline .tox-editor-header--empty { display: none !important; }
              .mce-content-body { max-height: 50vh; overflow-y: auto; } /* Ensure the editor content respects the max height */
            `
          }}
          onEditorChange={handleEditorChange}
        />
      </div>
      <button onClick={handleSubmit} className={styles.submitButton}>
        <ArrowUpCircleIcon color="blue" width={32} height={32} />
      </button>
      <div id="toolbar-container" className={styles.toolbarContainer}></div>
    </div>
  );
};

export default ChatEditor;





// import React, { useState, useRef, useEffect } from "react";
// import { Editor } from "@tinymce/tinymce-react";
// import styles from "./message-input.module.css";
// import { ArrowUpCircleIcon, EllipsisHorizontalCircleIcon } from "@heroicons/react/24/solid";

// const ChatEditor = ({ onSubmit }) => {
//   const editorRef = useRef(null);
//   const [content, setContent] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   useEffect(() => {
//     const adjustEditorHeight = () => {
//       if (editorRef.current) {
//         const editorBody = editorRef.current
//           .getContentAreaContainer()
//           .getElementsByTagName("iframe")[0].contentDocument.body;
//         const minHeight = 40;
//         const maxHeight = window.innerHeight * 0.5; // 50% of the view height

//         // Reset height
//         editorBody.style.height = "auto";

//         // Get the scroll height and apply it as the height, with constraints
//         const newHeight = Math.min(
//           Math.max(editorBody.scrollHeight, minHeight),
//           maxHeight
//         );
//         editorBody.style.height = `${newHeight}px`;

//         // Adjust the editor container height
//         const editorContainer = editorRef.current.getElement();
//         editorContainer.style.height = `${newHeight + 20}px`; // Adding some padding

//         // Enable scrolling if the height exceeds max-height
//         editorContainer.style.overflowY = newHeight >= maxHeight ? "auto" : "hidden";
//       }
//     };

//     if (editorRef.current) {
//       editorRef.current.on("input", adjustEditorHeight);
//       editorRef.current.on("setcontent", adjustEditorHeight);
//     }

//     return () => {
//       if (editorRef.current) {
//         editorRef.current.off("input", adjustEditorHeight);
//         editorRef.current.off("setcontent", adjustEditorHeight);
//       }
//     };
//   }, [editorRef]);

//   const handleEditorChange = (content, editor) => {
//     setContent(content);
//   };

//   const handleActionSelect = (action) => {
//     setIsDropdownOpen(false);

//     if (editorRef.current) {
//       const editor = editorRef.current;

//       switch (action) {
//         case "bold":
//           editor.execCommand("Bold");
//           break;
//         case "italic":
//           editor.execCommand("Italic");
//           break;
//         case "underline":
//           editor.execCommand("Underline");
//           break;
//         case "code":
//           editor.execCommand("codesample");
//           break;
//         default:
//           break;
//       }
//     }
//   };

//   const handleSubmit = () => {
//     if (onSubmit) {
//       onSubmit(content);
//     }
//     setContent("");
//     editorRef.current.setContent(""); // Clear the editor content
//   };

//   return (
//     <div className={styles.editorContainer}>
//       <button
//         className={styles.selectButton}
//         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//       >
//         <EllipsisHorizontalCircleIcon width={32} height={32} />
//       </button>
//       {isDropdownOpen && (
//         <div className={styles.dropdownMenu}>
//           <button onClick={() => handleActionSelect("bold")}>Bold</button>
//           <button onClick={() => handleActionSelect("italic")}>Italic</button>
//           <button onClick={() => handleActionSelect("underline")}>Underline</button>
//           <button onClick={() => handleActionSelect("code")}>Attach Code Snippet</button>
//         </div>
//       )}
//       <div className={styles.textarea}>
//         <Editor
//           apiKey={import.meta.env.VITE_APP_TINYMCE_API_KEY}
//           onInit={(evt, editor) => (editorRef.current = editor)}
//           init={{
//             height: 40,
//             menubar: false,
//             plugins: "codesample",
//             toolbar: false,
//             statusbar: false,
//             inline: true,
//             fixed_toolbar_container: "#toolbar-container",
//             content_style: `
//               body { word-break: break-word; overflow-wrap: break-word; }
//               .mce-content-body.mce-edit-focus { outline: none !important; box-shadow: none !important; }
//               .mce-content-body:focus, .mce-content-body:focus-visible, .mce-content-body[data-mce-focus="1"] { outline: none !important; box-shadow: none !important; }
//               .tox-tinymce-inline[aria-hidden="true"], .tox-throbber { visibility: hidden !important; opacity: 0 !important; display: none !important; }
//               .tox-tinymce-inline .tox-editor-header, .tox-tinymce-inline .tox-editor-header--empty { display: none !important; }
//               .mce-content-body { max-height: 50vh; overflow-y: auto; } /* Ensure the editor content respects the max height */
//             `
//           }}
//           onEditorChange={handleEditorChange}
//         />
//       </div>
//       <button onClick={handleSubmit} className={styles.submitButton}>
//         <ArrowUpCircleIcon color="blue" width={32} height={32} />
//       </button>
//       <div id="toolbar-container" className={styles.toolbarContainer}></div>
//     </div>
//   );
// };

// export default ChatEditor;
