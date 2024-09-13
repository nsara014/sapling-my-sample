"use client";
import React, { useState, useEffect } from "react";

const Title: React.FC = () => {
  const fullText = "Sapling My Sample"; // The complete title
  const [displayedText, setDisplayedText] = useState(""); // State to control the displayed text

  useEffect(() => {
    let index = 0;
    const typeWriter = () => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(timer); // Clear the interval when typing is done
      }
    };

    const timer = setInterval(typeWriter, 150); // Adjust typing speed (150ms per character)

    // Cleanup function to clear the interval
    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <div className="title-container">
      <h1 className="title-text">{displayedText}</h1>
      <style jsx>{`
        .title-container {
          display: flex;
          padding-top: 40px;
          justify-content: center;
          align-items: center;
          margin-bottom: 40px;
        }

        .title-text {
          font-family: "MomsTypewriter", serif;
          font-size: 3rem;

          font-weight: bold;
          color: white;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-decoration: underline;
          background-color: black;
          padding: 10px 20px; /* Add space inside the box */
          display: inline-block; /* Ensure the background only wraps around the text */
          border-radius: 5px; /* Optional: makes the box corners slightly rounded */
        }
      `}</style>
    </div>
  );
};

export default Title;
