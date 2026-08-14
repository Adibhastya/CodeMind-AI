function AskCodebase({
  question,
  setQuestion,
  handleAsk,
  askResult,
}) {
  return (
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
          <h3>Answer</h3>
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
  );
}

export default AskCodebase;