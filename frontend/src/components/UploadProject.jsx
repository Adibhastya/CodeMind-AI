function UploadProject({
  selectedFile,
  setSelectedFile,
  handleUpload,
  uploadResult,
}) {
  return (
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
          <p>{uploadResult.message}</p>
          <p>Total files: {uploadResult.total_files}</p>
        </div>
      )}
    </section>
  );
}

export default UploadProject;