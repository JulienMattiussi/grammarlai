import React, { useRef } from "react";
import { useEditable } from "use-editable";

export const EditableComponent = ({
  text,
  handleChange,
}: {
  text: string;
  handleChange: (text: string) => void;
}) => {
  const editorRef = useRef(null);

  useEditable(editorRef, handleChange);

  return (
    <span
      dangerouslySetInnerHTML={{ __html: text }}
      spellCheck={false}
      ref={editorRef}
      style={{ minHeight: 200, border: "1px solid black" }}
    />
  );
};
