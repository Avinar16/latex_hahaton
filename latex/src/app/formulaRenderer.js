import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function formulaRenderer({latex}) {
    
  
    return (
        <MathJaxContext>
<div>
        <h3>Рендеринг формулы:</h3>
        <MathJax >{`$$${latex}$$`}</MathJax>
        <div>
          <button onClick={() => alert(latex)}>Сохранить формулу</button>
        </div>
        </div>
        </MathJaxContext>
        
    );
  }