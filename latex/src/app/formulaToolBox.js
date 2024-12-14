import {useState, useEffect, useRef} from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

export default function FormulaToolBox({ onInsertElement }) {
    const categories = [
        {
            label: "\\text{Математические знаки}",
            elements: [
                { label: "\\wedge", code: "\\wedge" },
                { label: "\\#", code: "\\#" },
                { label: "\\int_{a}^{b}", code: "\\int_{a}^{b}" },
                
            ],
        },
        {
            label: "\\text{Дроби}",
            elements: [
                { label: "\\frac{a}{b}", code: "\\frac{a}{b}" },
                
            ],
        },
        //Другие категории
    ];

    const [activeCategory, setActiveCategory] = useState(null);
    const handleInsertElement = (insertText) => {
        const textArea = document.querySelector("textarea");

        const updatedLatex = insertAtCursor(textArea, insertText);

        setLocalLatex(updatedLatex);
        onFormulaChange(updatedLatex);        

    }
    return (
        <MathJaxContext>
        <aside className="w-64 m-4 bg-transparent p-4 rounded">
            <h3 className="text-lg">Математические элементы</h3>
            <ul className="mt-4 space-y-2">
                {categories.map((category, index) => (
                    <li key={index}>
                        <button
                            className="w-full px-3 py-2 text-left text-white bg-gray-700 rounded hover:bg-slate-400"
                            onClick={() =>
                                setActiveCategory(
                                    activeCategory === index ? null : index
                                )
                            }
                        >
                            <MathJax>{category.label}</MathJax>
                        </button>
                        {activeCategory === index && (
                            <ul className="my-2 space-y-1">
                                {category.elements.map((element, idx) => (
                                    <li key={idx}>
                                        <button
                                            className="w-full px-3 py-1 text-left text-white bg-gray-600 rounded hover:bg-slate-500"
                                            onClick={() =>
                                                onInsertElement(element.code)
                                            }
                                        >
                                            <MathJax> {`$$${element.label}$$`} </MathJax>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
        </MathJaxContext>
    );
}