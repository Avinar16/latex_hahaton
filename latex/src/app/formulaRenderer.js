import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function formulaRenderer({latex}) {

  const handleSubmit = () => {

    const payload = JSON.stringify({ formula: latex });
    console.log('это отправляем на сервер:', payload);
    fetch('/api/analysis/', {
     method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload, 
      
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
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
        <MathJax className = "border rounded min-h-[400]">{`\\[ ${latex} \\]`}</MathJax>
        </div>
        <div>
        <button className = "" onClick={handleSubmit}>Сохранить формулу</button>
        </div>
        </MathJaxContext>


      <MathJaxContext>
        
      </MathJaxContext>
      </div>
    );
  }