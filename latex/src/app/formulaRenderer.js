import { React, useState } from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function formulaRenderer({ latex }) {
  const [backendFormula, setBackendFormula] = useState("");
  const [coincidence, setCoincidence] = useState("");

  const handleSubmit = () => {
    const payload = JSON.stringify({ formula: latex });
    console.log('отправляем на сервер:', payload);

    fetch('/api/analysis/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    })
    .then(response => response.json())
    .then(data => {
      const RawFormula = data.formula;
      const coincidenceValue = data.coincidence;

      console.log('Полученная формула:', RawFormula);
      console.log('Совпадение:', coincidenceValue);

      setBackendFormula(RawFormula);
      setCoincidence(coincidenceValue);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  
    return (
      <div>
        <MathJaxContext>
        <div>
        <h3>Рендеринг формулы:</h3>
        <MathJax className = "border rounded min-h-[300]">{`\\[ ${latex} \\]`}</MathJax>
        </div>
        <div>
        <button className = "" onClick={handleSubmit}>Проанализировать формулу</button>
        </div>
        


        <div>
        <h3>Анализ формулы:</h3>
        <div className = "border rounded min-h-[300]">        <MathJax
        >{`\\[ ${backendFormula} \\]`}</MathJax>
        </div>
        <p >
          {`Совпадение формулы : ${coincidence}`}
        </p>

        </div>
        </MathJaxContext>
      </div>
    );
  }