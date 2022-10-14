import "./App.css";
import Home from "./components/Homepage";
import { Routes, Route, Navigate } from "react-router-dom";
import Controlpage from "./components/Controlpage";
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
      </Routes>
    </div>
  );
}

export default App;
