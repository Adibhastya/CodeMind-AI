import "./uploadproject.css";
import useUploadProject from "./uploadproject";
import { Toaster } from "react-hot-toast";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiDotnet,
} from "react-icons/si";

function UploadProject() {
  const {
    selectedFile,
    setSelectedFile,
    handleUpload,
    uploadResult,
    isUploading,
    uploadError,
    handleRemoveFile,
  } = useUploadProject();

  return (
    <section className="upload-card">
      <Toaster position="top-right" />

      <div className="upload-header">
        <div className="upload-icon">⬆</div>

        <div>
          <h2>Upload Project</h2>
          <p>Upload a ZIP file of your codebase to get started.</p>
        </div>
      </div>

      <label className="upload-dropzone">
        <div className="dropzone-icon">☁</div>

        <h3>Drag & drop your ZIP file here</h3>
        <p>or click to browse</p>

        <input
          type="file"
          accept=".zip"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
      </label>

      {selectedFile && (
        <div className="selected-file">
          <span className="selected-file-icon">📦</span>

          <div className="selected-file-info">
            <p>{selectedFile.name}</p>

            <span>
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          </div>

          <span className="selected-file-status">
            Ready
          </span>

          <button
            type="button"
            className="selected-file-remove"
            onClick={handleRemoveFile}
            aria-label="Remove selected file"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="upload-privacy-note">
        <span>ⓘ</span>

        <p>
          We only analyze your code locally and never store it.
        </p>
      </div>

      <button
        className="analyze-project-button"
        type="button"
        onClick={handleUpload}
        disabled={isUploading}
      >
        {isUploading ? "Analyzing..." : "Analyze Project"}
      </button>

      {uploadError && (
        <div className="upload-error">
          <p>{uploadError}</p>
        </div>
      )}

      {uploadResult && (
        <div className="upload-result">
          <p>{uploadResult.message}</p>

          <span>
            {uploadResult.total_files} source files detected
          </span>
        </div>
      )}

      <div className="upload-footer">
  <div className="footer-supported">
    <span>Supported</span>
    <strong>ZIP upto 50 MB</strong>
  </div>

  <div className="footer-divider"></div>

  <div className="popular-languages-row">
    <span className="popular-languages-label">
      Popular languages
    </span>

    <div className="language-icons">
      <SiJavascript
        className="language-icon icon-js"
        title="JavaScript"
      />

      <SiTypescript
        className="language-icon icon-ts"
        title="TypeScript"
      />

      <SiPython
        className="language-icon icon-py"
        title="Python"
      />

      <SiDotnet
        className="language-icon icon-dotnet"
        title="C# / .NET"
      />
    </div>
  </div>
</div>
    </section>
  );
}

export default UploadProject;