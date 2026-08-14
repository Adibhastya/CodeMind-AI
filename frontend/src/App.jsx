import { useState } from "react";






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
        <section>
          <h2>Upload Project</h2>
          <p>Upload a ZIP file of your codebase.</p>

          <input 
          type="file"
           accept=".zip"
           onChange={(e) => setSelectedFile(e.target.files[0])}
           />
          <button onClick={handleUpload}>Upload</button>

          {uploadResult && (
            <div>
              <h3>{uploadResult.message}</h3>
              <p>Total files: {uploadResult.total_files}</p>
            </div>
          )}
        </section>

        <section>
          <h2>Ask Codebase</h2>
          <p>Ask questions about your uploaded project.</p>

          <input
            type="text"
            placeholder="Ask something about the codebase..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button onClick={handleAsk}>Ask CodeMind</button>

          {askResult && (
            <div>
              <h3>Answer:</h3>
              <p>{askResult.answer}</p>

              <h4>Sources</h4>

              
              {askResult.sources?.map((source, index) => (
                <p key={index}>
                  {source.file_name} — Lines {source.start_line}-{source.end_line}
                </p>
              ))} 
            </div>
          )}
        </section>

        <section>
          <h2>Impact Analysis</h2>
          <p>Analyze the impact of a proposed code change.</p>

           <textarea
            placeholder="Describe the change you want to make..."
            value={changeRequest}
            onChange={(e) => setChangeRequest(e.target.value)}
            rows="5"
          />
          <button onClick={handleImpact}>Analyze Impact</button>

          {impactResult && (
            <div>
              <h3>Impact Analysis Result</h3>
              <p>{impactResult.analysis}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;