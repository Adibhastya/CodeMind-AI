function ImpactAnalysis({
  changeRequest,
  setChangeRequest,
  handleImpact,
  impactResult,
}) {
  return (
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
  );
}

export default ImpactAnalysis;