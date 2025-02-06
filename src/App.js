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
            <button
              style={{
                backgroundColor: "#7950f2",
                color: "#fff",
              }}
              onClick={previousStep}
            >
              Previous
            </button>
            <button
              style={{
                backgroundColor: "#7950f2",
                color: "#fff",
              }}
              onClick={nextStep}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
