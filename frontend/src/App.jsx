import { useState } from "react";
import UploadProject from "./components/UploadProject";
import AskCodebase from "./components/AskCodebase";
import ImpactAnalysis from "./components/ImpactAnalysis";






function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  
  const [question, setQuestion] = useState("");
  const [askResult, setAskResult] = useState(null);

  const [changeRequest, setChangeRequest] = useState("");
  const [impactResult, setImpactResult] = useState(null);

  const handleUpload = async () => {
  if (!selectedFile) {
    alert("Please select a ZIP file first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);

  const response = await fetch("http://127.0.0.1:8000/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  console.log(data);
  setUploadResult(data);
};

const handleAsk = async () => {
  if (!question.trim()) {
    alert("Please enter a question.");
    return;
  }

  const response = await fetch("http://127.0.0.1:8000/api/ask", {
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

  const response = await fetch("http://127.0.0.1:8000/api/impact", {
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




  return (
  <div>
    <header>
      <h1>CodeMind AI</h1>
      <p>AI-powered software engineering agent</p>
    </header>

    <main>
      <UploadProject
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        handleUpload={handleUpload}
        uploadResult={uploadResult}
      />

      <AskCodebase
        question={question}
        setQuestion={setQuestion}
        handleAsk={handleAsk}
        askResult={askResult}
      />

      <ImpactAnalysis
        changeRequest={changeRequest}
        setChangeRequest={setChangeRequest}
        handleImpact={handleImpact}
        impactResult={impactResult}
      />
    </main>
  </div>
);
}

export default App;