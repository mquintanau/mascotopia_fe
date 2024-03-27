import Button from "./components/Button/Button";
import Navbar from "./components/Navbar/Navbar";
import RectangularLogo from "./components/RectangularLogo/RectangularLogo";

function App() {
  return (
    <div className="h-screen w-screen bg-main">
      <header>
        <Navbar />
      </header>
      <main className="h-[400px]">
        <div className="flex h-full flex-col items-center justify-center">
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
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
