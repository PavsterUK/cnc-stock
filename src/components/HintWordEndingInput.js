import React from "react";

const HintWordEndingInput = ({ word, stockItems }) => {
  const getHintWordEnding = () => {
    const matchingItems = stockItems.filter((item) =>
      item.title.toLowerCase().includes(word.toLowerCase())
    );
    return matchingItems
      .slice(0, 20)
      .map((item) => item.title)
      .join(", ");
  };

  return <div>{word && <p> {getHintWordEnding()}.</p>}</div>;
};

export default HintWordEndingInput;
