import React from "react";
import {
  fetchGrammarAndSpellSuggestions,
  Suggestion
} from "../services/saplingServices";

interface SuggestionPanelProps {
  suggestions: Suggestion[];
  applySingleEdit: (edit: Suggestion) => void;
  applyAllEdits: () => void;
}

const SuggestionPanel: React.FC<SuggestionPanelProps> = ({
  suggestions,
  applySingleEdit,
  applyAllEdits
}) => {
  return (
    <div className="suggestions-pane">
      <h3>Suggestions</h3>
      {suggestions.length > 0 ? (
        <>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => applySingleEdit(suggestion)}>
                <strong>Original:</strong> {suggestion.sentence} <br />
                <strong>Replacement:</strong> {suggestion.replacement}
              </li>
            ))}
          </ul>
          <div className="button-container">
            <button onClick={applyAllEdits}>Apply All Edits</button>
          </div>
        </>
      ) : (
        <p>No suggestions available</p>
      )}
      <style jsx>{`
        .suggestions-pane {
          flex: 3;
          padding: 20px;
          min-height: 300px;
          background-color: #202020;
          border: 1px solid #ccc;
          margin-right:40px;
          border-radius: 2px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }

        .suggestions-pane h3 {
          margin-top: 0;
        }

        .suggestions-pane ul {
          list-style-type: none;
          padding: 0;
        }

        .suggestions-pane ul li {
          margin-bottom: 10px;
          cursor: pointer;
          padding: 5px;
          border-bottom: 1px solid #ddd;
        }

        .suggestions-pane ul li:hover {
          background-color: #ddd;
        }
          .suggestions-pane .button-container {
  display: flex;
  justify-content: center; /* Centers the button horizontally */
  margin-top: auto; /* Pushes the button to the bottom of the container */
}

        .suggestions-pane button {
          background-color: white;
          color: black;
          padding: 10px 20px;
          text-align:center;
          border: none;
          border-radius: 4px;
          align-items:center;
          cursor: pointer;
          font-size: 16px;
        }

        .suggestions-pane button:hover {
          background-color: #666;
        }
@media (max-width: 1024px) {
          .suggestions-pane {
            min-width:100%;
            
          }
        }

        @media (max-width: 768px) {
          .suggestions-pane {
            min-width:100%
            padding: 15px;
          }
        }

        @media (max-width: 480px) {
          .suggestions-pane {
          min-width:100%;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default SuggestionPanel;
