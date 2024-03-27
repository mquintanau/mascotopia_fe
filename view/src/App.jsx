import Button from "./components/Button/Button";
import RectangularLogo from "./components/RectangularLogo/RectangularLogo";

function App() {
  return (
    <div className="flex w-screen flex-col items-center justify-center bg-main">
      <h1 className="m-0 p-3 text-3xl font-bold text-black">
        Hello Mascotopia Frontend!
      </h1>
      <RectangularLogo className="h-[200px] w-[400px]" />
      <Button
        onClick={() => {
          console.log("Click en botón!");
        }}
      >
        Este es un boton nuevo
      </Button>
    </div>
  );
}

export default App;
