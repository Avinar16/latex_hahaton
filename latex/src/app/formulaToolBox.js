import {useState, useEffect, useRef} from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

export default function FormulaToolBox({ onInsertElement }) {
    const [customElements, setCustomElements] = useState([]);
    const [newElementLabel, setNewElementLabel] = useState("");
    const [ElementCode, setElementCode] = useState("");

    const AddCustomElement = () => {
        if (newElementLabel.trim() && ElementCode.trim()) {
            const newElement = { label: newElementLabel, code: ElementCode };
            setCustomElements([...customElements, newElement]);
            setNewElementLabel('');
            setElementCode('');
        }
    };

    const categories = [
        {
            
            label: "{Математические знаки}",
            elements: [
                { label: "\\int_{}^{}", code: "\\int_{}^{}" },
                { label: "x^{n}", code: "^{}" },
                { label: "x_{n}", code: "_{}" },
                { label: "\\sqrt{x}", code: "\\sqrt{}" },
                { label: "\\frac{a}{b}", code: "\\frac{a}{b}" },
                { label: "\\sum_{}^{}", code: "\\sum_{}^{}" },
                { label: "\\prod_{}^{}", code: "\\prod_{}^{}" },
                { label: "\\sqrt[]{}", code: "\\sqrt[]{}" },
                { label: "\\oint_{}^{}", code: "\\oint_{}^{}" },
                { label: "\\frac{d }{dx}", code: "\\frac{d }{dx}" },
                { label: "\\frac{\\partial }{\\partial x}", code: "\\frac{\\partial }{\\partial x}" },
                { label: "\\implies", code: "\\implies " },
                { label: "\\iff", code: "\\iff " },
                { label: "\\times", code: "\\times " },
                { label: "\\in", code: "\\in " },
                { label: "\\notin", code: "\\notin " },
                { label: "\\smallsetminus", code: "\\smallsetminus " },
                { label: "\\lim_{x \\to 0}", code: "\\lim_{x \\to 0} " },
                { label: "\\infty", code: "\\infty " },
                { label: "\\pm", code: "\\pm " },
                { label: "\\mp", code: "\\mp " },
                { label: "\\emptyset", code: "\\emptyset " },
                { label: "\\forall", code: "\\forall " },
                { label: "\\exists", code: "\\exists " },
                { label: "\\neq", code: "\\neq " },
                { label: "\\Delta", code: "\\Delta " },
                { label: "\\to", code: "\\to " },
                { label: "|", code: "|" },
                { label: "\\nmid", code: "\\nmid " },
                { label: "\\{  \\}", code: "\\{  \\}" },
                { label: "\\neg", code: "\\neg " },
                { label: "\\approx", code: "\\approx " },
            ],
        },
        {
            label: "{Математическая логика}",
            elements: [
                { label: "\\wedge", code: "\\wedge " },
                { label: "\\vee", code: "\\vee " },
                { label: "\\equiv", code: "\\equiv " },
                { label: "\\to", code: "\\to " },
                { label: "\\oplus", code: "\\oplus " },
                { label: "\\subset", code: "\\subset " },
                { label: "\\cup", code: "\\cup " },
                { label: "\\cap", code: "\\cap " },
                { label: "\\subseteq", code: "\\subseteq " },
                { label: "\\subsetneq", code: "\\subsetneq " },
                { label: "\\nsubseteq", code: "\\nsubseteq " },
            ],
        },
        {
            label: "{Знаки сравнения}",
            elements: [
                { label: "\\lt", code: "\\lt " },
                { label: "\\gt", code: "\\gt " },
                { label: "\\le", code: "\\le " },
                { label: "\\ge", code: "\\ge " },
                { label: "\\leqslant", code: "\\leqslant " },
                { label: "\\geqslant", code: "\\geqslant " },
                { label: "\\ll", code: "\\ll " },
                { label: "\\gg", code: "\\gg " },
                { label: "\\prec", code: "\\prec " },
                { label: "\\lesssim", code: "\\lesssim " },
                { label: "\\gtrsim", code: "\\gtrsim " },
                { label: "\\nless", code: "\\nless " },
                { label: "\\ngtr", code: "\\ngtr " },
                { label: "\\nleq", code: "\\nleq " },
                { label: "\\ngeq", code: "\\ngeq " },
                { label: "\\nleqslant", code: "\\nleqslant " },
                { label: "\\ngeqslant", code: "\\ngeqslant " },
                { label: "\\nprec", code: "\\nprec " },
                { label: "\\nsucc", code: "\\nsucc " },
            ],
        },
        {
            label: "{Разное}",
            elements: [
                { label: "\\#", code: "\\# " },
                { label: "\\equiv", code: "\\equiv " },
                { label: "\\sim", code: "\\sim " },
                { label: "\\asymp", code: "\\asymp " },
                { label: "\\simeq", code: "\\simeq " },
                { label: "\\cong", code: "\\cong " },
                { label: "\\nabla", code: "\\nabla " },
                { label: "\\div", code: "\\div " },
                { label: "\\vdash", code: "\\vdash " },
                { label: "\\models", code: "\\models " },
                { label: "\\propto", code: "\\propto " },
                { label: "\\Re", code: "\\Re " },
                { label: "\\Im", code: "\\Im " },
                { label: "\\star", code: "\\star " },
                { label: "\\ast", code: "\\ast " },
                { label: "\\circ", code: "\\circ " },
                { label: "\\bullet", code: "\\bullet " },
                { label: "\\imath", code: "\\imath " },
                { label: "\\jmath", code: "\\jmath " },
                { label: "\\oplus", code: "\\oplus " },
                { label: "\\ominus", code: "\\ominus " },
                { label: "\\otimes", code: "\\otimes " },
                { label: "\\oslash", code: "\\oslash " },
                { label: "\\cdot", code: "\\cdot " },
                { label: "\\hbar", code: "\\hbar " },
                { label: "\\cdots", code: "\\cdots " },
                { label: "\\vdots", code: "\\vdots " },
                { label: "\\ddots", code: "\\ddots " },
                { label: "\\angle", code: "\\angle " },
                { label: "\\bot", code: "\\bot " },
                { label: "\\bowtie", code: "\\bowtie " },
                { label: "\\parallel", code: "\\parallel " },
                { label: "\\not\\equiv", code: "\\not\\equiv " },
                { label: "\\nsim", code: "\\nsim " },
                { label: "\\ncong", code: "\\ncong " },
                { label: "\\nexists", code: "\\nexists " },
                { label: "\\measuredangle", code: "\\measuredangle " },
            ],
        },
        {
            label: "{Стрелки}",
            elements: [
                { label: "\\gets", code: "\\gets " },
                { label: "\\to", code: "\\to " },
                { label: "\\longleftarrow", code: "\\longleftarrow " },
                { label: "\\longrightarrow", code: "\\longrightarrow " },
                { label: "\\leftrightarrow", code: "\\leftrightarrow " },
                { label: "\\Leftarrow", code: "\\Leftarrow " },
                { label: "\\Rightarrow", code: "\\Rightarrow " },
                { label: "\\Leftrightarrow", code: "\\Leftrightarrow " },
            ],
        },
        {
            label: "{Скобки}",
            elements: [
                { label: "\\left( \\right)", code: "\\left( \\right)" },
                { label: "\\left\\lfloor \\right\\rfloor", code: "\\left\\lfloor \\right\\rfloor" },
                { label: "\\left\\{ \\right\\}", code: "\\left\\{ \\right\\}" },
                { label: "\\left\\lceil \\right\\rceil", code: "\\left\\lceil \\right\\rceil" },
                { label: "\\left| \\right|", code: "\\left| \\right|" },
                { label: "\\left[ \\right]", code: "\\left[ \\right]" },
                { label: "\\left\\| \\right\\|", code: "\\left\\| \\right\\|" },
                { label: "\\left\\langle \\right\\rangle", code: "\\left\\langle \\right\\rangle" },
            ],
        },
        {
            label: "{Прописные греческие буквы}",
            elements: [
                { label: "\\Gamma", code: "\\Gamma " },
                { label: "\\Delta", code: "\\Delta " },
                { label: "\\Theta", code: "\\Theta " },
                { label: "\\Lambda", code: "\\Lambda " },
                { label: "\\Xi", code: "\\Xi " },
                { label: "\\Pi", code: "\\Pi " },
                { label: "\\Sigma", code: "\\Sigma " },
                { label: "\\Upsilon", code: "\\Upsilon " },
                { label: "\\Phi", code: "\\Phi " },
                { label: "\\Psi", code: "\\Psi " },
                { label: "\\Omega", code: "\\Omega " },
            ],
        },
        {
            label: "{Строчные греческие буквы}",
            elements: [
                { label: "\\alpha", code: "\\alpha " },
                { label: "\\beta", code: "\\beta " },
                { label: "\\gamma", code: "\\gamma " },
                { label: "\\delta", code: "\\delta " },
                { label: "\\epsilon", code: "\\epsilon " },
                { label: "\\varepsilon", code: "\\varepsilon " },
                { label: "\\zeta", code: "\\zeta " },
                { label: "\\eta", code: "\\eta " },
                { label: "\\theta", code: "\\theta " },
                { label: "\\vartheta", code: "\\vartheta " },
                { label: "\\iota", code: "\\iota " },
                { label: "\\kappa", code: "\\kappa " },
                { label: "\\lambda", code: "\\lambda " },
                { label: "\\mu", code: "\\mu " },
                { label: "\\nu", code: "\\nu " },
                { label: "\\xi", code: "\\xi " },
                { label: "\\pi", code: "\\pi " },
                { label: "\\varpi", code: "\\varpi " },
                { label: "\\rho", code: "\\rho " },
                { label: "\\varrho", code: "\\varrho " },
                { label: "\\sigma", code: "\\sigma " },
                { label: "\\varsigma", code: "\\varsigma " },
                { label: "\\tau", code: "\\tau " },
                { label: "\\upsilon", code: "\\upsilon " },
                { label: "\\phi", code: "\\phi " },
                { label: "\\varphi", code: "\\varphi " },
                { label: "\\chi", code: "\\chi " },
                { label: "\\psi", code: "\\psi " },
                { label: "\\omega", code: "\\omega " },
            ],
        },
        {
            label: "{Кастомные элементы}",
            elements: customElements,
        },
    ];

    const [activeCategory, setActiveCategory] = useState(null);

    const handleInsertElement = (insertText) => {
        const textArea = document.querySelector("textarea");
        const updatedLatex = insertAtCursor(textArea, insertText);
        setLocalLatex(updatedLatex);
        onFormulaChange(updatedLatex);
    };

    return (
        <MathJaxContext>
            <aside className="p-2 m-4 bg-transparent rounded font-mono">
                <h3 className="text-lg">Математические элементы</h3>
                <ul className="mt-4 space-y-2">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <button
                                className="w-full px-3 text-lg text-left text-black bg-[#DBDCD0] rounded hover:bg-[#AEAF9C] font-mono"
                                onClick={() =>
                                    setActiveCategory(
                                        activeCategory === index ? null : index
                                    )
                                }
                            >
                                <MathJax>{`${category.label}`}</MathJax>
                            </button>
                            {activeCategory === index && (
                                <ul className="my-2 space-y-1 grid grid-cols-3 gap-1 text-center">
                                    {category.elements.map((element, idx) => (
                                        <li key={idx}>
                                            <button
                                                className="px-2 py-1 bg-transparent rounded hover:bg-gray-800"
                                                onClick={() =>
                                                    onInsertElement(element.code)
                                                }
                                            >
                                                <MathJax>{`$$${element.label}$$`}</MathJax>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="mt-4 p-4 bg-transparent rounded">
                    <h4 className="text-md mb-2">Добавить кастомный элемент</h4>
                    <div className="flex flex-col gap-2 text-black">
                        <input
                            type="text"
                            placeholder="Метка"
                            className="p-2 border rounded"
                            value={newElementLabel}
                            onChange={(e) => setNewElementLabel(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Код LaTeX"
                            className="p-2 border rounded text-s text-black"
                            value={ElementCode}
                            onChange={(e) => setElementCode(e.target.value)}
                        />
                        <button
                            className="py-2 bg-[#DBDCD0]  hover:bg-[#AEAF9C] rounded  text-black"
                            onClick={AddCustomElement}
                        >
                            Добавить
                        </button>
                    </div>
                </div>
            </aside>
        </MathJaxContext>
    );
}
