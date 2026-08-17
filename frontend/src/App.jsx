import { useState } from "react";
import "./App.css";
import API_BASE_URL from "./config.js";

import UploadProject from "./components/UploadProject/uploadproject.jsx";
import AskCodebase from "./components/AskCodebase/askcodebase.jsx";
import ImpactAnalysis from "./components/ImpactAnalysis/impactanalysis.jsx";
import SplashScreen from "./components/SplashScreen/splashscreen.jsx";
import useSplashScreen from "./components/SplashScreen/splashscreen.js";
import Chatbot from "./components/ChatBot/chatbot.jsx";

function App() {
  const { showSplash } = useSplashScreen();

  const [showAbout, setShowAbout] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const [question, setQuestion] = useState("");
  const [askResult, setAskResult] = useState(null);

  const [changeRequest, setChangeRequest] = useState("");
  const [impactResult, setImpactResult] = useState(null);

  const handleAsk = async () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    const response = await fetch(`${API_BASE_URL}/api/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
      }),
    });

    const data = await response.json();

    setAskResult(data);
  };

  const handleImpact = async () => {
    if (!changeRequest.trim()) {
      alert("Please describe the proposed change.");
      return;
    }

    const response = await fetch(`${API_BASE_URL}/api/impact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        change_request: changeRequest,
      }),
    });

    const data = await response.json();

    setImpactResult(data);
  };

  const handleResetWorkspace = () => {
    setQuestion("");
    setAskResult(null);

    setChangeRequest("");
    setImpactResult(null);

    setResetKey((previousKey) => previousKey + 1);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-block">
          <div className="brand-logo">
            <img
              src="/CodeMind_logo.png"
              alt="CodeMind Logo"
            />
          </div>

          <div>
            <h1 className="app-title">
              CodeMind AI
            </h1>

            <p className="app-subtitle">
              AI-powered software engineering agent
            </p>
          </div>
        </div>

        <nav className="app-nav">
          <span className="nav-item active">
            Dashboard
          </span>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="about-button"
            onClick={() => setShowAbout(true)}
          >
            About Us
          </button>

          <button
            type="button"
            className="reset-workspace-button"
            onClick={handleResetWorkspace}
          >
            ↻ Reset
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <UploadProject key={resetKey} />
          </div>

          <div className="dashboard-card">
            <AskCodebase
              question={question}
              setQuestion={setQuestion}
              handleAsk={handleAsk}
              askResult={askResult}
            />
          </div>

          <div className="dashboard-card">
            <ImpactAnalysis
              changeRequest={changeRequest}
              setChangeRequest={setChangeRequest}
              handleImpact={handleImpact}
              impactResult={impactResult}
            />
          </div>
        </div>

        <section className="getting-started">
          <div className="getting-started-heading">
            <h3>Getting Started</h3>

            <p>
              Follow these simple steps to analyze your codebase.
            </p>
          </div>

          <div className="getting-started-steps">
            <div className="getting-step">
              <span className="step-number">
                1
              </span>

              <div>
                <h4>Upload your project</h4>
                <p>Upload a ZIP file of your codebase</p>
              </div>
            </div>

            <div className="getting-step">
              <span className="step-number">
                2
              </span>

              <div>
                <h4>Ask questions</h4>
                <p>Get insights about your code</p>
              </div>
            </div>

            <div className="getting-step">
              <span className="step-number">
                3
              </span>

              <div>
                <h4>Analyze impact</h4>
                <p>Understand changes and risks</p>
              </div>
            </div>

            <div className="getting-step">
              <span className="step-number">
                4
              </span>

              <div>
                <h4>Take action</h4>
                <p>Make informed decisions</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showAbout && (
        <div className="about-overlay">
          <div className="about-modal">
            <button
              type="button"
              className="about-close-button"
              onClick={() => setShowAbout(false)}
              aria-label="Close About CodeMind AI"
            >
              ✕
            </button>

            <h2>About CodeMind AI</h2>

            <p className="about-description">
              CodeMind AI is an AI-powered software engineering assistant
              designed to help developers understand and analyze codebases.
            </p>

            <div className="about-feature">
              <h3>Upload Project</h3>
              <p>
                Upload a ZIP file of your source code and CodeMind AI
                analyzes and indexes the project.
              </p>
            </div>

            <div className="about-feature">
              <h3>Ask Codebase</h3>
              <p>
                Ask questions about the uploaded project and get answers
                based on relevant source code.
              </p>
            </div>

            <div className="about-feature">
              <h3>Impact Analysis</h3>
              <p>
                Understand which files, risks and tests may be affected
                before making a code change.
              </p>
            </div>

            <div className="about-feature">
              <h3>AskMe Coding Assistant</h3>
              <p>
                Get help with programming concepts, frameworks, tools,
                debugging and software development questions.
              </p>
            </div>
          </div>
        </div>
      )}

      <Chatbot />
    </div>
  );
}

export default App;