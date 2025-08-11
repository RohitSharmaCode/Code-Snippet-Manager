import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function App() {
  const [editorCode, setEditorCode] = useState("// Write your C++ code here");
  const [output, setOutput] = useState("");

  const handleEditorChange = (value) => {
    setEditorCode(value);
  };

  const handleRun = async () => {
    try {
      const res = await fetch("http://localhost:5000/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: "cpp", code: editorCode }),
      });

      const data = await res.json();
      setOutput(data.output || "No output returned.");
    } catch (error) {
      setOutput("Error: Unable to connect to backend.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Online Code Compiler</h1>
      <Editor
        height="60vh"
        theme="vs-dark"
        defaultLanguage="cpp"
        value={editorCode}
        onChange={handleEditorChange}
      />
      <button onClick={handleRun} style={{ marginTop: "1rem" }}>
        Run Code
      </button>
      <h3>Output:</h3>
      <pre style={{ background: "#1e1e1e", color: "#fff", padding: "1rem" }}>
        {output}
      </pre>
    </div>
  );
}

export default App;
