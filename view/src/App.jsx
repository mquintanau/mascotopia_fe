import "./App.css";
import Button from "./components/Button/Button";
import RectangularLogo from "./components/RectangularLogo/RectangularLogo";

function App() {
  return (
    <>
      <h1 className="m-4 p-3 text-3xl font-bold text-secondary">
        Hello Mascotopia Frontend!
      </h1>
      <Button
        backgroundColor="bg-primary"
        onClick={() => {
          console.log("Click en botón!");
        }}
      >
        Este es un boton nuevo
      </Button>
      <RectangularLogo />
    </>
  );
}

export default App;
