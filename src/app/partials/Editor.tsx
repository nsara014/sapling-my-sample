import React, { useEffect, useRef } from "react";
import { Suggestion } from "../services/saplingServices";
import { setCaretPosition, getCaretPosition } from "../utility/caretUtility";

interface EditorProps {
  onTextChange: (text: string) => void;
  suggestions: Suggestion[];
}

const Editor: React.FC<EditorProps> = ({ onTextChange, suggestions }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = editorRef.current;

    if (editor) {
      editor.addEventListener("input", handleInput);
    }

    return () => {
      if (editor) {
        editor.removeEventListener("input", handleInput);
      }
    };
  }, []);

  const handleInput = () => {
    const editor = editorRef.current;
    if (editor) {
      const text = editor.innerText;
      onTextChange(text);
    }
  };

  // Function to highlight words based on suggestions and preserve the cursor position
  const renderHighlightedText = () => {
    const editor = editorRef.current;
    if (editor) {
      const caretPos = getCaretPosition(editor); // Save current caret position
      const text = editor.innerText;
      const highlightedText = getHighlightedText(text, suggestions);
      editor.innerHTML = highlightedText; // Update content with highlighted text
      setCaretPosition(editor, caretPos); // Restore caret position
    }
  };

  useEffect(() => {
    renderHighlightedText();
  }, [suggestions]);

  // Function to get highlighted text with <span> tags around suggestions
  const getHighlightedText = (text: string, suggestions: Suggestion[]) => {
    let modifiedText = text;
    suggestions.forEach((suggestion) => {
      const start = suggestion.sentence_start + suggestion.start;
      const end = suggestion.sentence_start + suggestion.end;
      const originalWord = text.slice(start, end);

      // Determine the underline color based on the suggestion type
      const color = suggestion.type === "spelling" ? "red" : "blue";

      // Create the highlighted word with the appropriate underline color
      const highlightedWord = `<span style="text-decoration: underline; text-decoration-color: ${color};">${originalWord}</span>`;

      modifiedText = modifiedText.replace(originalWord, highlightedWord);
    });
    return modifiedText;
  };

  return (
    <div className="editor-wrapper">
      {/* The actual contentEditable element */}
      <div
        ref={editorRef}
        id="editor"
        contentEditable="true"
        data-placeholder="Start typing here..."
        suppressContentEditableWarning={true}
        className="editor-content"
      ></div>

      <style jsx>{`
        .editor-wrapper {
          position: relative;
          width: 100%;
          border: 1px #fff solid;
          background-color: white;
          flex: 7;
        }

        .editor-content {
          position: relative;
          width: 100%;
          min-height: 300px;
          padding: 20px;
          font-size: 18px;
          font-family: "Courier New", monospace !important;
          font-weight: normal !important;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          border-radius: 2px;
          background-color: #d3d3d3;
          color: #171717;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .editor-content::selection {
          background: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 1024px) {
          .editor-wrapper {
            margin-top: 80px;
            padding: 2px;
            width: 100%;
          }
          .editor-content {
            font-size: 16px;
            padding: 20px;
          }
        }
        @media (max-width: 768px) {
          .editor-wrapper {
            margin-top: 80px;
            padding-top: 40px;
            padding: 2px;
            width: 100%;
          }
          .editor-content {
            font-size: 16px;
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .editor-content {
            font-size: 14px;
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Editor;
