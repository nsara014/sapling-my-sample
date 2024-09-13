"use client";
import React, { useState, useCallback } from "react";
import Editor from "../app/partials/Editor";
import SuggestionPanel from "../app/partials/SuggestionsPanel";
import {
  fetchGrammarAndSpellSuggestions,
  Suggestion
} from "../app/services/saplingServices";
import { debounce } from "../app/utility/debounce"; // Debounce utility

const Hero = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [userStoppedTyping, setUserStoppedTyping] = useState<boolean>(false);

  // Debounced function to fetch suggestions from API
  const handleFetchSuggestions = useCallback(
    debounce(async (text: string) => {
      const fetchedSuggestions = await fetchGrammarAndSpellSuggestions(text);
      setSuggestions(fetchedSuggestions);
    }, 500), // Debounce for 500ms
    []
  );

  // Function to handle when text is changed in the editor
  const handleEditorChange = (text: string) => {
    handleFetchSuggestions(text);
    setUserStoppedTyping(false);
  };

  // Function to apply edits to the text
  const applyEditsToText = (text: string, edits: Suggestion[]): string => {
    text = text.slice();
    const reversedEdits = edits.sort(
      (a, b) => b.sentence_start + b.start - (a.sentence_start + a.start)
    );

    for (const edit of reversedEdits) {
      const start = edit.sentence_start + edit.start;
      const end = edit.sentence_start + edit.end;

      if (start >= 0 && end <= text.length) {
        text = text.slice(0, start) + edit.replacement + text.slice(end);
      }
    }

    return text;
  };

  // Function to apply a single edit
  const applySingleEdit = (edit: Suggestion) => {
    const editorElement = document.getElementById("editor");

    if (editorElement) {
      const currentText = editorElement.innerText;
      const updatedText = applyEditsToText(currentText, [edit]);
      editorElement.innerText = updatedText;

      // Fetch new suggestions for the updated text
      handleFetchSuggestions(updatedText);
    }
  };

  // Function to apply all edits at once
  const applyAllEdits = () => {
    const editorElement = document.getElementById("editor");

    if (editorElement) {
      const currentText = editorElement.innerText;
      const updatedText = applyEditsToText(currentText, suggestions);
      editorElement.innerText = updatedText;

      // Fetch new suggestions for the updated text
      handleFetchSuggestions(updatedText);
    }
  };

  return (
    <div className="container">
      <Editor onTextChange={handleEditorChange} suggestions={suggestions} />
      <SuggestionPanel
        suggestions={suggestions}
        applySingleEdit={applySingleEdit}
        applyAllEdits={applyAllEdits}
      />
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: row;
          height: 100vh;
          padding: 60px;
          margin: 20px;
          font-family: "Courier New", monospace !important; /* Force Courier New */
          width: 100%;
          gap: 80px; /* Space between panes */
        }

        @media (max-width: 1024px) {
          .container {
            flex-direction: column;
            padding: 25px;
            padding-right: 70px;
          }
        }
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
            padding: 25px;
            padding-right: 70px;
          }
        }
        @media (max-width: 480px) {
          .container {
            flex-direction: column;
            padding: 25px;
            padding-right: 70px;
          }
        }

        .highlight {
          background-color: yellow;
        }
      `}</style>
    </div>
  );
};

export default Hero;
