import "./askcodebase.css";

function AskCodebase({
  question,
  setQuestion,
  handleAsk,
  askResult,
}) {
  return (
    <section className="ask-card">
      <div className="ask-header">
        <div className="ask-icon">✦</div>

        <div>
          <h2>Ask Codebase</h2>
          <p>Ask questions about your uploaded project.</p>
        </div>
      </div>

      <div className="ask-input-area">
        <input
          type="text"
          placeholder="Ask something about the codebase..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          type="button"
          onClick={handleAsk}
        >
          Ask CodeMind
        </button>
      </div>

      <div className="ask-divider"></div>

      <div className="ask-result-section">
        <h3>Recent Answer</h3>

        {askResult ? (
          <div className="ask-result">

            <div className="ask-answer">
              {askResult.answer
                .split("\n")
                .map((line, index) => {
                  const trimmedLine = line.trim();

                  if (
                    trimmedLine === "SUMMARY:" ||
                    trimmedLine === "DETAILS:" ||
                    trimmedLine === "RELEVANT CODE:" ||
                    trimmedLine === "CONCLUSION:"
                  ) {
                    return (
                      <h4
                        key={index}
                        className="answer-section-title"
                      >
                        {trimmedLine.replace(":", "")}
                      </h4>
                    );
                  }

                  if (trimmedLine.startsWith("- ")) {
                    return (
                      <div
                        key={index}
                        className="answer-bullet"
                      >
                        <span>•</span>

                        <p>
                          {trimmedLine.substring(2)}
                        </p>
                      </div>
                    );
                  }

                  if (!trimmedLine) {
                    return (
                      <div
                        key={index}
                        className="answer-space"
                      ></div>
                    );
                  }

                  return (
                    <p
                      key={index}
                      className="answer-text"
                    >
                      {line}
                    </p>
                  );
                })}
            </div>

            {askResult.sources?.length > 0 && (
              <div className="ask-sources">
                <h4>Sources</h4>

                <div className="source-list">
                  {askResult.sources.map((source, index) => (
                    <span
                      key={index}
                      className="source-badge"
                    >
                      {source.file_name} : {source.start_line}-{source.end_line}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="ask-empty-state">
            <p>
              Ask a question to get insights about your codebase.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default AskCodebase;