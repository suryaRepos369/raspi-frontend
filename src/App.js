import "./App.css";
import Home from "./components/Homepage";
import { Routes, Route } from "react-router-dom";
import Controlpage from "./components/Controlpage";
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Socket from "./components/Socket";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
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
          <Route
            path="*"
            element={<Home />}></Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
