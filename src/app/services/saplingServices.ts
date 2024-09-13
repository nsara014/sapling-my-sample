import axios from "axios";

export interface Suggestion {
  sentence_start: number;
  start: number;
  end: number;
  replacement: string;
  sentence: string;
  type: "grammar" | "spelling";
}

// Fetch both grammar and spelling suggestions using Sapling API
export const fetchGrammarAndSpellSuggestions = async (
  text: string
): Promise<Suggestion[]> => {
  try {
    const grammarResponse = await axios.post(
      "https://api.sapling.ai/api/v1/edits",
      {
        key: "0F8L591YUYQ5H8208XYVQ3DW01P9DEZY",
        session_id: "test-session",
        text
      }
    );

    const spellResponse = await axios.post(
      "https://api.sapling.ai/api/v1/spellcheck",
      {
        key: "0F8L591YUYQ5H8208XYVQ3DW01P9DEZY",
        session_id: "test-session",
        text
      }
    );

    const grammarSuggestions: Suggestion[] = grammarResponse.data.edits.map(
      (edit: any) => ({
        sentence_start: edit.sentence_start,
        start: edit.start,
        end: edit.end,
        replacement: edit.replacement,
        sentence: text.slice(
          edit.sentence_start + edit.start,
          edit.sentence_start + edit.end
        ),
        type: "grammar" // Assign grammar type
      })
    );

    const spellSuggestions: Suggestion[] = spellResponse.data.edits.map(
      (edit: any) => ({
        sentence_start: edit.sentence_start,
        start: edit.start,
        end: edit.end,
        replacement: edit.replacement,
        sentence: text.slice(
          edit.sentence_start + edit.start,
          edit.sentence_start + edit.end
        ),
        type: "spelling" // Assign spelling type
      })
    );

    return [...grammarSuggestions, ...spellSuggestions];
  } catch (err) {
    console.error("Error fetching suggestions:", err);
    return [];
  }
};
