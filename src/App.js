import { useState } from "react";
import "./App.css";
import Routes from "./Routes";

function App() {
  const [authentication, setAuthentication] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <Routes
          authentication={authentication}
          setAuthentication={setAuthentication}
        />
      </header>
    </div>
  );
}

export default App;
