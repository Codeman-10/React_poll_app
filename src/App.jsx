import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CreatePoll from "./components/CreatePoll";
import ViewPoll from "./components/ViewPoll";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CreatePoll />
      <ViewPoll />
    </>
  );
}

export default App;
