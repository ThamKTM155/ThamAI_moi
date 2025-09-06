import React from "react";
import ChatBox from "./components/ChatBox";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f6fa",
      }}
    >
      <ChatBox />
    </div>
  );
}

export default App;
