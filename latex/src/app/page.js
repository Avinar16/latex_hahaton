"use client";
import { useState, useRef } from "react";
import FormulaEditor from './formulaEditor';
import FormulaRenderer from './formulaRenderer';
import FormulaToolBox from "./formulaToolBox";
import Image from 'next/image';
export default function Home() {


  const [latex, setLatex] = useState("");
  const editorRef = useRef(null);

  const handleFormulaChange = (newLatex) => {
    setLatex(newLatex);
  };
  const insertElementToEditor = (element) => {
      if (editorRef.current) {
        editorRef.current.insertAtCursor(element);
      }
  };


  const handleSetInsertFuction = (insertFunction) => {
    setInsertFuction(() => insertFunction);
  }


  return (
    <div className = "min-h-screen flex-row grid pb-4">
    <div className=" flex flex-col">
  
  <div className="flex flex-1  font-[family-name:var(--font-geist-mono)]">
    {/* сайд */}
    <FormulaToolBox onInsertElement={insertElementToEditor} />
      
    
   
    <main className="flex-1 p-4 grid grid-cols-2 gap-4">
      {/* Редактор Формул */}
      <section className="p-4 rounded font-[family-name:var(--font-geist-mono)]">
        
        <FormulaEditor 
        onFormulaChange={handleFormulaChange} 
        ref = {editorRef} 
        latex={latex}/>
        
      </section>
      
      {/* Анализ Формул */}
      <section className=" p-4 font-[family-name:var(--font-geist-mono)] col-span-1">
        Анализ Формул
        <div className = "border rounded p-4">
        <FormulaRenderer latex={latex} />
        </div>  
      </section>
    </main>
  </div>
  <footer className=" gap-6 items-end justify-center flex">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Документация
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Примеры
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Github →
        </a>
      </footer>
</div>

      
    </div>
  
  );
}