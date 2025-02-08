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

          <StepMessage step={steps}>{messages[steps - 1]}</StepMessage>

          <div className="buttons">
            <Button
              onClick={previousStep}
              bgColor={"#7950f2"}
              textColor={"#fff"}
            >
              <span>👈</span>Previous
            </Button>
            <Button onClick={nextStep} bgColor={"#7950f2"} textColor={"#fff"}>
              Next<span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <p>
        <h3>Step {step} </h3>
        {children}
      </p>
    </div>
  );
}

function Button({ onClick, bgColor, textColor, children }) {
  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
