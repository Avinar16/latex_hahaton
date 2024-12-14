"use client";

import { useState, useEffect, useRef, useImperativeHandle, forwardRef} from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const FormulaEditor = forwardRef(({ latex, onFormulaChange, onInsert }, ref) => {
  const [localLatex, setLocalLatex] = useState(latex);
  const textAreaRef = useRef(null);

  useEffect(() => {
    setLocalLatex(latex);
  },[latex]);

  const handleInputChange = (event) => {
    const newLatex = event.target.value;
    setLocalLatex(newLatex);
    onFormulaChange(newLatex);
  };

  const insertAtCursor = (insertText) => {
    const textarea = textAreaRef.current;
    if (!textarea)  return;

    const cursorStart = textarea.selectionStart;
    const cursorEnd = textarea.selectionEnd;
    const currentValue = textarea.value;

    const beforeCursor = currentValue.substring(0, cursorStart);
    const afterCursor = currentValue.substring(cursorEnd);

    const updatedValue =`${beforeCursor}${insertText}${afterCursor}`;

    setLocalLatex(updatedValue);
    onFormulaChange(updatedValue);
    textarea.focus();
    textarea.setSelectionRange(
        cursorStart + insertText.length,
        cursorEnd + insertText.length
    );
  };

  useImperativeHandle(ref, () => ({
    insertAtCursor,
  }));

  return (
    <MathJaxContext>
      <div className="h-full w-full">
        <h2>Редактор формул</h2>
        <textarea
          className="w-full h-full p-4 bg-transparent border border-gray-300 rounded resize-none focus:outline-none"
          value={localLatex}
          ref = {textAreaRef}
          onChange={handleInputChange}
          placeholder="Введите формулу LaTeX"
          style={{
            fontFamily: "monospace",
          }}
        />
      </div>
    </MathJaxContext>
  );
});

export default FormulaEditor;