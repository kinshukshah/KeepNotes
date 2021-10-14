import React from "react";

export const ColorOption = ({ setNoteData, noteData }) => {
  const colorArr = ["white", "#fbbc04", "#f28b82"];
  const handleColorOption = (bgColor) => {
    setNoteData((data) => ({ ...data, color: bgColor }));
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "70px",
      }}
    >
      {colorArr.map((ele, index) => {
        return (
          <div
            key={index}
            style={{
              borderRadius: "50%",
              backgroundColor: ele,
              height: "20px",
              width: "20px",
              border: noteData.color === ele ? "2px solid #dddbdb" : "",
            }}
            onClick={() => handleColorOption(ele)}
          />
        );
      })}
    </div>
  );
};
