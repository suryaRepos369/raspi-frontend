import "./App.css";
import Home from "./components/Homepage";
import { Routes, Route } from "react-router-dom";
import Controlpage from "./components/Controlpage";
import Socket from "./components/Socket";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Home />}></Route>
        <Route
          path="/control"
          element={<Controlpage />}></Route>
        <Route
          path="/socket"
          element={<Socket />}></Route>
      </Routes>
    </div>
  );
}

export default App;
