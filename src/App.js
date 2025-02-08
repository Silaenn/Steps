import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <Steps />
    </div>
  );
}

function Steps() {
  const [steps, setSteps] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const nextStep = () => {
    if (steps < 3) setSteps((s) => s + 1);
  };

  const previousStep = () => {
    if (steps > 1) setSteps((s) => s - 1);
  };
  return (
    <div>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={steps >= 1 ? "active" : ""}>1</div>
            <div className={steps >= 2 ? "active" : ""}>2</div>
            <div className={steps >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {steps}: {messages[steps - 1]}
          </p>

          <div className="buttons">
            <Button
              onClick={previousStep}
              text={"Previous"}
              bgColor={"#7950f2"}
              textColor={"#fff"}
              emoji="👈"
            />
            <Button
              onClick={nextStep}
              text={"Next"}
              bgColor={"#7950f2"}
              textColor={"#fff"}
              emoji="👉"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Button({ text, onClick, bgColor, textColor, emoji }) {
  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      onClick={onClick}
    >
      <span>{emoji}</span> {text}
    </button>
  );
}
