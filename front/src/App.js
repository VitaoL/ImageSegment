import "./App.css";
import CanvasComponent from "./components/segmantation";
import Header from "./components/header";
import Menu from "./components/menuSelect";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="appContainer">
        <Menu />
        <CanvasComponent />
      </div>
    </div>
  );
}

export default App;
