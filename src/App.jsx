import "./App.css";
import CreatePoll from "./components/CreatePoll";
import ViewPoll from "./components/ViewPoll";

function App() {
  return (
    <>
      <div className="layout">
        <CreatePoll />
        <h2>Live Poll!...</h2>
        <ViewPoll />
      </div>
    </>
  );
}

export default App;
