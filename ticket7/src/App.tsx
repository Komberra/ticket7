import * as React from "react";
import "./styles.css";

// import Editor from "./components/Editor";
import DraftEditor from "./components/DraftEditor";

export default function App() {
  return (
    <div className="App">
      <h1>Spell Checker</h1>
      <DraftEditor />
    </div>
  );
}
