import React from "react";

const stockItems = [
  {
    title: "CNMG120408-WPP20S",
    location: "0",
    description: "turning insert",
    category: "turning",
  },
  {
    title: "DNMG150408-WPP20S",
    location: "0",
    description: "turning insert",
    category: "turning",
  },
  {
    title: "12MM Endmill",
    location: "0",
    description: "turning insert",
    category: "milling",
  },
  {
    title: "12MM Endmill",
    location: "0",
    description: "turning insert",
    category: "milling",
  },
  {
    title: "19MM Drill",
    location: "0",
    description: "turning insert",
    category: "hole making",
  },
  {
    title: "19MM Drill",
    location: "0",
    description: "turning insert",
    category: "hole making",
  },
];

const HintWordEndingInput = ({ word }) => {
    const getHintWordEnding = () => {
        const matchingItems = stockItems.filter((item) =>
          item.title.toLowerCase().includes(word.toLowerCase())
        );
        return matchingItems.map((item) => item.title).join(", ");
      };
    
      return (
        <div>
          {word && <p>Hint: {getHintWordEnding()}.</p>}
        </div>
      );
    };

export default HintWordEndingInput;
