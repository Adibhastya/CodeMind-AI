import "./impactanalysis.css";

function ImpactAnalysis({
  changeRequest,
  setChangeRequest,
  handleImpact,
  impactResult,
}) {
  return (
    <section className="impact-card">
      <div className="impact-header">
        <div className="impact-icon">◎</div>

        <div>
          <h2>Impact Analysis</h2>
          <p>Analyze the impact of a proposed code change.</p>
        </div>
      </div>

      <div className="impact-input-area">
        <textarea
          placeholder="Describe the change you want to make..."
          value={changeRequest}
          onChange={(e) => setChangeRequest(e.target.value)}
          rows="6"
        />

        <button
          type="button"
          onClick={handleImpact}
        >
          Analyze Impact
        </button>
      </div>

      <div className="impact-divider"></div>

      <div className="impact-result-section">
        <h3>Impact Summary</h3>

        {impactResult ? (
          <div className="impact-result">
            {impactResult.analysis
              .split("\n")
              .map((line, index) => {
                const trimmedLine = line.trim();

                if (
                  trimmedLine === "IMPACT LEVEL:" ||
                  trimmedLine === "AFFECTED FILES:" ||
                  trimmedLine === "WHY THIS CHANGE MATTERS:" ||
                  trimmedLine === "POSSIBLE RISKS:" ||
                  trimmedLine === "RECOMMENDED TESTS:" ||
                  trimmedLine === "CONCLUSION:"
                ) {
                  return (
                    <h4
                      key={index}
                      className="impact-section-title"
                    >
                      {trimmedLine.replace(":", "")}
                    </h4>
                  );
                }

                if (trimmedLine.startsWith("- ")) {
                  return (
                    <div
                      key={index}
                      className="impact-bullet"
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
                      className="impact-space"
                    />
                  );
                }

                return (
                  <p
                    key={index}
                    className="impact-text"
                  >
                    {line}
                  </p>
                );
              })}
          </div>
        ) : (
          <div className="impact-empty-state">
            <p>
              Describe a change to see affected files, risks and recommendations.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ImpactAnalysis;