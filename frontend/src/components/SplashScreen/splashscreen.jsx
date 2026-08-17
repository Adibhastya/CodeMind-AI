import "./splashscreen.css";

function SplashScreen() {
  const title = "CodeMind AI";

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-title">
          {title.split("").map((letter, index) => (
            <span
              key={index}
              className="splash-letter"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;