import React, { createContext, useContext, useState, ReactNode } from "react";

type AccordionContextType = {
  activeIndex: number | null;
  toggle: (index: number) => void;
};

const AccordionContext = createContext<AccordionContextType | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("Phai dung ben trong Accordion");
  return ctx;
}

function Accordion({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <AccordionContext.Provider value={{ activeIndex, toggle }}>
      <div style={{ border: "1px solid #ccc", borderRadius: 8, overflow: "hidden" }}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  const { activeIndex, toggle } = useAccordion();
  const isOpen = activeIndex === index;

  return (
    <div style={{ borderBottom: "1px solid #ddd" }}>
      <div
        onClick={() => toggle(index)}
        style={{
          padding: "12px 16px",
          cursor: "pointer",
          backgroundColor: isOpen ? "#e8e8e8" : "#f5f5f5",
          fontWeight: isOpen ? "bold" : "normal",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{title}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </div>
      {isOpen && (
        <div style={{ padding: "12px 16px", backgroundColor: "#fff" }}>
          {children}
        </div>
      )}
    </div>
  );
}

Accordion.Item = AccordionItem;

export default Accordion;


function App() {
  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Accordion Demo</h2>
      <Accordion>
        <Accordion.Item index={0} title="Panel 1">
          Noi dung panel 1 ne
        </Accordion.Item>
        <Accordion.Item index={1} title="Panel 2">
          Day la panel 2
        </Accordion.Item>
        <Accordion.Item index={2} title="Panel 3">
          Panel 3 day
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export { App };
